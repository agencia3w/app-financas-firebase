import React, { useState, createContext, useEffect } from "react";
import { app } from "../services/firebaseConnection";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getDatabase, onValue, set, ref } from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({});

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingAuth, setLoadingAuth] = useState(false);

    useEffect(() => {
        async function loadStorage() {
            const response = await AsyncStorage.getItem('Auth_user');

            if (response) {
                setUser(JSON.parse(response));
                setLoading(false);
            }
            setLoading(false);
        }

        loadStorage();
    }, []);

    const auth = getAuth();
    const db = getDatabase();

    async function signIn(email, password) {
        setLoadingAuth(true);
        const response = await signInWithEmailAndPassword(auth, email, password)
            .then(async (value) => {
                const uid = value.user.uid;
                await onValue(ref(db, '/users/' + uid), (snapshot) => {
                    const data = {
                        uid,
                        nome: snapshot.val().nome,
                        email: value.user.email
                    };
                    setUser(data);
                    storageUser(data);

                    setLoadingAuth(false);
                });
            })
            .catch((error) => {
                alert(error.code);
                setLoadingAuth(false);
            })
    }

    async function signUp(email, password, nome) {
        setLoadingAuth(true);
        const response = await createUserWithEmailAndPassword(auth, email, password)
            .then(async (value) => {
                const uid = value.user.uid;
                await set(ref(db, 'users/' + uid), {
                    saldo: 0,
                    nome: nome
                })
                    .then(() => {
                        const data = {
                            uid,
                            nome,
                            email: value.user.email
                        };
                        setUser(data);
                        storageUser(data);
                        setLoadingAuth(false);
                    })
            }).catch((error) => {
                alert(error.code);
                setLoadingAuth(false);
            })
    }

    async function storageUser(data) {
        await AsyncStorage.setItem('Auth_user', JSON.stringify(data));
    }

    async function logout() {
        await signOut(auth);
        await AsyncStorage.removeItem('Auth_user').then(() => { setUser(null) });
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, user, loading, loadingAuth, signUp, signIn, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;