import React from 'react';
import {Feather} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';

import {
	Container,
	Button
} from './styles';

export function Header(){
	const navigation = useNavigation();
	return(
		<Container>
			<Button onPress={() => navigation.toggleDrawer()}>
				<Feather name="menu" size={30} color="#FFF" />
			</Button>
		</Container>
	)
}