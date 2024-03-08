import * as React from 'react';
import { Modal, Text, TextInput, Button } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

export default function EditarModal({ visible, hideModal, editarPessoa, functionEditar }) {
    const [novoNome, setNovoNome] = React.useState(""); // Definindo novoNome usando useState

    const containerStyle = { backgroundColor: 'white', padding: 20 };

    console.log(novoNome);
    return (
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
            <View style={styles.container}>
                <Text style={styles.text}>Editar nome</Text>
                <TextInput
                    onChangeText={(text) => setNovoNome(text)} // Atualizando novoNome
                    value={novoNome} // Definindo o valor do TextInput como novoNome
                />

                <Button style={styles.button} icon="check" mode="contained" onPress={() => { functionEditar({ novoNome }), hideModal() }}>
                    Sim
                </Button>
                <Button style={styles.button} icon="close" mode="contained" onPress={hideModal}>
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
