import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Feather } from '@expo/vector-icons';
import {
    Container,
    Tipo,
    Icon,
    TipoText,
    Valor,
} from './styles';

export function HistoricoList({ data, deleteItem }) {
    return (
        <TouchableWithoutFeedback onLongPress={() => deleteItem(data)}>
            <Container>
                <Tipo>
                    <Icon tipo={data.tipo}>
                        <Feather name={data.tipo === 'despesa' ? 'arrow-down' : 'arrow-up'} size={20} color="#FFF" />
                        <TipoText>{data.tipo}</TipoText>
                    </Icon>
                </Tipo>
                <Valor>R$ {data.valor}</Valor>
            </Container>
        </TouchableWithoutFeedback>
    )
}