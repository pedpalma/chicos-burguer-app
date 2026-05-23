import React, { useEffect } from "react";
import { StatusBar, StyleSheet, ScrollView, Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useVideoPlayer, VideoView } from "expo-video";

import Texto from "../../componentes/Texto";
import cores from "../../../utils/cores";

export default function SobreNos() {
  const player = useVideoPlayer(
    require("../../../assets/chicos.mp4"),
    (player) => {
      player.loop = true;
      player.muted = true;
    },
  );

  useEffect(() => {
    player.play();
  }, [player]);

  return (
    <SafeAreaView style={estilos.safe} edges={["top"]}>
      <StatusBar barStyle="light-content" backgroundColor={cores.brownDark} />
      <ScrollView
        style={estilos.fundo}
        contentContainerStyle={estilos.conteudo}
      >
        <Image
          source={require("../../../assets/logo.png")}
          style={estilos.logo}
          resizeMode="contain"
        />

        <Texto style={estilos.slogan}>
          O sabor artesanal que conquista a cada mordida
        </Texto>

        <View style={estilos.divisor} />

        <Texto style={estilos.titulo}>Sobre Nós</Texto>
        <Texto style={estilos.subtitulo}>Conheça a nossa história</Texto>

        <Texto style={estilos.texto_sobre}>
          Bem-vindo ao Chico's Burguer! Mais do que uma hamburgueria, somos um
          ponto de encontro de quem ama um lanche feito com carinho e
          ingredientes selecionados. Cada burguer que sai da nossa cozinha
          carrega anos de pesquisa, técnica e paixão pelo sabor de verdade.
          {"\n\n"}
          Nascido do sonho do Chico em transformar a tradicional hamburgueria de
          bairro em uma experiência gourmet acessível, nosso cardápio combina
          carnes nobres maturadas, pães artesanais assados diariamente e molhos
          exclusivos preparados na casa.
          {"\n\n"}
          No Chico's Burguer, cada detalhe é pensado para que sua refeição seja
          inesquecível. Venha provar e descobrir por que somos a hamburgueria
          favorita da cidade!
        </Texto>

        <View style={estilos.divisor} />

        <Texto style={estilos.titulo}>Venha Conhecer!</Texto>
        <Texto style={estilos.subtitulo}>
          Conheça os bastidores do Chico's
        </Texto>

        <VideoView
          player={player}
          style={estilos.video}
          contentFit="cover"
          allowsFullscreen
          allowsPictureInPicture
          nativeControls
        />

        <View style={estilos.divisor} />

        <Texto style={estilos.titulo}>Onde Nos Encontrar</Texto>
        <Texto style={estilos.subtitulo}>Venha nos visitar</Texto>

        <Texto style={estilos.texto_sobre}>
          📍 Av. dos Sabores, 89 - Santo André/SP{"\n"}
          📞 (11) 98388-1471{"\n"}
          🕒 Segunda a Domingo: 18h às 23h{"\n"}
          📧 contato@chicosburguer.com.br
        </Texto>

        <View style={estilos.rodape} />
      </ScrollView>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: cores.bgCream,
  },
  fundo: {
    flex: 1,
    backgroundColor: cores.bgCream,
  },
  conteudo: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  logo: {
    width: 280,
    height: 200,
    alignSelf: "center",
    marginTop: 10,
  },
  slogan: {
    textAlign: "center",
    color: cores.brownOrange,
    fontSize: 16,
    fontStyle: "italic",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  titulo: {
    textAlign: "center",
    color: cores.brownDark,
    fontFamily: "FonteBold",
    fontSize: 26,
    paddingTop: 6,
  },
  subtitulo: {
    textAlign: "center",
    color: cores.brownOrange,
    fontSize: 14,
    fontStyle: "italic",
    paddingBottom: 14,
  },
  texto_sobre: {
    color: cores.brownDark,
    paddingHorizontal: 4,
  },
  divisor: {
    height: 2,
    backgroundColor: cores.brownLight,
    marginVertical: 22,
    alignSelf: "center",
    width: "60%",
    borderRadius: 2,
  },
  video: {
    width: "100%",
    height: 220,
    alignSelf: "center",
    borderRadius: 12,
    backgroundColor: cores.brownDark,
  },
  rodape: {
    height: 40,
  },
});
