import React from "react";
import { View } from "react-native";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";

import cores from "./utils/cores";
import { PedidosProvider } from "./src/contextos/PedidosContext";

// Telas
import SobreNos from "./src/telas/SobreNos";

// Menu Produtos
import Produtos from "./src/telas/Produtos";
import MockProdutos from "./src/mocks/listaProduto";

function MenuProdutos() {
  return <Produtos {...MockProdutos} />;
}
import Pedidos from "./src/telas/Pedidos";

// Menu Perfil
import Perfil from "./src/telas/Perfil";

const Tab = createBottomTabNavigator();

function Menu() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      initialRouteName="Sobre Nós"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;

          if (route.name === "Sobre Nós") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Cardápio") {
            iconName = focused ? "fast-food" : "fast-food-outline";
          } else if (route.name === "Pedidos") {
            iconName = focused ? "receipt" : "receipt-outline";
          } else if (route.name === "Perfil") {
            iconName = focused ? "person" : "person-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: cores.brownOrange,
        tabBarInactiveTintColor: cores.brownMedium,
        tabBarStyle: {
          backgroundColor: cores.bgCream,
          borderTopColor: cores.brownLight,
          borderTopWidth: 2,
          paddingTop: 6,
          paddingBottom: insets.bottom > 0 ? insets.bottom : 8,
          height: 60 + (insets.bottom > 0 ? insets.bottom : 0),
        },
        tabBarLabelStyle: {
          fontFamily: "FonteBold",
          fontSize: 11,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Sobre Nós" component={SobreNos} />
      <Tab.Screen name="Cardápio" component={MenuProdutos} />
      <Tab.Screen name="Pedidos" component={Pedidos} />
      <Tab.Screen name="Perfil" component={Perfil} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [fonteCarregada] = useFonts({
    FonteRegular: Montserrat_400Regular,
    FonteBold: Montserrat_700Bold,
  });
  if (!fonteCarregada) {
    return <View />;
  }

  return (
    <SafeAreaProvider>
      <PedidosProvider>
        <NavigationContainer>
          <Menu />
        </NavigationContainer>
      </PedidosProvider>
    </SafeAreaProvider>
  );
}
