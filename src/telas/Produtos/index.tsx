import React, { useState } from "react";
import {
  FlatList,
  View,
  StatusBar,
  Modal,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";

import Produto from "./Produto";
import Texto from "../../componentes/Texto";
import styles from "./estilosProdutos";
import cores from "../../../utils/cores";
import { usePedidos, ItemCarrinho } from "../../contextos/PedidosContext";
import { Produto as ProdutoType } from "../../mocks/listaProduto";

export default function Index({ itens }: any) {
  const { finalizarCarrinho } = usePedidos();

  const [carrinho, setCarrinho] = useState<ItemCarrinho[]>([]);

  const [carrinhoAberto, setCarrinhoAberto] = useState(false);

  const [nomeCliente, setNomeCliente] = useState("");

  const totalItens = carrinho.reduce((soma, i) => soma + i.quantidade, 0);
  const totalValor = carrinho.reduce(
    (soma, i) => soma + i.precoUnitario * i.quantidade,
    0,
  );

  function adicionarAoCarrinho(prod: ProdutoType) {
    setCarrinho((atual) => {
      const existente = atual.find((i) => i.produtoId === prod.id);
      if (existente) {
        return atual.map((i) =>
          i.produtoId === prod.id ? { ...i, quantidade: i.quantidade + 1 } : i,
        );
      }
      return [
        ...atual,
        {
          produtoId: prod.id,
          nome: prod.nome,
          precoUnitario: prod.precoNumerico,
          quantidade: 1,
        },
      ];
    });
  }

  function alterarQuantidade(produtoId: number, delta: number) {
    setCarrinho((atual) =>
      atual
        .map((i) =>
          i.produtoId === produtoId
            ? { ...i, quantidade: i.quantidade + delta }
            : i,
        )
        .filter((i) => i.quantidade > 0),
    );
  }

  function removerItem(produtoId: number) {
    setCarrinho((atual) => atual.filter((i) => i.produtoId !== produtoId));
  }

  function finalizar() {
    if (nomeCliente.trim() === "") {
      Alert.alert("Atenção", "Informe seu nome para finalizar o pedido.");
      return;
    }
    if (carrinho.length === 0) {
      Alert.alert("Atenção", "Seu carrinho está vazio.");
      return;
    }
    finalizarCarrinho(nomeCliente.trim(), carrinho);
    Alert.alert(
      "Pedido enviado!",
      "Obrigado, " +
        nomeCliente.trim() +
        "! Acompanhe o andamento na aba Pedidos.",
    );
    setCarrinho([]);
    setNomeCliente("");
    setCarrinhoAberto(false);
  }

  return (
    <SafeAreaView style={styles.corFundo} edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor={cores.bgCream} />
      <Texto style={styles.titulo}>{itens.titulo}</Texto>
      <Texto style={styles.subtitulo}>{itens.subtitulo}</Texto>

      <FlatList
        data={itens.lista}
        renderItem={({ item }) => (
          <Produto
            prod={item}
            onAdicionarAoCarrinho={() => adicionarAoCarrinho(item)}
          />
        )}
        keyExtractor={(item: any) => String(item.id)}
        contentContainerStyle={styles.lista}
      />

      {totalItens > 0 && (
        <TouchableOpacity
          style={styles.botaoFlutuante}
          onPress={() => setCarrinhoAberto(true)}
        >
          <Ionicons name="cart" size={22} color={cores.white} />
          <Texto style={styles.textoBotaoFlutuante}>
            {"  "}Finalizar pedido ({totalItens})
          </Texto>
        </TouchableOpacity>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={carrinhoAberto}
        onRequestClose={() => setCarrinhoAberto(false)}
      >
        <KeyboardAvoidingView
          style={styles.modalCarrinhoContainer}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <View style={styles.modalCarrinho}>
            <View style={styles.cabecalhoCarrinho}>
              <Texto style={styles.tituloCarrinho}>Seu pedido</Texto>
              <TouchableOpacity onPress={() => setCarrinhoAberto(false)}>
                <Ionicons name="close" size={28} color={cores.brownDark} />
              </TouchableOpacity>
            </View>

            {carrinho.length === 0 ? (
              <Texto style={styles.carrinhoVazio}>
                Seu carrinho está vazio.
              </Texto>
            ) : (
              <ScrollView style={styles.listaCarrinho}>
                {carrinho.map((item) => (
                  <View key={item.produtoId} style={styles.itemCarrinho}>
                    <View style={styles.itemInfo}>
                      <Texto style={styles.itemNome}>{item.nome}</Texto>
                      <Texto style={styles.itemPreco}>
                        R$ {item.precoUnitario.toFixed(2).replace(".", ",")}{" "}
                        cada
                      </Texto>
                    </View>
                    <View style={styles.itemControles}>
                      <TouchableOpacity
                        style={styles.botaoQtd}
                        onPress={() => alterarQuantidade(item.produtoId, -1)}
                      >
                        <Ionicons name="remove" size={18} color={cores.white} />
                      </TouchableOpacity>
                      <Texto style={styles.itemQtd}>
                        {String(item.quantidade)}
                      </Texto>
                      <TouchableOpacity
                        style={styles.botaoQtd}
                        onPress={() => alterarQuantidade(item.produtoId, +1)}
                      >
                        <Ionicons name="add" size={18} color={cores.white} />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.botaoRemover}
                        onPress={() => removerItem(item.produtoId)}
                      >
                        <Ionicons
                          name="trash-outline"
                          size={18}
                          color={cores.white}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </ScrollView>
            )}

            <View style={styles.linhaTotal}>
              <Texto style={styles.totalRotulo}>Total</Texto>
              <Texto style={styles.totalValor}>
                R$ {totalValor.toFixed(2).replace(".", ",")}
              </Texto>
            </View>

            <Texto style={styles.rotuloNome}>
              Para finalizar, informe seu nome:
            </Texto>
            <TextInput
              style={styles.inputNome}
              placeholder="Seu nome completo"
              placeholderTextColor={cores.brownLight}
              value={nomeCliente}
              onChangeText={setNomeCliente}
            />

            <TouchableOpacity
              style={[
                styles.botaoFinalizar,
                carrinho.length === 0 && styles.botaoDesativado,
              ]}
              onPress={finalizar}
              disabled={carrinho.length === 0}
            >
              <Ionicons name="checkmark-circle" size={20} color={cores.white} />
              <Texto style={styles.textoBotaoFinalizar}>
                {"  "}Confirmar pedido
              </Texto>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}
