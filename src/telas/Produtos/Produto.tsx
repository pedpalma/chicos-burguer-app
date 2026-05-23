import React, { useState } from "react";
import { Card } from "react-native-paper";
import { View, TouchableOpacity, Modal, Image } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import Texto from "../../componentes/Texto";
import styles from "./estilosProdutos";
import cores from "../../../utils/cores";

type Props = {
  prod: {
    id: number;
    nome: string;
    preco: string;
    imagem: any;
    descricao: string;
  };
  onAdicionarAoCarrinho: () => void;
};

export default function Produto({ prod, onAdicionarAoCarrinho }: Props) {
  const { nome, preco, imagem, descricao } = prod;
  const [statusModal, acaoAbreFecha] = useState(false);

  function adicionar() {
    onAdicionarAoCarrinho();
  }

  function adicionarDoModal() {
    onAdicionarAoCarrinho();
    acaoAbreFecha(false);
  }

  return (
    <View>
      <Card mode="elevated" style={styles.card}>
        <Card.Cover source={imagem} style={styles.imagem} />
        <Card.Content>
          <Texto style={styles.nomeProduto}>{nome}</Texto>
          <Texto style={styles.descProduto}>{descricao}</Texto>
          <Texto style={styles.precoProduto}>{preco}</Texto>
        </Card.Content>
        <Card.Actions>
          <TouchableOpacity
            style={styles.botao}
            onPress={() => acaoAbreFecha(true)}
          >
            <Ionicons name="list" size={14} color={cores.white} />
            <Texto style={styles.textoBotao}>{"  "}Detalhes</Texto>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botaoSecundario} onPress={adicionar}>
            <Ionicons name="cart" size={14} color={cores.white} />
            <Texto style={styles.textoBotao}>{"  "}Adicionar</Texto>
          </TouchableOpacity>
        </Card.Actions>
      </Card>

      <Modal animationType="slide" transparent={true} visible={statusModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <TouchableOpacity
              style={styles.botaoFechar}
              onPress={() => acaoAbreFecha(false)}
            >
              <Ionicons name="close" size={30} color={cores.brownDark} />
            </TouchableOpacity>

            <Image
              source={imagem}
              style={styles.imagemModal}
              resizeMode="cover"
            />
            <Texto style={styles.nomeProdutoModal}>{nome}</Texto>
            <Texto style={styles.precoModal}>{preco}</Texto>
            <Texto style={styles.descProdutoModal}>{descricao}</Texto>

            <TouchableOpacity
              style={styles.botaoPedirModal}
              onPress={adicionarDoModal}
            >
              <Ionicons name="cart" size={16} color={cores.white} />
              <Texto style={styles.textoBotao}>
                {"  "}Adicionar ao carrinho
              </Texto>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
