import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    align-items: center;
    background-color: #131313;
`;

export const Nome = styled.Text`
    color: #FFF;
    font-size: 30px;
    margin: 25px 0;
    font-weight: bold;
`;

export const NewLink = styled.TouchableOpacity`
    background-color: #00b94a;
    justify-content: center;
    align-items: center;
    width: 90%;
    height: 45px;
    border-radius: 10px;
    margin-bottom: 10px;
`;

export const NewText = styled.Text`
    color: #FFF;
    font-size: 18px;
    font-weight: bold;
`;

export const Logout = styled.TouchableOpacity`
    background-color: #c62c36;
    justify-content: center;
    align-items: center;
    width: 90%;
    height: 45px;
    border-radius: 10px;
`;

export const LogoutText = styled.Text`
    color: #FFF;
    font-size: 18px;
    font-weight: bold;
`;
