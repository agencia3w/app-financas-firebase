import styled from 'styled-components/native';

export const Background = styled.View`
    flex: 1;
    background-color: #131313;
`;

export const Container = styled.View`
    margin-left: 15px;
    margin-bottom: 25px;
`;

export const Nome = styled.Text`
    font-size: 20px;
    color: #FFFFFF;
`;

export const Row = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

export const Row2 = styled.View`
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;
    margin-left: 15px;
`;

export const DateButton = styled.TouchableOpacity``;

export const Add = styled.TouchableOpacity`
    background: #00B940;
    width: 50px;
    height: 50px;
    border-radius: 100px;
    justify-content: center;
    align-items: center;
    margin-right: 5px;
`;

export const Saldo = styled.Text`
    margin-top: 5px;
    font-size: 30px;
    color: #FFFFFF;
    font-weight: bold;
`;

export const Title = styled.Text`
    margin-left: 5px;
    color: #00B940;
`;

export const List = styled.FlatList.attrs({
    marginHorizontal: 15
})`
    padding-top: 15px;
    background-color: #FFFFFF;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    margin: 0 8px;
`;