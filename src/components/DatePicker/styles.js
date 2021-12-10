import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.TouchableOpacity`
    background-color: ${Platform.OS === 'ios' ? '#00000066' : 'transparent'};
    position: absolute;
    justify-content: flex-end;
    width: 100%;
    height: 100%;
`;

export const Header = styled.View`
    background-color: #FFF;
    justify-content: flex-end;
    align-items: flex-end;
    width: 100%;
    padding: 16px;
`;