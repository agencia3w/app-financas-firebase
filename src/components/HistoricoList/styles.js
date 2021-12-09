import styled from 'styled-components/native';

export const Container = styled.View`
    margin-bottom: 5px;
    padding: 10px;
    background-color: #f2f2f2;
    box-shadow: 4px 2px #00000040;
`;

export const Tipo = styled.View`
    flex-direction: row;
`;

export const Icon = styled.View`
    background-color: ${props => props.tipo === 'despesa' ? '#C62C36' : '#049301'};
    flex-direction: row;
    padding: 3px 8px;
    border-radius: 10px;
`;

export const TipoText = styled.Text`
    color: #FFFFFF;
    font-size: 16px;
`;

export const Valor = styled.Text`
    color: #222;
    font-size: 22px;
    font-weight: bold;
`;
