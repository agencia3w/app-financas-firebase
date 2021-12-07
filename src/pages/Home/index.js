import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { AuthContext } from '../../contexts/auth';

export default function Home() {
	const { user, logout } = useContext(AuthContext);
	return (
		<View>
			<Text>Home</Text>
			<Text>{user && user.nome}</Text>
			<Button title="Sair" onPress={() => logout()} />
		</View>
	);
}