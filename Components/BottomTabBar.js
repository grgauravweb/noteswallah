import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BottomTabBar = () => {
  const navigation  = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('Profile')}>
        <Image source={require('../assets/images/profile.png')} style={styles.tabIcon} />
        <Text style={styles.tabText}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('SettingsScreen')}>
        <Image source={require('../assets/images/setting.png')} style={styles.tabIcon} />
        <Text style={styles.tabText}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#fff',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
  },
  tabIcon: {
    width: 32,
    height: 32,
    tintColor: '#333',
  },
};

export default BottomTabBar;