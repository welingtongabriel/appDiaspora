import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Image, Text, TouchableOpacity } from 'react-native';
  import AppIntroSlider from 'react-native-app-intro-slider';
import Scheduling from '../Scheduling';
  
    
  const slides = [
    {
      key:'1',
      title: 'Diasporablack',
      text:'consulte-nos o preço',
      image: require ('../../assets/1.jpg')
    },
    {
      key:'2',
      title: 'Diasporablack',
      text:'consulte-nos o preço',
      image: require ('../../assets/2.jpg')
    },
    {
      key:'3',
      title: 'Diasporablack',
      text:'consulte-nos o preço',
      image: require ('../../assets/3.jpg')
    },
    {
      key:'4',
      title: 'Diasporablack',
      text:'consulte-nos o preço',
      image: require ('../../assets/4.jpg')
    },
    {
      key:'5',
      title: 'Diasporablack',
      text:'consulte-nos o preço',
      image: require ('../../assets/5.jpg')
    },
    {
      key:'6',
      title: 'Diasporablack',
      text:'consulte-nos o preço',
      image: require ('../../assets/6.jpg')
    },
  ]

  
export default function Home() {
  const navigation = useNavigation();

  
    const [ showHome, setShowHome ] = useState(false);

  function renderSlides({ item }){
    return(
      <View style={{flex:1}}>
        <Image 
        source={item.image}
        style={{
          resizeMode:'cover',
          height: '73%',
          width: '100%',
        }}
        />
        <Text
        style={{
          paddingTop: 25,
          paddingBottom: 10,
          fontSize: 23,
          fontWeight: 'bold',
          color:'#DAA520',
          alignSelf: 'center'
        }}>
          {item.title}
        </Text>
        <Text
        style={{
          textAlign:'center',
          color: '#2F4F4F',
          paddingHorizontal: 25,
          fontSize:15
        }}>
         {item.text} 
        </Text>


      </View>
    )

  }
  
  if (showHome){
    return <Text> ENTROU NA HOME </Text>
  } else{
    return(
      <AppIntroSlider
      renderItem={renderSlides}
      data={slides}
      activeDotStyle={{
        backgroundColor:'#2F4F4F',
        width: 40
      }}
      renderNextButton={() => {}}
      renderDoneButton={() => <Text style={{fontSize: 20, color: '#2F4F4F'}}>Acessar</Text> }
      onDone={ () => {
        navigation.reset({
            routes:[{name: 'SignIn'}]
        });
    
      }}
      />

    );
  }
}

 