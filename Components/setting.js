import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const SettingsScreen = ({ navigation }) => {
  const handlePress = () => {
    AsyncStorage.clear();

    navigation.reset({
      index:0,
      routes:[{name:'Login'}]
    })
  }
  return (
    <View style={styles.container}>
      <View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('About')}>
          <Text style={styles.buttontext}>About us</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttontext}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#CF9FFF',
    borderRadius: 60,
    padding: 10,
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:10,
    elevation: 10,
    justifyContent: 'center',
    margin: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
  
});

export default SettingsScreen;