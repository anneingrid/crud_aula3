import { View, StyleSheet, Platform, SafeAreaView } from 'react-native';
import { Card, TextInput, Button } from 'react-native-paper';
import { useState, useRef } from 'react';
import { useAppContext } from './provider';

/**
 * Este componente representa o filtro que permite ao 
 * usuário filtrar um nome que esteja cadastrado.
 */
export default function Filtro() {
  const [nome, setNome] = useState();
  const { buscarPessoa } = useAppContext();

  /**
   * Uma referência para acessar o input e definir
   * o foco de forma programática
   */
  const nomeRef = useRef();

  /**
   * Esta função utiliza o nome fornecido como entrada no input
   * e chama o método `buscarPessoa()` para filtrar uma pessoa.
   */
  
  const onPressBuscar = () => {
    buscarPessoa(nome.trim());
    if (Platform.OS == "web") {
      nomeRef.focus();
    }
  };

  return (
    <View style={{ marginTop: 10 }}>
      <Card mode="contained">
        <Card.Content>
          <SafeAreaView style={{ height: 55 }}>
            <TextInput
              ref={nomeRef}
              label="Nome"
              style={styles.input_nome}
              value={nome}
              onChangeText={(text) => setNome(text)}
              onSubmitEditing={onPressBuscar}
              mode="outlined"
              right={
                <TextInput.Icon icon="filter" onPress={onPressBuscar} />
              }
            />
          </SafeAreaView>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  input_nome: {
    flex: 1,
    flexGrow: 1,
    borderTopEndRadius: 0,
    borderEndEndRadius: 0,
  },
});
