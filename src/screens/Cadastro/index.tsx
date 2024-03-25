import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Button, Image, Platform } from 'react-native';
import { StackTypes } from '../../routes/stack';
import * as ImagePicker from 'expo-image-picker';

import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

const Cadastro = () => {
  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [password, setPassword] = useState('');
  const [senhaconfirmar, setPasswordConfirm] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [image, setImage] = useState('');
  const navigation = useNavigation<StackTypes>();

  const handleLogin = () => {
    // Aqui você pode adicionar lógica para autenticar o usuário com o email e senha fornecidos
    console.log('Email:', email);
    console.log('Senha:', password);
  };

  const handleToggleForm = () => {
    setIsRegistering(!isRegistering);
  };

  // Função para selecionar uma imagem
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
  
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Bem-vindo ao Amigo Chocolate CHOCOMATCH</Text>
      </View>
      <View style={styles.content}>
        {isRegistering ? (
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Entrar</Text>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder="Email"
                placeholderTextColor="#003f5c"
                onChangeText={(text) => setEmail(text)}
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                secureTextEntry
                style={styles.inputText}
                placeholder="Senha"
                placeholderTextColor="#003f5c"
                onChangeText={(text) => setPassword(text)}
              />
            </View>
            <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
              <Text style={styles.loginText}>Entrar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleToggleForm}>
              <Text style={styles.toggleFormText}>Não tenho uma conta. Cadastrar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('EsqueciSenha')} style={styles.toggleFormText} activeOpacity={0.1}>
              <Text style={styles.toggleFormText}>Esqueceu Senha</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Cadastro</Text>
            <TouchableOpacity onPress={pickImage} style={styles.button}>
              <Text style={styles.buttonText}>Adicionar Foto</Text>
            </TouchableOpacity>
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder="Nome"
                placeholderTextColor="#003f5c"
                onChangeText={(text) => setNome(text)}
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder="Email"
                placeholderTextColor="#003f5c"
                onChangeText={(text) => setEmail(text)}
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                secureTextEntry
                style={styles.inputText}
                placeholder="Senha"
                placeholderTextColor="#003f5c"
                onChangeText={(text) => setPassword(text)}
              />
            </View>

            <View style={styles.inputView}>
              <TextInput
                secureTextEntry
                style={styles.inputText}
                placeholder="Confirmar a Senha"
                placeholderTextColor="#003f5c"
                onChangeText={(text) => setPasswordConfirm(text)}
              />
            </View>
            <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
              <Text style={styles.loginText}>Cadastrar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleToggleForm}>
              <Text style={styles.toggleFormText}>Já tenho uma conta. Fazer login</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c57d56',
  },
  header: {
    backgroundColor: '#5d2417',
    paddingVertical: 56,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#c57d56',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  formContainer: {
    alignItems: 'center',
  },
  formTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#ffb48a',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: 'black',
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#5d2417',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  loginText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  toggleFormText: {
    color: 'black',
    marginTop: 20,
  },
  imageIcon: {
    width: 30, // Defina o tamanho do ícone conforme necessário
    height: 30,
    // Adicione outros estilos conforme necessário
  },
  button: {
    backgroundColor: '#5d2417',
    padding: 5,
    borderRadius: 15,
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default Cadastro;