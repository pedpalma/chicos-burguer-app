import React, { useState, useRef } from "react";
import { Card } from "react-native-paper";
import {
  KeyboardAvoidingView,
  Platform,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import Ionicons from "@expo/vector-icons/Ionicons";

import Texto from "../../componentes/Texto";
import styles from "./estilosPerfil";
import cores from "../../../utils/cores";

export default function Perfil() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const [foto, setFoto] = useState<string | null>(null);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  if (!permission) {
    return <View />;
  }
  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.containerPermissao} edges={["top"]}>
        <Texto style={styles.mensagem}>
          Precisamos da sua autorização para exibir a câmera
        </Texto>
        <TouchableOpacity
          style={styles.botaoPermissao}
          onPress={requestPermission}
        >
          <Texto style={styles.textoBotao}>Permitir</Texto>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }
  async function tirarFoto() {
    if (!cameraRef.current) return;
    try {
      const foto = await cameraRef.current.takePictureAsync({
        quality: 0.7,
        skipProcessing: false,
      });
      if (foto?.uri) {
        setFoto(foto.uri);
      }
    } catch (erro) {
      Alert.alert("Erro", "Não foi possível tirar a foto. Tente novamente.");
    }
  }
  function refazerFoto() {
    setFoto(null);
  }
  function salvarPerfil() {
    if (nome === "" || email === "" || whatsapp === "") {
      Alert.alert("Atenção", "Preencha todos os campos antes de salvar.");
      return;
    }
    Alert.alert(
      "Perfil salvo!",
      "Bem-vindo(a), " + nome + "!\nEntraremos em contato pelo WhatsApp.",
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <KeyboardAvoidingView
        style={styles.fundo}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.scroll}>
          <Texto style={styles.titulo}>Meu Perfil</Texto>
          <Texto style={styles.subtitulo}>
            Cadastre-se para receber novidades do Chico's
          </Texto>
          {foto ? (
            <View style={styles.previewContainer}>
              <Image source={{ uri: foto }} style={styles.previewFoto} />
              <TouchableOpacity
                style={styles.botaoRefazer}
                onPress={refazerFoto}
              >
                <Ionicons name="refresh" size={20} color={cores.white} />
                <Texto style={styles.textoBotao}> Refazer foto</Texto>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.cameraWrapper}>
              <CameraView
                ref={cameraRef}
                facing={facing}
                style={styles.camera}
              />
              <View style={styles.cameraBotoes}>
                <TouchableOpacity
                  style={styles.botaoCamera}
                  onPress={toggleCameraFacing}
                >
                  <Ionicons
                    name="camera-reverse"
                    size={24}
                    color={cores.white}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.botaoCamera, styles.botaoCameraPrincipal]}
                  onPress={tirarFoto}
                >
                  <Ionicons name="camera" size={28} color={cores.white} />
                </TouchableOpacity>
              </View>
            </View>
          )}

          <Card mode="elevated" style={styles.cardFormulario}>
            <Card.Content>
              <Texto style={styles.rotulo}>Nome completo</Texto>
              <TextInput
                style={styles.input}
                placeholder="Digite seu nome"
                placeholderTextColor={cores.brownLight}
                value={nome}
                onChangeText={setNome}
              />

              <Texto style={styles.rotulo}>E-mail</Texto>
              <TextInput
                style={styles.input}
                placeholder="voce@email.com"
                placeholderTextColor={cores.brownLight}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />

              <Texto style={styles.rotulo}>WhatsApp</Texto>
              <TextInput
                style={styles.input}
                placeholder="(11) 99999-9999"
                placeholderTextColor={cores.brownLight}
                keyboardType="numeric"
                value={whatsapp}
                onChangeText={setWhatsapp}
              />
            </Card.Content>

            <Card.Actions>
              <TouchableOpacity
                style={styles.botaoSalvar}
                onPress={salvarPerfil}
              >
                <Ionicons name="save-outline" size={16} color={cores.white} />
                <Texto style={styles.textoBotao}> Salvar dados</Texto>
              </TouchableOpacity>
            </Card.Actions>
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
