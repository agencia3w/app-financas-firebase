import React, { useContext, useState, useEffect } from 'react';
import { getDatabase, ref, onValue, query, update, remove, orderByChild, equalTo, limitToLast } from 'firebase/database';
import { AuthContext } from '../../contexts/auth';
import { useNavigation } from '@react-navigation/native';

import { Feather } from '@expo/vector-icons';
import { Header } from '../../components/Header';
import { DatePicker } from '../../components/DatePicker';
import { HistoricoList } from '../../components/HistoricoList';

import {
	Background,
	Container,
	Nome,
	Row,
	Row2,
	DateButton,
	Add,
	Saldo,
	Title,
	List
} from './styles';
import { format, isPast } from 'date-fns';
import { Alert, Platform } from 'react-native';

export default function Home() {
	const [historico, setHistorico] = useState([]);
	const [saldo, setSaldo] = useState(0);
	const [newDate, setNewDate] = useState(new Date());
	const [showPicker, setShowPicker] = useState(false);


	const { user } = useContext(AuthContext);
	const uid = user && user.uid;
	const db = getDatabase();
	const navigation = useNavigation();

	useEffect(() => {
		async function loadSaldo() {
			await onValue((ref(db, `users/${uid}`)), (snapshot) => {
				setSaldo(snapshot.val().saldo)
			});

			await onValue(
				query(
					ref(db, `historico/${uid}`),
					orderByChild('date'),
					equalTo(format(newDate, 'dd/MM/yyyy')),
					limitToLast(10)
				),
				(snapshot) => {
					setHistorico([]);

					snapshot.forEach((childItem) => {
						let list = {
							key: childItem.key,
							tipo: childItem.val().tipo,
							valor: childItem.val().valor,
							date: childItem.val().date
						}

						setHistorico(prevArray => [...prevArray, list].reverse());
					})
				}
			)
		}

		loadSaldo();
	}, [newDate]);

	function handleDelete(data) {
		if (isPast(new Date(data.date))) {
			alert('Não é possível excluir um registro antigo!' + new Date(data.date));
			return;
		}

		Alert.alert(
			'Atenção!',
			`Você deseja excluir ${data.tipo} - Valor: ${data.valor}`,
			[
				{
					text: 'Cancelar',
					style: 'cancel'
				},
				{
					text: 'Continuar',
					onPress: () => handleDeleteSuccess(data)
				}
			]
		)
	}

	async function handleDeleteSuccess(data) {
		await remove(ref(db, `historico/${uid}/${data.key}`))
			.then(async () => {
				let saldoAtual = saldo;
				data.tipo === 'despesa' ? saldoAtual += parseFloat(data.valor) : saldoAtual -= parseFloat(data.valor);

				update(ref(db, `/users/${user.uid}`), {
					saldo: saldoAtual
				});
			})
			.catch((error) => {
				console.log(error)
			})
	}

	function handleDatePicker() {
		setShowPicker(true);
	}

	function handleClose() {
		setShowPicker(false);
	}

	function onChange(date) {
		setShowPicker(Platform.OS === 'ios');
		setNewDate(date);
	}

	return (
		<Background>
			<Header />
			<Container>
				<Nome>{user && user.nome}</Nome>
				<Row>
					<Saldo>R$ {saldo.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</Saldo>
					<Add onPress={() => navigation.navigate('Registrar')}>
						<Feather name='plus' color='#fff' size={30} />
					</Add>
				</Row>
			</Container>

			<Row2>
				<DateButton onPress={handleDatePicker}>
					<Feather name='calendar' color='#fff' size={20} />
				</DateButton>
				<Title>Últimas Movimentações</Title>
			</Row2>

			<List
				showVerticalScrollIndicator={false}
				data={historico}
				keyExtractor={item => item.key}
				renderItem={({ item }) => (
					<HistoricoList data={item} deleteItem={handleDelete} />
				)}
			/>

			{showPicker &&
				<DatePicker
					onClose={handleClose}
					date={newDate}
					onChange={onChange}
				/>
			}
		</Background>
	);
}