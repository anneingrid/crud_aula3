import * as React from 'react';
import { View, SafeAreaView, StyleSheet, FlatList } from 'react-native';
import { List, Text, IconButton, Divider, useTheme, Avatar } from 'react-native-paper';
import { useAppContext } from './provider';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ExcluirModal from './excluirModal';
import EditarModal from './editarModal';
import Avatarr from './avatar';

/**
 * Este componente apresenta a lista de pessoas cadastradas.
 *
 * Cada item da lista, ao ser selecionado, apresenta um retorno
 * visual, para indicar que o item está selecionado, e
 * um botão que permite excluir o item da lista de pessoas.
 */
export default function Lista() {
  const { pessoas, pessoaSelecionada, selecionarPessoa, pessoasFiltradas, removerPessoa, editarPessoa, filtroAtivo  } =
    useAppContext();

  const { colors, isV3 } = useTheme();
  const safeArea = useSafeAreaInsets();

  const [visible, setVisible] = React.useState(false);
  const [pessoaEditarExcluir, setPessoaEditarExcluir] = React.useState({});
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);


  const [visibleEditar, setVisibleEditar] = React.useState(false);
  const showModalEditar = () => { 
    setVisibleEditar(true);  };
  const hideModalEditar = () => {
    setVisibleEditar(false);
  
  };


  /**
   * Esta função é utilizada para renderizar um item da lista.
   * Se o item da lista estiver selecionado, então adota
   * uma cor de fundo diferente. Além disso, se o item
   * estiver selecionado, apresenta um botão que permite
   * excluir da lista de pessoas.
   */
  const renderItem = ({ item }) => {
    const selecionado = item.id == pessoaSelecionada?.id;
    setPessoaEditarExcluir(pessoaSelecionada);
    const BotaoRemover = () => {
      return (
        <IconButton
          icon="trash-can-outline"
          mode="contained"
          onPress={() => showModal()}
        />
      );
    };
    
    const BotaoEditar = () => {
      return (
        <IconButton
          icon="pencil"
          mode="contained"
          onPress={() => showModalEditar(item)} 
        />
      );
    };

    return (
      <List.Item
        title={item.nome}
        style={selecionado && styles.item_selecionado}
        left={() => (
          <Avatarr nome={item.nome}/>
        )}
        onPress={() => selecionarPessoa(item)}
        right={() => (
          <View style={styles.botoesContainer}>
            {selecionado && <BotaoEditar />}
            {selecionado && <BotaoRemover />}
          </View>)}>
      </List.Item>
    );
  };
  return (
    <View style={styles.container}>
      <List.Section>
        <List.Subheader>
          <View style={styles.cabecalho}>
            <Text style={styles.cabecalho_titulo} variant="bodyLarge">
              Pessoas cadastradas
            </Text>
            {pessoas?.length > 0 && (
              <Text variant="bodySmall">
                Pressione um item da lista para selecionar e outra vez para
                remover a seleção
              </Text>
            )}
          </View>
        </List.Subheader>
      </List.Section>
      {filtroAtivo ? (
        <FlatList
          data={pessoasFiltradas}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={Divider}
          ListEmptyComponent={() => (
            <Text variant="bodyMedium" style={styles.lista_mensagem_vazio}>
              Nenhum resultado encontrado com a filtragem
            </Text>
          )}
        />
      ) : (
        <FlatList
          data={pessoas}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={Divider}
          ListEmptyComponent={() => (
            <Text variant="bodyMedium" style={styles.lista_mensagem_vazio}>
              Nenhuma pessoa cadastrada com esse nome
            </Text>
          )}
        />
      )}
      <ExcluirModal visible={visible} hideModal={hideModal} excluirPessoa={pessoaEditarExcluir} removerPessoa={removerPessoa}/>
      <EditarModal visible={visibleEditar} hideModal={hideModalEditar} editarPessoa={pessoaEditarExcluir} functionEditar={editarPessoa}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, minHeight: 200 },
  lista_mensagem_vazio: { marginHorizontal: 16 },
  cabecalho: {
    flex: 1,
    flexDirection: 'column',
  },
  cabecalho_titulo: {
    fontWeight: 'bold',
  },
  item_selecionado: {
    backgroundColor: 'lightgray',
  },
});
