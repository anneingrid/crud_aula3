import * as React from 'react';
import { Modal, Text, Button } from 'react-native-paper';
import { View, StyleSheet } from 'react-native-web';

export default function ExcluirModal({ visible, hideModal, excluirPessoa, removerPessoa }) {

    const containerStyle = { backgroundColor: 'white', padding: 20};

    return (
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
            <View style={styles.container}>
            <Text style={styles.text}>Deseja excluir?
            </Text>
                <Button style={styles.button} icon="close" mode="contained" onPress={() => {removerPessoa(excluirPessoa), hideModal()} } >
                    Sim
                </Button>
                <Button style={styles.button} icon="close" mode="contained" onPress={() => hideModal()} >
                    Não
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
        width: 150,
        marginTop: 15
    },
    text: {
        alignItems: 'center',
    }
});

