import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image } from 'react-native';
// import { SearchBar } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import AsyncStorage from '@react-native-async-storage/async-storage'; 
const BuyNotesScreen = () => {
  const navigation = useNavigation(); // Initialize navigation object 
  const [allNotes, setAllNotes]  = useState([])

const getAllNotes  = async () => {
  let user = await AsyncStorage.getItem('userInfo');
  user= JSON.parse(user);
  const email = user?.email;

  try {
    const res = await fetch('https://noteswallah-backend.vercel.app/all-notes'+ `?email=${email}`, {
      method:'GET',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })

    const data = await res.json();
    setAllNotes(data.data);
  }catch(e) {
console.log("e", e)
  }
}


  useEffect(() => {

  getAllNotes()

  }, [])

  const categories = [
    { id: 1, name: 'All' },
    { id: 2, name: 'Math' },
    { id: 3, name: 'Science' },
    { id: 4, name: 'English' },
    // Add more categories as needed
  ];

  // Event handlers
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  // const handleSearch = (text) => {
  //   // Implement search logic here
  // };
  return (
    <View style={styles.container}>

      {/* Notes List */}
      <View style={styles.notesContainer}>
        <FlatList
        refreshing={false}
        onRefresh={getAllNotes}
          data={allNotes}
          renderItem={({ item }) => (
            <View style={styles.noteContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('NotesDetails', {item})}>
              <View style={styles.noteContainer}>
              <Text style={styles.noteText}>{item.title}</Text>
              <Text style={styles.noteText}>{item.category}</Text>
              <Text style={styles.noteText}>{item.name}</Text>
              <Text style={styles.noteText}>{item.ownerEmail}</Text>
              </View>
              </TouchableOpacity>
            </View>
          )}

          keyExtractor={(item) => item._id}
        />
      </View>
    </View> 
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    backgroundColor: '#fff',
    padding: 30,
    alignItems: 'center',
  },
  logo: {
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
  notesContainer: {
    marginHorizontal: 20,
    marginVertical: 20,
    paddingBottom:250,
  },
  notesText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  noteContainer: {
    backgroundColor: '#F5FCFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  noteText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default BuyNotesScreen;