import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, TextInput, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../services/api';


export default function App( { navigation }) {

  const [OpenV, SetVis] = useState(true)

  const [dataLogin, setDataLogin] = useState({
    Email: '',
    Senha: ''
});
  const [statusResponse, setStatusResponse] = useState('200')

  async function fazerLogin() {
    try {

      const response = await api.post('/Login', dataLogin)
      console.log(response.data.token)

      setStatusResponse('200')

      await AsyncStorage.setItem('@jwt', response.data.token);
      

      navigation.navigate("Listagem") 

    } catch (error) {
      setStatusResponse('404')
    }

      
}


  return (
    <View>
      <ImageBackground
        source={require('../Login/image/pngtree-abstract-dna-background-design-image_333811.png')}
        style={styles.BackGImage}
      > 
        <View>
            <Image
              source={require('../Login/image/Grupo_de_mascara1.png')}
              style={styles.IconeMed}
            ></Image>
        </View>   

        <TextInput
          placeholderTextColor="#1858F2"
          style={styles.BorderInput}
          placeholder='Login :'
          value={dataLogin.email}
          onChangeText={text => setDataLogin({
            ...dataLogin,
            Email: text
        })}        />

        <TextInput
          placeholderTextColor="#1858F2"
          style={styles.BorderInput}
          placeholder='Senha :'
          value={dataLogin.senha}
          onChangeText={text => setDataLogin({
            ...dataLogin,
            Senha: text
        })}
        />
        <Text style={{color: "red", fontSize: 19, marginBottom: 12}}>{statusResponse === '200' ? "" : "Login ou senha incorreta"}</Text>
        
      <TouchableOpacity 
      onPress={() => fazerLogin()}
      style={
        {width:'60%', backgroundColor:'#FFFFFF', borderColor: '#1858F2', height: 45 ,  alignItems:'center', justifyContent:'center', borderRadius:15, borderTopColor: '#1858F2', borderWidth: 2}}>
        <Text
          style={{ color: '#1858F2'
                }}
        >Login</Text>
      </TouchableOpacity>

      </ImageBackground>


      <StatusBar hidden={OpenV}/>
    </View>
  );
}

const styles = StyleSheet.create({
  BackGImage: {
    width:'100%',
    height: '120%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  
  IconeMed: {
    width:  120,
    height: 120,
    marginBottom:60
  },
    BorderInput:{
      borderWidth:2,
      width: '80%',
      height: 45,
      marginTop: 20,
      marginBottom: 50,
      borderRadius: 12,
      borderColor: '#212DDB',
      paddingLeft: 15,
      backgroundColor:'#FFFFFF',

    }

});

