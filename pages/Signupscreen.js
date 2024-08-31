import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUpScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [createPassword, setCreatePassword] = useState('');
  const [reEnterPassword, setReEnterPassword] = useState('');

  const handleSignUp = async () => {
    const userData = {
      name: `${firstName} ${lastName}`,
      userName: userName,
      phoneNumber: phoneNumber,
      email: email,
      password: createPassword,
    };
    try {
      const response = await fetch('https://noteswallah-backend.vercel.app/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      if (response.ok) {
       const res  = await response.json();
       AsyncStorage.setItem('userInfo', JSON.stringify(res.data));

       navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
      
      } else {
        // Registration failed, handle the error
        const data = await response.json();
        alert('Registration failed: ' + data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error occurred while registering user.');
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.Text1}>Sign up</Text>
      <Text style={styles.sub}>Create Your Account</Text>
      <TextInput
        style={styles.input}
        placeholder='First Name'
        value={firstName}
        onChangeText={text => setFirstName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder='Last Name'
        value={lastName}
        onChangeText={text => setLastName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder='User Name'
        value={userName}
        onChangeText={text => setUserName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder='Phone Number'
        value={phoneNumber}
        onChangeText={text => setPhoneNumber(text)}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder='Email'
        value={email}
        onChangeText={text => setEmail(text)}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder='Create Password'
        value={createPassword}
        onChangeText={text => setCreatePassword(text)}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder='Confirm Password'
        value={reEnterPassword}
        onChangeText={text => setReEnterPassword(text)}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>
      <Text style={styles.or}>OR</Text>
      <TouchableOpacity style={styles.googleButton}>
        <Text style={styles.googleButtonText}>Sign in with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.else}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    Text1: {
      fontSize: 30,
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: 10,
      marginBottom: 5,
    },
    sub: {
      fontSize:15,
      textAlign: 'center',
      marginTop: 10,
    },
    or: {
      fontSize:15,
      textAlign: 'center',
      marginBottom:10,
    },
    googleButton: {
      alignItems:'center',
      justifyContent: 'center',
      width: 250,
      borderColor: '#CF9FFF',
      backgroundColor: '#fff',
      padding: 10,
      marginHorizontal: 70,
      borderRadius: 60,
      borderWidth: 1,
    },
    googleButtonText: {
      color: '#CF9FFF',
      fontWeight: 'bold',
      fontSize: 16,
    },
    loginText: {
      fontSize: 16,
      marginTop: 10,
      textAlign: 'center',
    },
    button: {
    backgroundColor: '#CF9FFF',
    borderRadius: 60,
    padding: 10,
    width: 200,
    marginHorizontal:30,
    marginVertical:10,
    marginLeft:90,
    marginTop:20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  else: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
  },
  input: {
    backgroundColor: '#E0E0E0',
    height: 40,
    borderRadius: 60,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    marginTop: 20,
    paddingHorizontal: 10,
  },
});

export default SignUpScreen;