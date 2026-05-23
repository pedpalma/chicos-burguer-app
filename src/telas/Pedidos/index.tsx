import React, { useState } from "react";
import {
  FlatList,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";

import Pedido from "./Pedido";
import Texto from "../../componentes/Texto";
import styles from "./estilosPedidos";
import cores from "../../../utils/cores";
import { usePedidos } from "../../contextos/PedidosContext";
import { Pedido as PedidoType, StatusPedido } from "../../mocks/listaPedidos";
import listaProduto from "../../mocks/listaProduto";

const CATALOGO = listaProduto.itens.lista;
type LinhaEdicao = {
  produtoId: number;
  quantidade: number;
};

export default function Index() {
  const {
    pedidos,
    setPedidos,
    alternarStatus,
    apagarPedido: apagarPedidoCtx,
  } = usePedidos();

  // Controle do modal de edição.
  const [modalAberto, setModalAberto] = useState(false);
  const [pedidoEditando, setPedidoEditando] = useState<PedidoType | null>(null);

  // Campos do formulário.
  const [formCliente, setFormCliente] = useState("");
  const [linhas, setLinhas] = useState<LinhaEdicao[]>([]);

  // Modal secundário para escolher um produto extra a adicionar.
  const [modalProdutoAberto, setModalProdutoAberto] = useState(false);

  const emAberto = pedidos.filter((p) => p.status === "aberto");
  const encerrados = pedidos.filter((p) => p.status === "encerrado");

  // ---------- utilidades ----------

  // Procura um produto do catálogo pelo nome (case-insensitive).
  // Necessário porque pedidos antigos podem ter nomes que não batem
  // exatamente com o catálogo (ex: digitados na mão antes desta versão).
  function acharProdutoPorNome(nome: string) {
    return CATALOGO.find(
      (p) => p.nome.trim().toLowerCase() === nome.trim().toLowerCase(),
    );
  }

  function precoDe(produtoId: number) {
    return CATALOGO.find((p) => p.id === produtoId)?.precoNumerico ?? 0;
  }

  function nomeDe(produtoId: number) {
    return CATALOGO.find((p) => p.id === produtoId)?.nome ?? "";
  }

  // Total calculado das linhas atuais (preview no modal).
  const totalCalculado = linhas.reduce(
    (soma, l) => soma + precoDe(l.produtoId) * l.quantidade,
    0,
  );

  // ---------- abrir/editar ----------

  function abrirEdicao(ped: PedidoType) {
    setPedidoEditando(ped);
    setFormCliente(ped.cliente);

    // Linha inicial = o pedido em edição. Tenta vincular ao catálogo
    // pelo nome; se não achar, cai no primeiro produto (defesa).
    const produtoOriginal = acharProdutoPorNome(ped.produto) ?? CATALOGO[0];

    setLinhas([
      {
        produtoId: produtoOriginal.id,
        quantidade: ped.quantidade,
      },
    ]);

    setModalAberto(true);
  }

  // ---------- ações dentro do modal ----------

  function trocarProdutoDaLinha(indice: number, produtoId: number) {
    setLinhas((atual) =>
      atual.map((l, i) => (i === indice ? { ...l, produtoId } : l)),
    );
  }

  function alterarQuantidade(indice: number, delta: number) {
    setLinhas((atual) =>
      atual
        .map((l, i) =>
          i === indice ? { ...l, quantidade: l.quantidade + delta } : l,
        )
        .filter((l) => l.quantidade > 0),
    );
  }

  function removerLinha(indice: number) {
    setLinhas((atual) => atual.filter((_, i) => i !== indice));
  }

  // Adiciona um novo produto ao pedido. Se já estiver na lista,
  // incrementa a quantidade.
  function adicionarProduto(produtoId: number) {
    setLinhas((atual) => {
      const jaTem = atual.find((l) => l.produtoId === produtoId);
      if (jaTem) {
        return atual.map((l) =>
          l.produtoId === produtoId
            ? { ...l, quantidade: l.quantidade + 1 }
            : l,
        );
      }
      return [...atual, { produtoId, quantidade: 1 }];
    });
    setModalProdutoAberto(false);
  }

  // ---------- salvar ----------

  function salvarPedido() {
    if (!pedidoEditando) return;

    if (formCliente.trim() === "") {
      Alert.alert("Atenção", "Informe o nome do cliente.");
      return;
    }
    if (linhas.length === 0) {
      Alert.alert("Atenção", "O pedido precisa ter ao menos um produto.");
      return;
    }

    setPedidos((atual) => {
      // A primeira linha substitui o pedido original (mesmo id).
      // As linhas restantes viram pedidos novos com status "aberto"
      // amarrados ao mesmo cliente.
      const baseId = atual.length > 0 ? Math.max(...atual.map((p) => p.id)) : 0;

      const semEditado = atual.filter((p) => p.id !== pedidoEditando.id);

      const principal: PedidoType = {
        ...pedidoEditando,
        cliente: formCliente.trim(),
        produto: nomeDe(linhas[0].produtoId),
        quantidade: linhas[0].quantidade,
        valorUnitario: precoDe(linhas[0].produtoId),
      };

      const extras: PedidoType[] = linhas.slice(1).map((l, idx) => ({
        id: baseId + idx + 1,
        cliente: formCliente.trim(),
        produto: nomeDe(l.produtoId),
        quantidade: l.quantidade,
        valorUnitario: precoDe(l.produtoId),
        status: "aberto" as StatusPedido,
      }));

      return [...semEditado, principal, ...extras];
    });

    setModalAberto(false);
  }

  function apagarPedido(id: number) {
    Alert.alert("Apagar pedido", "Tem certeza que deseja apagar este pedido?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Apagar",
        style: "destructive",
        onPress: () => apagarPedidoCtx(id),
      },
    ]);
  }

  // Produtos do catálogo ainda não selecionados, para a lista do
  // modal "Adicionar produto".
  const produtosNaoAdicionados = CATALOGO.filter(
    (p) => !linhas.some((l) => l.produtoId === p.id),
  );

  return (
    <SafeAreaView style={styles.corFundo} edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor={cores.bgCream} />

      <View style={styles.cabecalhoTela}>
        <Image
          source={require("../../../assets/logo.png")}
          style={styles.logoTopo}
          resizeMode="contain"
        />
        <View style={styles.tituloArea}>
          <Texto style={styles.titulo}>Pedidos do Dia</Texto>
          <Texto style={styles.subtitulo}>
            Acompanhe e gerencie os pedidos
          </Texto>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollConteudo}>
        {/* ===== Tabela: Pedidos em aberto ===== */}
        <View style={styles.secaoTabela}>
          <View style={[styles.faixaSecao, styles.faixaAberto]}>
            <Ionicons name="time-outline" size={18} color={cores.white} />
            <Texto style={styles.textoFaixa}>
              {"  "}Em aberto ({emAberto.length})
            </Texto>
          </View>

          <View style={styles.cabecalhoTabela}>
            <View style={styles.colCliente}>
              <Texto style={styles.textoCabecalho}>Cliente</Texto>
            </View>
            <View style={styles.colProduto}>
              <Texto style={styles.textoCabecalho}>Produto</Texto>
            </View>
            <View style={styles.colTotal}>
              <Texto style={styles.textoCabecalho}>Total</Texto>
            </View>
          </View>

          {emAberto.length === 0 ? (
            <Texto style={styles.vazio}>Nenhum pedido em aberto</Texto>
          ) : (
            <FlatList
              data={emAberto}
              renderItem={({ item }) => (
                <Pedido
                  ped={item}
                  onEditar={() => abrirEdicao(item)}
                  onAlternarStatus={() => alternarStatus(item.id)}
                  onApagar={() => apagarPedido(item.id)}
                />
              )}
              keyExtractor={(item) => String(item.id)}
              scrollEnabled={false}
            />
          )}
        </View>

        <View style={styles.divisor} />

        {/* ===== Tabela: Pedidos encerrados ===== */}
        <View style={styles.secaoTabela}>
          <View style={[styles.faixaSecao, styles.faixaEncerrado]}>
            <Ionicons
              name="checkmark-done-outline"
              size={18}
              color={cores.white}
            />
            <Texto style={styles.textoFaixa}>
              {"  "}Encerrados ({encerrados.length})
            </Texto>
          </View>

          <View style={styles.cabecalhoTabela}>
            <View style={styles.colCliente}>
              <Texto style={styles.textoCabecalho}>Cliente</Texto>
            </View>
            <View style={styles.colProduto}>
              <Texto style={styles.textoCabecalho}>Produto</Texto>
            </View>
            <View style={styles.colTotal}>
              <Texto style={styles.textoCabecalho}>Total</Texto>
            </View>
          </View>

          {encerrados.length === 0 ? (
            <Texto style={styles.vazio}>Nenhum pedido encerrado</Texto>
          ) : (
            <FlatList
              data={encerrados}
              renderItem={({ item }) => (
                <Pedido
                  ped={item}
                  onEditar={() => abrirEdicao(item)}
                  onAlternarStatus={() => alternarStatus(item.id)}
                  onApagar={() => apagarPedido(item.id)}
                />
              )}
              keyExtractor={(item) => String(item.id)}
              scrollEnabled={false}
            />
          )}
        </View>
      </ScrollView>

      {/* ===== Modal de edição ===== */}
      <Modal animationType="slide" transparent={true} visible={modalAberto}>
        <KeyboardAvoidingView
          style={styles.modalContainer}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <View style={styles.modalForm}>
            <View style={styles.modalHeader}>
              <Texto style={styles.tituloModal}>Editar pedido</Texto>
              <TouchableOpacity onPress={() => setModalAberto(false)}>
                <Ionicons name="close" size={28} color={cores.brownDark} />
              </TouchableOpacity>
            </View>

            <Texto style={styles.rotulo}>Cliente</Texto>
            <TextInput
              style={styles.input}
              placeholder="Nome do cliente"
              placeholderTextColor={cores.brownLight}
              value={formCliente}
              onChangeText={setFormCliente}
            />

            <Texto style={styles.rotulo}>Produtos do pedido</Texto>

            <ScrollView style={styles.linhasContainer}>
              {linhas.map((linha, indice) => {
                const preco = precoDe(linha.produtoId);
                const subtotal = preco * linha.quantidade;
                return (
                  <View key={indice} style={styles.linhaProdutoEdicao}>
                    {/* Seletor de produto: chips do catálogo */}
                    <View style={styles.chipsContainer}>
                      {CATALOGO.map((prod) => {
                        const ativo = prod.id === linha.produtoId;
                        return (
                          <TouchableOpacity
                            key={prod.id}
                            style={[styles.chip, ativo && styles.chipAtivo]}
                            onPress={() =>
                              trocarProdutoDaLinha(indice, prod.id)
                            }
                          >
                            <Texto
                              style={[
                                styles.chipTexto,
                                ativo && styles.chipTextoAtivo,
                              ]}
                            >
                              {prod.nome}
                            </Texto>
                          </TouchableOpacity>
                        );
                      })}
                    </View>

                    {/* Quantidade + subtotal calculado */}
                    <View style={styles.linhaQtdSubtotal}>
                      <View style={styles.controlesQtd}>
                        <TouchableOpacity
                          style={styles.botaoQtdEdicao}
                          onPress={() => alterarQuantidade(indice, -1)}
                        >
                          <Ionicons
                            name="remove"
                            size={18}
                            color={cores.white}
                          />
                        </TouchableOpacity>
                        <Texto style={styles.qtdTexto}>
                          {String(linha.quantidade)}
                        </Texto>
                        <TouchableOpacity
                          style={styles.botaoQtdEdicao}
                          onPress={() => alterarQuantidade(indice, +1)}
                        >
                          <Ionicons name="add" size={18} color={cores.white} />
                        </TouchableOpacity>
                      </View>

                      <View style={styles.subtotalArea}>
                        <Texto style={styles.subtotalRotulo}>Subtotal</Texto>
                        <Texto style={styles.subtotalValor}>
                          R$ {subtotal.toFixed(2).replace(".", ",")}
                        </Texto>
                      </View>

                      {linhas.length > 1 && (
                        <TouchableOpacity
                          style={styles.botaoRemoverLinha}
                          onPress={() => removerLinha(indice)}
                        >
                          <Ionicons
                            name="trash-outline"
                            size={16}
                            color={cores.white}
                          />
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                );
              })}
            </ScrollView>

            {/* Botão para adicionar outro produto ao pedido */}
            {produtosNaoAdicionados.length > 0 && (
              <TouchableOpacity
                style={styles.botaoAdicionarProduto}
                onPress={() => setModalProdutoAberto(true)}
              >
                <Ionicons
                  name="add-circle-outline"
                  size={18}
                  color={cores.brownDark}
                />
                <Texto style={styles.botaoAdicionarTexto}>
                  {"  "}Adicionar outro produto
                </Texto>
              </TouchableOpacity>
            )}

            {/* Total geral calculado */}
            <View style={styles.linhaTotalEdicao}>
              <Texto style={styles.totalRotuloEdicao}>Total do pedido</Texto>
              <Texto style={styles.totalValorEdicao}>
                R$ {totalCalculado.toFixed(2).replace(".", ",")}
              </Texto>
            </View>

            <View style={styles.acoesFormulario}>
              <TouchableOpacity
                style={styles.botaoCancelar}
                onPress={() => setModalAberto(false)}
              >
                <Texto style={styles.textoBotao}>Cancelar</Texto>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.botaoSalvar}
                onPress={salvarPedido}
              >
                <Ionicons name="save-outline" size={16} color={cores.white} />
                <Texto style={styles.textoBotao}>{"  "}Atualizar</Texto>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* ===== Modal secundário: escolher produto para adicionar ===== */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalProdutoAberto}
        onRequestClose={() => setModalProdutoAberto(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalSelecaoProduto}>
            <View style={styles.modalHeader}>
              <Texto style={styles.tituloModal}>Adicionar produto</Texto>
              <TouchableOpacity onPress={() => setModalProdutoAberto(false)}>
                <Ionicons name="close" size={28} color={cores.brownDark} />
              </TouchableOpacity>
            </View>

            <ScrollView>
              {produtosNaoAdicionados.map((prod) => (
                <TouchableOpacity
                  key={prod.id}
                  style={styles.itemSelecao}
                  onPress={() => adicionarProduto(prod.id)}
                >
                  <View style={styles.itemSelecaoInfo}>
                    <Texto style={styles.itemSelecaoNome}>{prod.nome}</Texto>
                    <Texto style={styles.itemSelecaoPreco}>{prod.preco}</Texto>
                  </View>
                  <Ionicons
                    name="add-circle"
                    size={28}
                    color={cores.brownOrange}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
