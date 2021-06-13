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

  


 export default function SignIn() {

  const navigation = useNavigation();

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  
  async function logar (){
    await firebase.auth().signInWithEmailAndPassword(email, password)
    .then( (value) =>{
      navigation.navigate('Scheduling')
      
    })
    .catch( (error) => {
      alert('Ops algo deu errado!');
      return;
    })
    setEmail('');
    setPassword('');
  }

  const cadastrar = ()=> {
    navigation.reset({
        routes:[{name: 'SignUp'}]
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
        <Image style={estilos.img}source={require('../SignIn/diaspora.png')} />
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
         onPress={logar}
         >
          <Text style={estilos.submitText}>Acessar</Text>
         </TouchableOpacity> 

         <TouchableOpacity style={estilos.btnRegister}
         onPress={cadastrar}
         >
          <Text style={estilos.registerText}>Criar conta</Text>
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
