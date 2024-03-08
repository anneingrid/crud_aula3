import * as React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Appbar, Snackbar } from 'react-native-paper';
import { useState } from 'react';

import { AppProvider } from './componentes/provider';
import Formulario from './componentes/formulario';
import Lista from './componentes/lista';
import Sobre from './componentes/sobre';

export default function App() {
  const [notificacaoVisivel, setNotificacaoVisivel] = useState(false);
  const onDismissNotificacao = () => setNotificacaoVisivel(false);
  const onAdicionarPessoa = () => setNotificacaoVisivel(true);

  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <SafeAreaProvider>
      <AppProvider
        onAdicionarPessoa={onAdicionarPessoa}
        onSelecionarPessoa={(pessoa) => console.log('selecionado', pessoa)}
        onRemoverPessoa={(pessoa) => console.log('removido', pessoa)}>
        <SafeAreaView style={styles.container}>
          <Appbar.Header>
            <Appbar.Content title="Cadastro de pessoas" />
            <Appbar.Action icon="help-circle" onPress={() => showModal()} />
          </Appbar.Header>

          <Formulario />
          <Lista />
          <Sobre visible={visible} hideModal={hideModal}/>

          <Snackbar
            visible={notificacaoVisivel}
            onDismiss={onDismissNotificacao}
            action={{
              label: 'OK',
            }}>
            Cadastro realizado com sucesso!
          </Snackbar>
        </SafeAreaView>
      </AppProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});
