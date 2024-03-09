import { useState, useContext, createContext } from 'react';

const AppContext = createContext();

/**
 * Este componente funciona como o provider do contexto `AppContext`.
 * 
 * São fornecidos estes recursos:
 * * a lista de pessoas
 * * uma função para adicionar uma pessoa na lista
 * * uma função para remover uma pessoa da lista
 * * um evento de pessoa adicionada
 * * um evento de pessoa removida
 * * um evento de pessoa selecionada
 */
export function AppProvider({
  children,
  onAdicionarPessoa,
  onSelecionarPessoa,
  onRemoverPessoa,
  onEditarPessoa
}) {
  const [pessoas, setPessoas] = useState([]);
  const [pessoaSelecionada, setPessoaSelecionada] = useState();
  const [pessoasFiltradas, setpessoasFiltradas] = useState([]);
  const [filtroAtivo, setFiltroAtivo] = useState();
  const [editarPessoaSelecionada, setEditarPessoaSelecionada] = useState();
  /**
   * Esta função recebe um parâmetro `nome`, cria um objeto 
   * com `id` igual ao timestamp atual e o adiciona
   * na lista de pessoas. 
   * 
   * Dispara o evento `onAdicionarPessoa`.
   * 
   * @param nome String
   */
  const adicionarPessoa = (nome) => {
    const id = new Date().getTime();
    const pessoa = { id, nome };
    const lista = [...pessoas, pessoa];
    setPessoas(lista);
    if (onAdicionarPessoa) {
      onAdicionarPessoa(pessoa);
    }
  };

  /**
   * Esta função recebe um parâmetro `pessoa`, identifica
   * o item correspondente na lista de pessoas e,
   * se for encontrado, o remove da lista.
   * 
   * Dispara o evento `onRemoverPessoa`.
   * 
   * @param pessoa `{id, nome}`
   */

  const removerPessoa = (pessoa) => {
    const lista = pessoas.filter((p) => p.id != pessoa.id);
    setPessoas(lista);
    if (pessoaSelecionada?.id == pessoa.id) {
      setPessoaSelecionada(null);
    }
    if (onRemoverPessoa) {
      onRemoverPessoa(pessoa);
    }
  };

  
  const editarPessoa = (novoNome) => {
    /*
    {...p, nome:'x'} = {id:1, nome:'x'}
    x=[1,2]
    [...x, 3]
    */
    const lista = pessoas.map((p) =>
      p.id === pessoaSelecionada.id ? { ...p, nome: novoNome } : p
    );
    setPessoas(lista);
    if (onEditarPessoa) {
      onEditarPessoa(pessoaSelecionada, novoNome);
    }
    
  };
  


  /**
   * Esta função recebe um parâmetro `pessoa` e determina
   * que o item correspondente na lista de pessoas está selecionado.
   * 
   * Dispara o evento `onSelecionarPessoa`
   */

  const selecionarPessoa = (pessoa) => {
    if (pessoaSelecionada?.id == pessoa.id) {
      setPessoaSelecionada(null);
    } else {
      setPessoaSelecionada(pessoa);
    }
    if (onSelecionarPessoa) {
      onSelecionarPessoa(pessoa);
    }
  };

  /**
   * Esta função recebe um parâmetro `nome`, verifica se o nome está vazio
   * caso esteja atribui ao setFiltroAtivo o estado de FALSE e aparece todos os nomes da lista, 
   * caso contrario faz uma busca na lista de pessoas usando como parametro 
   * o nome e coloca em uma nova lista e atribui ao setFiltroAtivo o estado de TRUE. 
   * 
   * 
   * @param nome String
   */
  const buscarPessoa = (nome) => {
    if (nome == '') {
        setFiltroAtivo(false);
    }
    else {
        setFiltroAtivo(true);
        let listaDeNovasPessoas = pessoas.filter(pessoaDaLista => pessoaDaLista.nome.startsWith(nome));
        setpessoasFiltradas(listaDeNovasPessoas);
    }
};

  return (
    <AppContext.Provider
      value={{
        pessoas,
        pessoasFiltradas,
        adicionarPessoa,
        removerPessoa,
        selecionarPessoa,
        buscarPessoa,
        pessoaSelecionada,
        filtroAtivo,
        editarPessoa
      }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
