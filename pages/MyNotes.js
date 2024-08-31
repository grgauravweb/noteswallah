import { StyleSheet, Text,Image, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MyNotes({navigation}) {
  const [allNotes, setAllNotes]  = useState([])
  const [isLoading, setLoading]  = useState(false);

    const getAllNotes  = async () => {
        setLoading(true);
        let user = await  AsyncStorage.getItem('userInfo');
        user = JSON.parse(user);
        const email = user?.email;
        try {
          const res = await fetch('https://noteswallah-backend.vercel.app/notes?'+ `email=${email}`, {
            method:'GET',
            headers: {
              accept: 'application/json',
              'Content-Type': 'application/json',
            }
          })
      
          const data = await res.json();
          setAllNotes(data.data);
      
        }catch(e) {
      
        }
        setLoading(false)
      }
    
    useEffect(() => {
          getAllNotes()
          }, [])

          const deleteNote = async (id) => {
          
            try {
              const user = await AsyncStorage.getItem('userInfo');
              const email = JSON.parse(user).email;
          
              const response = await fetch(`https://noteswallah-backend.vercel.app/notes/${id}?email=${email}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json'
                }
              });
          
              if (response.ok) {
                setAllNotes(notes => notes.filter(note => note._id !== id));
              }
            } catch (error) {
          
            }
          };     
  return (
    <View style={styles.container}>
   <View style={styles.notesContainer}>
        <FlatList
        refreshing={isLoading}
        onRefresh={getAllNotes}
          data={allNotes}
          renderItem={({ item }) => (
           <TouchableOpacity onPress={() => navigation.navigate('NotesDetails', {item})}>
             <View style={styles.noteContainer}>
              <Text style={styles.noteText}>{item.name}</Text>
              <Text style={styles.noteText}>{item.ownerEmail}</Text>
              <TouchableOpacity style={styles.deleteButton} onPress={() => deleteNote(item._id)}>
              <Image source={require('../assets/images/delete.png')} style={styles.tabIcon} />
              {/* <Text style={styles.deleteButtonText}>Delete</Text> */}
              </TouchableOpacity>
            </View>
           </TouchableOpacity>
          )}

          keyExtractor={(item) => item._id}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff'
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
      tabIcon: {
        width: 32,
        height: 32,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        tintColor: '#333',
        position:'relative',
        left:330,
      },   
})