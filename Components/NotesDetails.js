import { Linking, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import PDFReader from 'rn-pdf-reader-js'
import { useRoute } from '@react-navigation/native'
import * as FileSystem from 'expo-file-system';
import WebView from 'react-native-webview';

export default function NotesDetails() {
    const [base64, setBase] =useState(null);
    const {params}  = useRoute();
    
    const notesUrl  = `https://noteswallah-backend.vercel.app${params?.item?.url}`;
    const googleLink = `https://docs.google.com/gviewer?embedded=true&url=${encodeURIComponent(notesUrl)}`;
  

    const readPdf  = async () => {
      Linking.openURL(notesUrl)

          // try {
          //   const res = await fetch(notesUrl);
          //   const blob = await res.blob();
          //  const path= `${FileSystem.cacheDirectory}temp.pdf`
          //  const fileReader = new FileReader();
          //  fileReader.onload = async () => {
          //   await FileSystem.writeAsStringAsync(path, fileReader.result.split(',')[1], {
          //       encoding: FileSystem.EncodingType.Base6
          //       });
          //       const base6 = await FileSystem.readAsStringAsync(path, {
          //           encoding: FileSystem.EncodingType.Base64
          //       });
          //       setBase(`data:application/pdf;base64,${base6}`)
          //  }
          //  fileReader.readAsDataURL(blob)
          // } catch (error) {
          //   console.log('error', error);
          // }
    }

     useEffect(()  => {
        if(params?.item?.url) {
            readPdf()
        }
     }, [params?.item?.url]);

  return (
      <View style={{flex:1}}>
        
         {/* <WebView
         originWhitelist={['*']}
         source={
              {
                uri: googleLink,
              }
            } 
            startInLoadingState={true}
            style={{flex:1, height: '100%', width: "100%"}}
            /> */}
        
      </View>
  )
}

const styles = StyleSheet.create({})