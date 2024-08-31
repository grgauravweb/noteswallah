import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Index from '../NotesWalah/pages/Index.js';
import Loginscreen from '../NotesWalah/pages/Loginscreen.js';
import SignupScreen from './pages/Signupscreen.js';
import HomeScreen from './pages/Homescreen.js';
import UploadForm from './Components/UploadForm.js';
import BuyNotesScreen from './Components/BuyNotesScreen.js';
import ProfileScreen from './Components/ProfileScreen.js';
import SettingsScreen from './Components/setting.js';
import * as SplashScreen from 'expo-splash-screen';
import MyNotes from './pages/MyNotes.js';
import NotesDetails from './Components/NotesDetails.js';


SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();

const App = () => {

  
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Index">
      <Stack.Screen name="Index" component={Index} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Loginscreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown:false}}/>
      <Stack.Screen name="SellNotes" component={UploadForm} options={{title: "Sell Notes", headerTitleAlign: 'center'}} />
      <Stack.Screen name="BuyNotes" component={BuyNotesScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }}/>
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{ title: 'Settings',headerShown:true }}/>
      <Stack.Screen name="MyNotes" component={MyNotes} options={{title: "My Notes", headerTitleAlign: 'center'}} />
      <Stack.Screen name='NotesDetails' component={NotesDetails} options={{title: "Notes Details", headerTitleAlign: 'center'}} />
    </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;