import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/core';
import { AuthContext } from '../../contexts/auth';
import { Header } from '../../components/Header';
import {
    Container,
    Nome,
    NewLink,
    NewText,
    Logout,
    LogoutText,
} from './styles';

export function Profile() {
    const navigation = useNavigation();
    const { user, logout } = useContext(AuthContext);

    return (
        <Container>
            <Header />
            <Nome>{user && user.nome}</Nome>
            <NewLink onPress={() => navigation.navigate('Registrar')}>
                <NewText>Registrar Gastos</NewText>
            </NewLink>

            <Logout onPress={() => logout()}>
                <LogoutText>Sair</LogoutText>
            </Logout>
        </Container>
    )
}