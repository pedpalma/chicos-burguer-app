# Chico's Burguer

Aplicativo mobile da hamburgueria **Chico's Burguer**, desenvolvido em React Native + Expo como projeto da disciplina **Mobile I** (Faculdade SENAI - Campus São Caetano do Sul - Boa Vista 1.23).`

## Estrutura de pastas

```
appChicosBurguer/
├── App.tsx
├── app.json
├── index.ts
├── package.json
├── tsconfig.json
├── assets/
│   ├── logo.png
│   ├── splash-icon.png
│   ├── icon.png
│   ├── adaptive-icon.png
│   ├── favicon.png
│   ├── banners/
│   └── produtos/
├── src/
│   ├── componentes/
│   │   └── Texto.tsx
│   ├── mocks/
│   │   ├── listaProduto.tsx
│   │   └── listaPedidos.tsx
│   └── telas/
│       ├── SobreNos/
│       ├── Produtos/
│       ├── Pedidos/
│       └── Perfil/
└── utils/
    └── cores.ts
```

## Como rodar

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar o projeto
npm start

```

---

## Telas do app (mapeadas a partir do site)

| Tela do app | Página do site           | Recursos do PDF utilizados                     |
| ----------- | ------------------------ | ---------------------------------------------- |
| Sobre Nós   | `index.html` (Sobre Nós) | `Image`, `Texto`, `expo-video` (loop + play)   |
| Cardápio    | `pages/produtos.html`    | `FlatList`, Mocks, `Card`, `Modal`, `useState` |
| Pedidos     | `pages/pedidos.html`     | `FlatList`, Mocks, `Card`, `Modal`, `useState` |
| Perfil      | Atividade do PDF (p.75)  | `TextInput`, `expo-camera`, `Card`, `Alert`    |

---
