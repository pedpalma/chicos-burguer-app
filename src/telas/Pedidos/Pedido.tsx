import React, { useState } from "react";
import { Card } from "react-native-paper";
import { View, TouchableOpacity, Modal } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import Texto from "../../componentes/Texto";
import styles from "./estilosPedidos";
import cores from "../../../utils/cores";
import { Pedido as PedidoType } from "../../mocks/listaPedidos";

type Props = {
  ped: PedidoType;
  onEditar: () => void;
  onAlternarStatus: () => void;
  onApagar: () => void;
};

export default function Pedido({
  ped,
  onEditar,
  onAlternarStatus,
  onApagar,
}: Props) {
  const [statusModal, acaoAbreFecha] = useState(false);
  const { cliente, produto, quantidade, valorUnitario, status } = ped;

  const total = (quantidade * valorUnitario).toFixed(2).replace(".", ",");
  const unit = valorUnitario.toFixed(2).replace(".", ",");
  const ehAberto = status === "aberto";

  return (
    <View>
      <TouchableOpacity onPress={() => acaoAbreFecha(true)}>
        <Card
          mode="elevated"
          style={[styles.cardPedido, !ehAberto && styles.cardEncerrado]}
        >
          <Card.Content>
            <View style={styles.linhaPedido}>
              <View style={styles.colCliente}>
                <Texto
                  style={[styles.textoLinha, !ehAberto && styles.textoRiscado]}
                >
                  {cliente}
                </Texto>
              </View>
              <View style={styles.colProduto}>
                <Texto
                  style={[styles.textoLinha, !ehAberto && styles.textoRiscado]}
                >
                  {produto}
                </Texto>
              </View>
              <View style={styles.colTotal}>
                <Texto
                  style={[styles.textoTotal, !ehAberto && styles.textoRiscado]}
                >
                  R$ {total}
                </Texto>
              </View>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>

      <Modal animationType="fade" transparent={true} visible={statusModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <TouchableOpacity
              style={styles.botaoFechar}
              onPress={() => acaoAbreFecha(false)}
            >
              <Ionicons name="close" size={28} color={cores.brownDark} />
            </TouchableOpacity>

            <Texto style={styles.tituloModal}>Detalhes do Pedido</Texto>

            <View style={styles.linhaDetalhe}>
              <Texto style={styles.rotuloDetalhe}>Cliente:</Texto>
              <Texto style={styles.valor}>{cliente}</Texto>
            </View>
            <View style={styles.linhaDetalhe}>
              <Texto style={styles.rotuloDetalhe}>Produto:</Texto>
              <Texto style={styles.valor}>{produto}</Texto>
            </View>
            <View style={styles.linhaDetalhe}>
              <Texto style={styles.rotuloDetalhe}>Quantidade:</Texto>
              <Texto style={styles.valor}>{String(quantidade)}</Texto>
            </View>
            <View style={styles.linhaDetalhe}>
              <Texto style={styles.rotuloDetalhe}>Valor unitário:</Texto>
              <Texto style={styles.valor}>R$ {unit}</Texto>
            </View>
            <View style={styles.linhaDetalhe}>
              <Texto style={styles.rotuloDetalhe}>Total:</Texto>
              <Texto style={[styles.valor, styles.totalDestaque]}>
                R$ {total}
              </Texto>
            </View>
            <View style={styles.linhaDetalhe}>
              <Texto style={styles.rotuloDetalhe}>Status:</Texto>
              <Texto
                style={[
                  styles.valor,
                  ehAberto ? styles.statusAberto : styles.statusEncerrado,
                ]}
              >
                {ehAberto ? "Em aberto" : "Encerrado"}
              </Texto>
            </View>

            {/* Ações: editar, concluir/reabrir, apagar */}
            <View style={styles.acoesModal}>
              <TouchableOpacity
                style={[styles.botaoAcao, styles.botaoEditar]}
                onPress={() => {
                  acaoAbreFecha(false);
                  onEditar();
                }}
              >
                <Ionicons name="create-outline" size={18} color={cores.white} />
                <Texto style={styles.textoBotao}>{"  "}Editar</Texto>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.botaoAcao,
                  ehAberto ? styles.botaoConcluir : styles.botaoReabrir,
                ]}
                onPress={() => {
                  acaoAbreFecha(false);
                  onAlternarStatus();
                }}
              >
                <Ionicons
                  name={ehAberto ? "checkmark-outline" : "refresh-outline"}
                  size={18}
                  color={cores.white}
                />
                <Texto style={styles.textoBotao}>
                  {"  "}
                  {ehAberto ? "Concluir" : "Reabrir"}
                </Texto>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.botaoAcao, styles.botaoApagar]}
                onPress={() => {
                  acaoAbreFecha(false);
                  onApagar();
                }}
              >
                <Ionicons name="trash-outline" size={18} color={cores.white} />
                <Texto style={styles.textoBotao}>{"  "}Apagar</Texto>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
