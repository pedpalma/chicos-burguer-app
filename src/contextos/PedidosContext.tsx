import React, { createContext, useContext, useState, ReactNode } from "react";
import dadosIniciais, { Pedido, StatusPedido } from "../mocks/listaPedidos";

// Item de carrinho usado pela tela Cardápio.
export type ItemCarrinho = {
  produtoId: number;
  nome: string;
  precoUnitario: number;
  quantidade: number;
};

type PedidosContextValue = {
  pedidos: Pedido[];
  setPedidos: React.Dispatch<React.SetStateAction<Pedido[]>>;

  finalizarCarrinho: (cliente: string, itens: ItemCarrinho[]) => void;

  alternarStatus: (id: number) => void;
  apagarPedido: (id: number) => void;
};

const PedidosContext = createContext<PedidosContextValue | null>(null);

export function PedidosProvider({ children }: { children: ReactNode }) {
  const [pedidos, setPedidos] = useState<Pedido[]>(dadosIniciais.lista);

  function finalizarCarrinho(cliente: string, itens: ItemCarrinho[]) {
    setPedidos((atual) => {
      const baseId = atual.length > 0 ? Math.max(...atual.map((p) => p.id)) : 0;
      const novos: Pedido[] = itens.map((item, indice) => ({
        id: baseId + indice + 1,
        cliente,
        produto: item.nome,
        quantidade: item.quantidade,
        valorUnitario: item.precoUnitario,
        status: "aberto" as StatusPedido,
      }));
      return [...atual, ...novos];
    });
  }

  function alternarStatus(id: number) {
    setPedidos((atual) =>
      atual.map((p) =>
        p.id === id
          ? {
              ...p,
              status: (p.status === "aberto"
                ? "encerrado"
                : "aberto") as StatusPedido,
            }
          : p,
      ),
    );
  }

  function apagarPedido(id: number) {
    setPedidos((atual) => atual.filter((p) => p.id !== id));
  }

  return (
    <PedidosContext.Provider
      value={{
        pedidos,
        setPedidos,
        finalizarCarrinho,
        alternarStatus,
        apagarPedido,
      }}
    >
      {children}
    </PedidosContext.Provider>
  );
}

// Hook utilitário para consumir o Context.
export function usePedidos() {
  const ctx = useContext(PedidosContext);
  if (!ctx) {
    throw new Error("usePedidos deve ser usado dentro de PedidosProvider");
  }
  return ctx;
}
