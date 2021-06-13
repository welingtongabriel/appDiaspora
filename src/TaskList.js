import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default function TaskList({ data, deleteItem, editItem }){
    return(
        <View style={estilos.container}>
            <TouchableOpacity style={{marginRight: 10}} onPress={ ()=> deleteItem(data.key) }>
               <Icon name="trash" color="#000000" size={20} />   
            </TouchableOpacity>
          
        <View style={{paddingRight:15}}>
            <TouchableWithoutFeedback onPress={()=> editItem(data) }>
              <Text style={{ color:'#000000', paddingRight: 10}}> {data.nome}</Text>
            </TouchableWithoutFeedback>
            
        </View>
            

        </View>
    );
}

const estilos = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection:'row',
        backgroundColor: '#ADD8E6',
        alignItems: 'center',
        marginBottom: 10,
        padding: 10,
        borderRadius: 18,
        borderColor:'#2F4F4F',
        borderWidth: 1,

    }
});