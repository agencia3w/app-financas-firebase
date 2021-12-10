import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

import {
    Container,
    Header
} from './styles';
import { TouchableOpacity, Text } from 'react-native';

export function DatePicker({ date, onClose, onChange }) {
    const [dateNow, setDateNow] = useState(new Date(date));
    return (
        <Container>
            <Header>
                <TouchableOpacity onPress={onClose}>
                    <Text>Fechar</Text>
                </TouchableOpacity>
            </Header>
            <DateTimePicker
                value={dateNow}
                mode="date"
                display="default"
                onChange={(e, d) => {
                    const currentDate = d || dateNow;
                    setDateNow(currentDate);
                    onChange(currentDate);
                }}
                style={{ backgroundColor: '#FFF' }}
            />
        </Container>
    )
}