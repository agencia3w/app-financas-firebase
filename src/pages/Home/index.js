import React, { useContext, useState, useEffect } from 'react';
import { getDatabase, ref, onValue, query, orderByChild, equalTo, limitToLast } from 'firebase/database';
import { AuthContext } from '../../contexts/auth';
import { Header } from '../../components/Header';
import { HistoricoList } from '../../components/HistoricoList';

import {
	Background,
	Container,
	Nome,
	Saldo,
	Title,
	List
} from './styles';
import { format } from 'date-fns';

export default function Home() {
	const [historico, setHistorico] = useState([]);
	const [saldo, setSaldo] = useState(0);

	const { user } = useContext(AuthContext);
	const uid = user && user.uid;
	const db = getDatabase();

	useEffect(() => {
		async function loadSaldo() {
			await onValue((ref(db, `users/${uid}`)), (snapshot) => {
				setSaldo(snapshot.val().saldo)
			});

			await onValue(
				query(
					ref(db, `historico/${uid}`),
					orderByChild('date'),
					equalTo(format(new Date, 'dd/MM/yy')),
					limitToLast(10)
				),
				(snapshot) => {
					setHistorico([]);

					snapshot.forEach((childItem) => {
						let list = {
							key: childItem.key,
							tipo: childItem.val().tipo,
							valor: childItem.val().valor,
						}

						setHistorico(prevArray => [...prevArray, list].reverse());
					})
				}
			)
		}

		loadSaldo();
	}, []);

	return (
		<Background>
			<Header />
			<Container>
				<Nome>{user && user.nome}</Nome>
				<Saldo>R$ {saldo.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</Saldo>
			</Container>

			<Title>Últimas Movimentações</Title>

			<List
				showVerticalScrollIndicator={false}
				data={historico}
				keyExtractor={item => item.key}
				renderItem={({ item }) => (
					<HistoricoList data={item} />
				)}
			/>
		</Background>
	);
}