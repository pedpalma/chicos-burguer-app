export type StatusPedido = "aberto" | "encerrado";

export type Pedido = {
  id: number;
  cliente: string;
  produto: string;
  quantidade: number;
  valorUnitario: number;
  status: StatusPedido;
};

const lista_pedidos: { titulo: string; subtitulo: string; lista: Pedido[] } = {
  titulo: "Pedidos do Dia",
  subtitulo: "Acompanhe e gerencie os pedidos",
  lista: [
    {
      id: 1,
      cliente: "Isadora Cardoso",
      produto: "Chico Classic",
      quantidade: 2,
      valorUnitario: 32.9,
      status: "aberto",
    },
    {
      id: 2,
      cliente: "Maria Souza",
      produto: "Bacon Lover",
      quantidade: 1,
      valorUnitario: 38.9,
      status: "aberto",
    },
    {
      id: 3,
      cliente: "Pedro Palma",
      produto: "Triple Cheese",
      quantidade: 3,
      valorUnitario: 49.9,
      status: "aberto",
    },
    {
      id: 4,
      cliente: "Ana Oliveira",
      produto: "Smash Cebola",
      quantidade: 2,
      valorUnitario: 36.9,
      status: "encerrado",
    },
    {
      id: 5,
      cliente: "Carlos Mendes",
      produto: "Veggie Power",
      quantidade: 1,
      valorUnitario: 31.9,
      status: "encerrado",
    },
  ],
};

export default lista_pedidos;
