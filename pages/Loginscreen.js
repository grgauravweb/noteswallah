import React, { useState } from 'react';
import { StyleSheet, View, Image, SafeAreaView, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

    const handleLogin = async () => {
      try {
        const response = await fetch('https://noteswallah-backend.vercel.app/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });
        const data = await response.json();
        if (data.success) {
          AsyncStorage.setItem('userInfo', JSON.stringify(data.user));
          navigation.reset({
            index:0,
            routes: [{name: 'Home'}]
          }); // Navigate to the home screen
        } else {
          alert(data.error);
        }
      } catch (error) {
        console.error(error);
        alert('An error occurred while logging in');
      }
  };
  return (
    <View style={styles.container}>
      <Image
            style={styles.logo}
            source={require('../assets/images/homelogo.png')}
        />
      <Text style={styles.title}>Enter your credential to Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Signup')}
      >
        <Text style={styles.else}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  logo: {
    width: 350,
    height: 150,
  },
  title: {
    fontSize: 20,
    marginBottom:30,
    marginTop: 20,
  },
  input: {
    backgroundColor: '#E0E0E0',
    height: 40,
    width: 300,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 60,
    padding: 10,
    marginBottom:20,
  },
  button: {
    backgroundColor: '#CF9FFF',
    borderRadius: 60,
    padding: 10,
    width: 300,
    alignItems: 'center',
    marginBottom:10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
  else: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
  },
});

export default LoginScreen;