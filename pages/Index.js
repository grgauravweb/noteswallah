import React, { useEffect } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';

const Index = ({ navigation }) => {
  const checkLogin = async () => {
    const user  = await AsyncStorage.getItem('userInfo');
   
   
   if(user) {
   SplashScreen.hideAsync(); 
    navigation.reset({
      index: 0,
      routes: [{name: 'Home'}]
    });
   }

   SplashScreen.hideAsync(); 
     }
   
     useEffect(() => {
        checkLogin()
     },[])
  
  return (
    <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
        <Image
            style={styles.logo}
            source={require('../assets/images/homelogo.png')}
        />
       
       <Text style={styles.Text1}>Share more learn more</Text>
       
       <TouchableOpacity 
       style={styles.button}
       onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>Login</Text>
       </TouchableOpacity>
       <TouchableOpacity 
       style={styles.button}
       onPress={() => navigation.navigate('Signup')}
       >
        <Text style={styles.buttonText} >SignUp</Text>
       </TouchableOpacity>
        </View>
       </SafeAreaView>
        
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#E6E6FA', 
  
  },
  container: {
    flex:1,
    backgroundColor: '#fff',
    alignItems:'center',
    justifyContent:'center',
  },
  logo: {
    width: 250,
    height: 250,
  },
  button: {
    backgroundColor: '#CF9FFF',
    borderRadius: 70,
    padding: 14,
    marginTop: 50,
    elevation: 10,
    width:280,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
  Text1: {
    fontSize: 18,
    color: '#333',   
  },
});

export default Index;