export type Produto = {
  id: number;
  nome: string;
  preco: string;
  precoNumerico: number;
  descricao: string;
  imagem: any;
};

const lista_produto: {
  itens: { titulo: string; subtitulo: string; lista: Produto[] };
} = {
  itens: {
    titulo: "Nosso Cardápio",
    subtitulo: "Sabores artesanais que conquistam",
    lista: [
      {
        id: 1,
        nome: "Chico Classic",
        preco: "R$ 32,90",
        precoNumerico: 32.9,
        descricao:
          "O burguer que deu origem a tudo. Blend artesanal 180g, queijo cheddar, alface americana, tomate, cebola roxa e o famoso molho da casa, no pão tostado na manteiga.",
        imagem: require("../../assets/produtos/chicoClassic.jpg"),
      },
      {
        id: 2,
        nome: "Bacon Lover",
        preco: "R$ 38,90",
        precoNumerico: 38.9,
        descricao:
          "Para os apaixonados por bacon! Burguer 180g no pão brioche, queijo derretido, cebola caramelizada na cerveja, bacon crocante e molho barbecue defumado.",
        imagem: require("../../assets/produtos/baconLover.jpeg"),
      },
      {
        id: 3,
        nome: "Triple Cheese",
        preco: "R$ 49,90",
        precoNumerico: 49.9,
        descricao:
          "Uma torre de sabor! Três carnes smash de 90g cada, intercaladas com fartas camadas de cheddar derretido no pão brioche dourado. Para os que não economizam no queijo.",
        imagem: require("../../assets/produtos/tripleCheese.jpg"),
      },
      {
        id: 4,
        nome: "Smash Cebola",
        preco: "R$ 36,90",
        precoNumerico: 36.9,
        descricao:
          "O queridinho dos clientes! Carne smash 180g, queijo prato, cebola crispy, dose generosa de bacon e molho da casa no pão brioche.",
        imagem: require("../../assets/produtos/smashCebola.jpeg"),
      },
      {
        id: 5,
        nome: "Veggie Power",
        preco: "R$ 31,90",
        precoNumerico: 31.9,
        descricao:
          "Opção 100% vegetariana e cheia de sabor. Hambúrguer artesanal de grão-de-bico grelhado, cogumelos paris salteados na manteiga, rúcula fresca e maionese de ervas.",
        imagem: require("../../assets/produtos/veggiePower.jpg"),
      },
      {
        id: 6,
        nome: "Big Chico",
        preco: "R$ 45,90",
        precoNumerico: 45.9,
        descricao:
          "O top de linha da casa. Hambúrguer de costela defumada lentamente por 8h, cebola caramelizada, fatias generosas de bacon e molho barbecue defumado no pão australiano artesanal.",
        imagem: require("../../assets/produtos/bigChico.jpg"),
      },
    ],
  },
};

export default lista_produto;
