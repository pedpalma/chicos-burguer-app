import { StyleSheet } from "react-native";
import cores from "../../../utils/cores";
const estilosPedidos = StyleSheet.create({
  corFundo: {
    flex: 1,
    backgroundColor: cores.bgCream,
  },
  cabecalhoTela: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 6,
  },
  logoTopo: {
    width: 60,
    height: 50,
  },
  tituloArea: {
    flex: 1,
    paddingHorizontal: 8,
  },
  titulo: {
    fontFamily: "FonteBold",
    fontSize: 20,
    color: cores.brownDark,
    textAlign: "left",
  },
  subtitulo: {
    fontSize: 12,
    color: cores.brownOrange,
    fontStyle: "italic",
    textAlign: "left",
  },
  botaoNovo: {
    backgroundColor: cores.brownOrange,
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },

  scrollConteudo: {
    paddingBottom: 24,
  },
  secaoTabela: {
    paddingHorizontal: 12,
  },
  faixaSecao: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginTop: 8,
  },
  faixaAberto: {
    backgroundColor: cores.brownOrange,
  },
  faixaEncerrado: {
    backgroundColor: cores.brownMedium,
  },
  textoFaixa: {
    fontFamily: "FonteBold",
    fontSize: 14,
    color: cores.white,
  },
  cabecalhoTabela: {
    flexDirection: "row",
    backgroundColor: cores.brownDark,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  textoCabecalho: {
    color: cores.white,
    fontFamily: "FonteBold",
    fontSize: 13,
  },
  cardPedido: {
    backgroundColor: cores.white,
    borderWidth: 1,
    borderColor: cores.brownLight,
    marginBottom: 4,
    borderRadius: 4,
  },
  cardEncerrado: {
    backgroundColor: cores.bgCream2,
    opacity: 0.85,
  },
  linhaPedido: {
    flexDirection: "row",
    alignItems: "center",
  },
  textoLinha: {
    color: cores.brownDark,
    fontSize: 14,
  },
  textoTotal: {
    fontFamily: "FonteBold",
    color: cores.brownOrange,
    fontSize: 14,
    textAlign: "right",
  },
  textoRiscado: {
    textDecorationLine: "line-through",
    color: cores.brownMedium,
  },
  colCliente: { flex: 3 },
  colProduto: { flex: 3 },
  colTotal: { flex: 2, alignItems: "flex-end" },

  vazio: {
    textAlign: "center",
    color: cores.brownMedium,
    fontStyle: "italic",
    paddingVertical: 16,
    backgroundColor: cores.white,
    borderWidth: 1,
    borderColor: cores.brownLight,
    borderTopWidth: 0,
  },

  divisor: {
    height: 2,
    backgroundColor: cores.brownLight,
    marginVertical: 18,
    marginHorizontal: 24,
    borderRadius: 2,
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(59, 31, 14, 0.55)",
    paddingHorizontal: 16,
  },
  modal: {
    width: "100%",
    backgroundColor: cores.bgCream,
    borderWidth: 3,
    borderColor: cores.brownOrange,
    borderRadius: 14,
    padding: 18,
  },
  botaoFechar: {
    alignSelf: "flex-end",
  },
  tituloModal: {
    fontFamily: "FonteBold",
    fontSize: 22,
    color: cores.brownDark,
    textAlign: "center",
    paddingBottom: 14,
  },
  linhaDetalhe: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: cores.brownLight,
  },
  rotuloDetalhe: {
    fontFamily: "FonteBold",
    color: cores.brownDark,
    fontSize: 14,
  },
  valor: {
    color: cores.brownMedium,
    fontSize: 14,
    textAlign: "right",
  },
  totalDestaque: {
    fontFamily: "FonteBold",
    color: cores.brownOrange,
    fontSize: 16,
  },
  statusAberto: {
    fontFamily: "FonteBold",
    color: cores.brownOrange,
  },
  statusEncerrado: {
    fontFamily: "FonteBold",
    color: cores.brownMedium,
  },

  acoesModal: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    gap: 6,
  },
  botaoAcao: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 6,
  },
  botaoEditar: {
    backgroundColor: cores.brownMedium,
  },
  botaoConcluir: {
    backgroundColor: cores.brownOrange,
  },
  botaoReabrir: {
    backgroundColor: cores.goldAccent,
  },
  botaoApagar: {
    backgroundColor: cores.brownOrange2,
  },

  modalForm: {
    width: "100%",
    backgroundColor: cores.bgCream,
    borderWidth: 3,
    borderColor: cores.brownOrange,
    borderRadius: 14,
    padding: 18,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  rotulo: {
    fontFamily: "FonteBold",
    fontSize: 14,
    color: cores.brownDark,
    marginTop: 8,
    marginBottom: 4,
  },
  input: {
    fontFamily: "FonteRegular",
    fontSize: 16,
    color: cores.brownDark,
    backgroundColor: cores.bgCream2,
    borderWidth: 1,
    borderColor: cores.brownLight,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  linhaFormulario: {
    flexDirection: "row",
    gap: 10,
  },
  metade: {
    flex: 1,
  },
  acoesFormulario: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
    gap: 10,
  },
  botaoCancelar: {
    flex: 1,
    backgroundColor: cores.brownMedium,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  botaoSalvar: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: cores.brownOrange,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  textoBotao: {
    fontFamily: "FonteBold",
    fontSize: 14,
    color: cores.white,
    textAlign: "center",
  },

  linhasContainer: {
    maxHeight: 320,
    marginBottom: 8,
  },
  linhaProdutoEdicao: {
    backgroundColor: cores.white,
    borderWidth: 1,
    borderColor: cores.brownLight,
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
  chipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 10,
  },
  chip: {
    backgroundColor: cores.bgCream2,
    borderWidth: 1,
    borderColor: cores.brownLight,
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  chipAtivo: {
    backgroundColor: cores.brownOrange,
    borderColor: cores.brownOrange2,
  },
  chipTexto: {
    fontFamily: "FonteBold",
    fontSize: 12,
    color: cores.brownDark,
  },
  chipTextoAtivo: {
    color: cores.white,
  },
  linhaQtdSubtotal: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  controlesQtd: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  botaoQtdEdicao: {
    backgroundColor: cores.brownDark,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  qtdTexto: {
    fontFamily: "FonteBold",
    fontSize: 16,
    color: cores.brownDark,
    minWidth: 24,
    textAlign: "center",
  },
  subtotalArea: {
    flex: 1,
    alignItems: "flex-end",
  },
  subtotalRotulo: {
    fontSize: 11,
    color: cores.brownMedium,
    fontStyle: "italic",
  },
  subtotalValor: {
    fontFamily: "FonteBold",
    fontSize: 15,
    color: cores.brownOrange,
  },
  botaoRemoverLinha: {
    backgroundColor: cores.brownOrange2,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },

  botaoAdicionarProduto: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: cores.bgCream2,
    borderWidth: 1,
    borderColor: cores.brownOrange,
    borderStyle: "dashed",
    borderRadius: 8,
    paddingVertical: 10,
    marginBottom: 8,
  },
  botaoAdicionarTexto: {
    fontFamily: "FonteBold",
    fontSize: 14,
    color: cores.brownDark,
  },

  linhaTotalEdicao: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderTopWidth: 2,
    borderTopColor: cores.brownLight,
    marginTop: 4,
  },
  totalRotuloEdicao: {
    fontFamily: "FonteBold",
    fontSize: 16,
    color: cores.brownDark,
  },
  totalValorEdicao: {
    fontFamily: "FonteBold",
    fontSize: 18,
    color: cores.brownOrange,
  },
  modalSelecaoProduto: {
    width: "88%",
    maxHeight: "70%",
    backgroundColor: cores.bgCream,
    borderWidth: 3,
    borderColor: cores.brownOrange,
    borderRadius: 14,
    padding: 16,
  },
  itemSelecao: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: cores.white,
    borderWidth: 1,
    borderColor: cores.brownLight,
    borderRadius: 8,
    padding: 12,
    marginBottom: 6,
  },
  itemSelecaoInfo: {
    flex: 1,
  },
  itemSelecaoNome: {
    fontFamily: "FonteBold",
    fontSize: 14,
    color: cores.brownDark,
  },
  itemSelecaoPreco: {
    fontSize: 12,
    color: cores.brownOrange,
    fontStyle: "italic",
  },
});

export default estilosPedidos;
