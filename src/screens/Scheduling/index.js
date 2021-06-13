import React, {useState, useEffect, useRef} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Keyboard, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import firebase from '../../firebaseConect';
import TaskList from '../../TaskList';

console.disableYellowBox=true;

export default function Scheduling() {
  const inputRef = useRef(null);
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [key, setkey] = useState('');
  const navigation = useNavigation();

  useEffect (() => {

    async function loadTasks(){
      await firebase.database().ref('tarefas').on('value', (snapshot)=>{
        setTasks([]);

        snapshot.forEach((childItem)=>{
          let data = {
            key: childItem.key,
            nome: childItem.val().nome
          };
          setTasks(oldArray => [...oldArray, data])
        })

      });

    }
    loadTasks();
  },[]);

  async function handleAdd(){
    if(newTask !== ''){

      if(key !== ''){
       await firebase.database().ref('tarefas').child(key).update({
         nome: newTask,
       });
       Keyboard.dismiss();
       setNewTask('');
       setkey('');
       return; 
      }

     let tarefas = await firebase.database().ref('tarefas');
     let chave = (await tarefas.push()).key;
     
     tarefas.child(chave).set({
       nome:newTask
     });

     Keyboard.dismiss();
     setNewTask('');

    }
  }

  async function handleDelete(key){
    await firebase.database().ref('tarefas').child(key).remove();
    
  }

  function handleEdit(data){
    setNewTask(data.nome);
    setkey(data.key);
    inputRef.current.focus();
  }
  function cancelEdit(){
    setkey('');
    setNewTask('');
    Keyboard.dismiss();
  }

  async function logout(){
    await firebase.auth().signOut();

    alert('Deslgoado com sucesso!');
    navigation.navigate('SignIn');
  }   

  
 return (
  
   
        <View style={estilos.container}>

          {key.length > 0 && (
            <View style={{ flexDirection:'row'}}>
            <TouchableOpacity onPress={cancelEdit}>
              <Icon name="x-circle" size={20} color="#FF0000"/>
            </TouchableOpacity>
            <Text 
            style={{marginLeft: 5, marginBottom: 8, color:'#FF0000'}}
            >
              Você esta editando um agendamento!
            </Text>
          </View>
          )}
          
          
          
          <View style={estilos.containerTask}>
        
        <TextInput style={estilos.imput}
        placeholder="Agendamentos"
        underlineColorAndroid="transparent"
        onChangeText={(texto) => setNewTask(texto) }
        value={newTask}
        ref={inputRef}
        />
        <TouchableOpacity style={estilos.buttonAdd} onPress={handleAdd}>
          <Text style={estilos.buttonText} > + </Text>
        </TouchableOpacity>
        </View>
        
        <FlatList
        data={tasks}
        keyExtractor={item => item.key}
        renderItem={ ({ item }) => (
          <TaskList data ={item} deleteItem={handleDelete} editItem={handleEdit}/>
        )}
        />

        <View style={estilos.containerView}>
        <TouchableOpacity style={estilos.btnSubmit}
         onPress={logout}
         >
          <Text style={estilos.submitText}>Deslogar</Text>
         </TouchableOpacity> 
        
        </View>
        </View>

      
  );
}


const estilos = StyleSheet.create ({
  container:{
    flex: 1,
    marginTop: 25,
    marginLeft: 10,
    marginRight:10,
  },
  containerTask:{
    flexDirection:'row'
  },

  imput:{
    flex: 1,
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor:'#2F4F4F',
    backgroundColor: '#ADD8E6',
    color: '#000000',
    height: 40,
    borderRadius: 15,
    fontSize: 18
  },

  buttonAdd:{
    justifyContent:'center',
    alignItems:'center',
    height: 40,
    backgroundColor:'#2F4F4F',
    paddingLeft: 14,
    paddingRight: 14,
    marginLeft: 4,
    borderRadius: 10
   
  },

  bottonText:{
    fontSize: 18,
    color:'#000000'
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
  containerView:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#FFF0F5'
  },

 

});
