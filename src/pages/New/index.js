import React, { useState, useContext } from 'react';
import { Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getDatabase, onValue, set, update, ref, push, child } from 'firebase/database'
import { AuthContext } from '../../contexts/auth';
import { Header } from '../../components/Header';
import { Picker } from '../../components/Picker';

import {
    Background,
    Container,
    Input,
    SubmitButton,
    SubmitText
} from './styles';
import { format } from 'date-fns';

export function New() {
    const [valor, setValor] = useState('');
    const [tipo, setTipo] = useState('receita');

    const navigation = useNavigation();
    const { user } = useContext(AuthContext);

    const db = getDatabase();

    function handleSubmit() {
        Keyboard.dismiss();
        if (isNaN(parseFloat(valor)) || tipo === null) {
            return alert('Preencha todos os campos');
        }

        Alert.alert(
            'Confirmando dados',
            `Tipo ${tipo} - Valor: ${parseFloat(valor)}`,
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Continuar',
                    onPress: () => handleAdd()
                }
            ]
        )
    }

    async function handleAdd() {
        const keyRandom = push(child(ref(db), 'historico')).key;

        // Inserindo transacao
        await set(ref(db, `/historico/${user.uid}/${keyRandom}`), {
            tipo,
            valor: parseFloat(valor),
            date: format(new Date(), 'dd/MM/yyyy')
        });

        // Atualizando o saldo
        await onValue((ref(db, `/users/${user.uid}`)), (snapshot) => {
            let saldo = parseFloat(snapshot.val().saldo);
            tipo === 'despesa' ? saldo -= parseFloat(valor) : saldo += parseFloat(valor);
            console.log('saldo ' + saldo);

            update(ref(db, `/users/${user.uid}`), {
                saldo
            });
        }, {
            onlyOnce: true
        });

        Keyboard.dismiss();
        setValor('');
        navigation.navigate('Home');

    };

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <Background>
                <Header />
                <Container>
                    <Input
                        placeholder="Valor desejado"
                        keyboardType="numeric"
                        returnKeyType="next"
                        onSubmitEditing={() => Keyboard.dismiss()}
                        value={valor}
                        onChangeText={setValor}
                    />

                    <Picker onChange={setTipo} tipo={tipo} />

                    <SubmitButton onPress={handleSubmit}>
                        <SubmitText>Registrar</SubmitText>
                    </SubmitButton>
                </Container>
            </Background>
        </TouchableWithoutFeedback>
    )
}