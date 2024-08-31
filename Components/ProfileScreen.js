import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({navigation}) => {
  const [user, setUser] = useState(null);

  const handlerUserInfo = async () => {
    let user = await AsyncStorage.getItem('userInfo');
    user = JSON.parse(user);
    setUser(user);
  }

  useEffect(() => {
    handlerUserInfo();
  }, []);
  const handlePress = () => {
    AsyncStorage.clear();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
      <Image source={require('../assets/images/profile.png')} style={styles.profileImage} />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{user?.name}</Text>
          <Text style={styles.profileEmail}>{user?.email}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttontext}>Logout</Text>
        </TouchableOpacity>
    </View>
  );
};
const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileContainer: {
    flexDirection:'column',
    alignItems: 'center',
    marginBottom: 40,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 40,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
  },
  profileInfo: {
    flexDirection:'column',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'center',

  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textTransform: 'capitalize'
  },
  profileEmail: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  logoutButton: {
    backgroundColor: '#f00',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#CF9FFF',
    width: '60%',
    padding: 10,
    borderRadius: 60,
    marginTop: 10,
  },
  buttontext: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // styles object
};

export default ProfileScreen;