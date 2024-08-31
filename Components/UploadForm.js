import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image, ActivityIndicator } from 'react-native';
import {getDocumentAsync} from 'expo-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
const UploadForm = () => {
  const navigation  = useNavigation();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [isLoading, setLoading]   = useState(false);
  const [pdfUri, setPdfUri] = useState(null);

  const handlePickDocument = async () => {
    try {
        const res = await getDocumentAsync({type: "application/pdf"});
       setPdfUri(res?.assets?.[0])
      console.log(res)
    } catch (e) {

    }
  };

  const handleUpload = async () => {

    if (!title.trim() || !pdfUri) {
      Alert.alert('Error', 'Please fill in all fields and select a PDF file');
      return;
    }

    let user  =  await AsyncStorage.getItem('userInfo');
    user = JSON.parse(user)
setLoading(true);
    try {
      // Read the file from the URI
        const fd  = new FormData();
        fd.append('pdf', {
          name: pdfUri.name,
          type: pdfUri.mimeType,
          uri: pdfUri.uri
        });

        fd.append('email', user?.email);             
        fd.append('title', title);
        fd.append('category', category)
      // Now you have the fileData as base64 string, you can upload it along with other data
     const res  = await fetch('https://noteswallah-backend.vercel.app/upload-pdf', 
     {
      method: 'POST',
     headers: {
      'Content-Type': 'multipart/form-data',
     },
     body: fd
    })
     
     if(res.ok) {
      Alert.alert('Alert!', 'Hurray you a have successfully uploaded a file!!!!!',[{text: 'OKay', onPress: () => navigation.navigate('MyNotes')}])
     }

    } catch (error) {
      console.error('Error reading file:', error);
    }

setLoading(false);
  };

  return (
    <View style={styles.container}>
 
     <View style={styles.body}>
     <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
       <TextInput
        style={styles.input}
        placeholder="Category"
        value={setCategory}
        onChangeText={setCategory}
      />

    {pdfUri && <View style={styles.fileBox}>
        <Text>{pdfUri?.name}</Text>
      </View>}

      <TouchableOpacity style={styles.button} onPress={handlePickDocument}>
      <Image source={require('../assets/images/choose.png')} style={styles.tabIcon} />
        <Text style={styles.buttonText}>Choose PDF</Text>
      </TouchableOpacity>
     </View>
   <View style={styles.footerButton}>

   <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
      { isLoading ? <ActivityIndicator color={'white'} size={'large'} /> :  <Text style={styles.uploadButtonText}>Sell Your Notes</Text>}
      </TouchableOpacity>
   </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  input: {
    width: '100%',
    height: 51,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 13,
    fontSize: 17,
  },
  button: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    justifyContent:'center',
    alignItems: "center"

  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600'
  },
  fileName: {
    marginTop: 20,
    fontSize: 16,
    color: '#333',
  },
  uploadButton: {
    backgroundColor: '#CF9FFF',
    padding: 10,
    borderRadius: 12,
    width: "100%",
    height: 50,
    justifyContent:'center',
    alignItems: "center"
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '700'
  },
  footerButton: {

    flex:1,
    justifyContent:'flex-end',
    paddingBottom: 50,
  },
  body: {
    flex:5,
    justifyContent:'center'
  },
  fileBox: {
    height: 80,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: 20,
    justifyContent:'center',
    alignItems:'center',
    padding: 10,
  },
  tabIcon: {
    width: 32,
    height: 32,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  }, 
});

export default UploadForm;
