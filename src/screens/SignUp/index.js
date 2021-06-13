import React, {useState, useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View, 
  KeyboardAvoidingView, 
  Image, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Animated } from 'react-native';
  
  import firebase from '../../firebaseConect';

  console.disableYellowBox=true;
  

export default function SignUp() {

  const navigation = useNavigation();

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ nome, setNome] = useState('');

  async function Cadastrar(){
    await firebase.auth().createUserWithEmailAndPassword(email, password)
    .then( (value) => {
      firebase.database().ref('usuarios').child(value.user.uid).set({
        nome:nome
      })
      alert('Usuario criado com sucesso:' + value.user.email);
      return;
    })
    .catch( (error) => {
      if(error.code === 'auth/weak-password'){
        alert('Sua senha deve ter pelo menos 6 caracteres')
        return;
      }
        if(error.code === 'auth/invalid-email'){
          alert('Email invalido');
          return;
        }else{
          alert('Ops algo deu errado!');
          return;
        }
    })
    setNome('');
    setEmail('');
    setPassword('');
  }
 

         
  
  const registrar = ()=> {
    navigation.reset({
        routes:[{name: 'SignIn'}]
    });

  }

 
  
  const [offset] = useState (new Animated.ValueXY({x: 0, y:95}));

  useEffect (()=> {
   
    Animated.spring(offset.y, {
      toValue: 0,
      speed: 4,
      bounciness: 20
    }).start();
  }, []);

 return (
   
   <KeyboardAvoidingView style={estilos.container}>
      <View style={estilos.containerImage}>
        <Image style={estilos.img}source={require('../SignUp/diaspora.png')} />
      </View>
      <Animated.View style={[estilos.containerImput, 
      {
        transform: [
          { translateY: offset.y}
        ]
      }
      ]}
      >
        
        <TextInput style={estilos.imput}
        placeholder="Digite seu nome"
        autoCorrect={false}
        onChangeText={t=> setNome(t)}
        value={nome}
         />
        <TextInput style={estilos.imput}
        placeholder="Digite seu e-mail"
        autoCorrect={false}
        onChangeText={t=> setEmail(t)}
        value={email}
         />
         <TextInput style={estilos.imput}
        placeholder="Digite sua senha"
        autoCorrect={false}
        onChangeText={t=> setPassword(t)}
        value={password}
        secureTextEntry={setPassword}
             
         />
        
         <TouchableOpacity style={estilos.btnSubmit}
         onPress={Cadastrar}
         >
          <Text style={estilos.submitText}>Cadastrar</Text>
         </TouchableOpacity> 

         <TouchableOpacity style={estilos.btnRegister}
         onPress={registrar}
         >
          <Text style={estilos.registerText}>Já possui uma conta? Faça o Login </Text>
         </TouchableOpacity> 
      </Animated.View>

   </KeyboardAvoidingView>
   
  );
}


const estilos = StyleSheet.create ({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#FFF0F5'
  },

  containerImage:{
    flex: 1,
    justifyContent:'center',

  },
  containerImput:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    paddingBottom: 20,

  },

  imput:{
    backgroundColor: '#ADD8E6',
    width: '90%',
    marginBottom: 15,
    color: '#000000',
    fontSize: 17,
    borderRadius: 15,
    padding: 10,


  },

  img:{
    justifyContent:'center',
    width: 400,
    height: 250,
   
  },

  btnSubmit:{
    backgroundColor: '#2F4F4F',
    width: '90%',
    height: 45,
    alignItems:'center',
    justifyContent: 'center',
    borderRadius: 15
  },

  submitText:{
    color: '#FFF',
    fontSize:18,
  },
  btnRegister:{
    marginTop: 10,
  },
  registerText:{
    color: '#1E90FF'
  }


})
