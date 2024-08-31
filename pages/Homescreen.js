import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image, SafeAreaView } from 'react-native';
// import { SearchBar } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const HomeScreen = () => {
  const [user, setUser]  = useState({name: ''});
  const navigation = useNavigation(); // Initialize navigation object 

  const [selectedCategory, setSelectedCategory] = useState('All');

  const handlerUserInfo = async () => {
    let user = await  AsyncStorage.getItem('userInfo');
user  = JSON.parse(user);
setUser(user);
  }


  useEffect(() => {
handlerUserInfo()
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/images/logo.png')} style={styles.logo} />
        <Text style={[styles.title, {textAlign:'center', flex:1}]}>Notes Walah</Text>
<View />
      </View>
<View style={styles.userINfo}>
<Text style={styles.usernameText}>Welcome {user?.name}</Text>
</View>


<View style={styles.boxContainer}>
          <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('SellNotes')}>
              <Text style={styles.boxText}> Sell Notes </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.box}onPress={() => navigation.navigate('BuyNotes')}>
              <Text style={styles.boxText}> Buy Notes </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('MyNotes')}>
              <Text style={styles.boxText}> My Notes </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('Profile')}>
              <Text style={styles.boxText}> Profile </Text>
          </TouchableOpacity>
</View>

      {/* Notes List */}
   <View style={styles.footer}>
    <Text style={styles.footerText}>Version: 1.0.0</Text>
   </View>
    </View>

    </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  safeArea: {
flex:1,
backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 58,
  },
  header: {
    position: 'relative',
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'row',
    height: 60,
  },
  logo: {
    position: 'absolute',
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 0,
  },
  searchBarContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    marginBottom: 16,
  },
  searchBarInputContainer: {
    backgroundColor: '#ddd',
    borderRadius: 20,
    width: '100%',
    height: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#CF9FFF',
    marginRight: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  usertext: {
    color: 'black',
    fontSize: 16,
  },
  logouttext: {
    color: 'black',
    fontSize: 16,
    marginLeft: 265,
    marginBottom: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  categoryText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
    marginBottom: 10,
  },
  categoryItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#ddd',
    marginRight: 8,
  },
  categoryItemText: {
    fontSize: 16,
  },

  userINfo: {
    paddingVertical: 40
  },
  usernameText: {
    fontSize: 30,
    fontWeight: '600',
    textTransform: 'capitalize'
  },
  boxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    columnGap: 20,
    rowGap: 20,
    flexWrap: 'wrap'
  },
  box: {
    height: 120,
    width: '46%',
    borderRadius: 25,
    elevation: 10,
    backgroundColor: "#CF9FFF",
    justifyContent: 'center',
    alignItems: 'center'
  },
  boxText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerText: {fontSize: 18, fontWeight: '600'},
  footer: {flex:1,justifyContent:"flex-end",alignItems:'center', paddingBottom: 20}
});

export default HomeScreen;
