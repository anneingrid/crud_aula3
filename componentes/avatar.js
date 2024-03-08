import { View } from 'react-native';
import { Avatar, Text } from 'react-native-paper';

export default function Avatarr({ nome }) {
    const stringNome = JSON.stringify(nome);
    const nomeSemAspas = stringNome.replace(/["']/g, '');
    const nomeTratado = nomeSemAspas.split(" ");
    const primeiroNome = nomeTratado[0].toUpperCase();
    const sobrenome = nomeTratado.length > 1 ? nomeTratado[1].toUpperCase() : "";
    return (
        <View>
            <Avatar.Text
                label={primeiroNome[0] + (sobrenome ? sobrenome[0] : "")}
                size={40}
                labelStyle={{ color: 'white' }}
                style={{margin:15}}
            />
        </View>
    );
};