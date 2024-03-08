import * as React from 'react';
import { Modal, Text, Button} from 'react-native-paper';
import { View, StyleSheet } from 'react-native-web';

export default function Sobre({ visible, hideModal }) {

    const containerStyle = { backgroundColor: 'white', padding: 30 };

    return (
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
            <Text style={styles.text}>Um aplicativo fácil de usar que simplifica o cadastro de nomes e acesso rápido às informações essenciais sobre as pessoas cdastradas. Organize seus contatos, adicione detalhes específicos, edite, exclua e tenha informações cruciais ao alcance de um toque. Transforme suas conexões pessoais.
            </Text>
            <View style={styles.container}>
            <Button style={styles.button} icon="close" mode="contained" onPress={() => hideModal()} >
                Fechar
            </Button>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        width: 250,
        marginTop: 15
    },
    text: {
        textAlign: "justify",
    }
});

