import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView, Mdal, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import api from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';

export default function App({navigation}) {

  const [Lista, SetLista] = useState([]);

  const [tipo, setTipo] = useState('');




  async function deslogar() {
    AsyncStorage.removeItem('@jwt')

    navigation.navigate('Login')
  }

  async function fazerLogin() {


    const TokenValor =  await AsyncStorage.getItem('@jwt')
    setTipo(jwtDecode(TokenValor).nameid);
    
  

  

 
   if(tipo === '3'){

     const resposta = await api.get('/Consultum/ConsultasPacientesRelacionada', {
      headers: {
        'Authorization': `Bearer  ${TokenValor}`
      }
    })

    console.log(resposta.data)
    SetLista(resposta.data);

   }else if(tipo === '2'){

    const resposta = await api.get('/Consultum/ConsultasMedicosRelacionada', {
      headers: {
        'Authorization': `Bearer  ${TokenValor}`
      }
    })

    console.log(resposta.data)
    SetLista(resposta.data);
   }
 

    
 }

  useEffect(() =>{
    fazerLogin()

  }, [tipo])




  return (
    <ScrollView>
      <View style={styles.Header}>  
        <TouchableOpacity
        onPress={() => deslogar()}
        >
          <Text style={{fontSize: 22}}>Sair</Text>

        </TouchableOpacity>

      </View>


      <ImageBackground
        source={require('../Listagem/image/pngtree-abstract-dna-background-design-image_333811.png')}
        style={styles.BackGImage}
      > 
          <View style={{marginTop:45, marginBottom:32}}>
            <Text style={{fontSize:25, fontWeight: 'bold'}}>
              Suas Consultas
            </Text> 
          </View>
          {
            Lista.map(i =>{
              return(
                <View style={{width:'80%', height:140, backgroundColor:'#FFFF', borderRadius:8, justifyContent:'center', alignItems:'center', marginTop:30}}>
                <View>
                  <Text style={{marginLeft: 12}}><Text style={{color: '#1858F2', fontWeight: 'bold'}}> {tipo === "3" ? 'Medico : ' : 'Paciente : '}</Text> {tipo === "3" ? i.idMedicoNavigation.nomeMedico : i.idPacienteNavigation.nomePaciente}</Text>              
                </View>
                <View style={{flexDirection:'row', marginTop:15}}>
                 <Text> 
                 {Intl.DateTimeFormat('pt-BR').format(new Date(i.dataConsulta))} <Text style={i.idSituacaoNavigation.situacao1 === "Realizada" ? {color: '#3CB371', fontWeight: 'bold', fontSize:18} : i.idSituacaoNavigation.situacao1 === "Agendada" ? {color: '#E6D433', fontWeight: 'bold', fontSize:18} : {color: 'red', fontWeight: 'bold', fontSize:18}}>{i.idSituacaoNavigation.situacao1}</Text>             
                  </Text>                                            
                </View> 
                <View style={{marginTop: 15}}> 
                  <Text style={{fontSize:14}}>Descrição: <Text style={{fontSize:12}}>{i.descricao}</Text></Text>
                </View>
              </View> 
              )
            }    
            )
          }
       
          
          
      </ImageBackground>


    </ScrollView>
  );
}

const styles = StyleSheet.create({
  Header: {
    height: 80,
    justifyContent:'space-between',
    flexDirection: 'row',
    marginLeft:35,
    marginRight:90,
    alignItems:'center'
  },
  BackGImage: {
    width:'100%',
    height: '100%',
    alignItems: 'center',
    
  }
});
