import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ContactListScreen from './components/contactlistscreen';
import CreateNewContact from './components/creatcontact';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Exstyles from './styles/style';
import UpdateContact from './components/updatecontact';
import FavoriteContactsScreen from './components/favouritecontact';
import DrawerNavigator from './components/DrawerNavigator';

import ContactStack from './components/contactstack';
import { createDrawerNavigator } from '@react-navigation/drawer';
const Stack = createNativeStackNavigator();
const Drawer=createDrawerNavigator();

export default function App() {
  return (
    // <View >
    //  <ContactListScreen></ContactListScreen>
      
    // </View>
    
    // <NavigationContainer>
    //   <DrawerNavigator></DrawerNavigator>
     
    //   {/* <Stack.Navigator>
    //     <Stack.Screen 
    //       name="Home" 
    //       component={ContactListScreen} 
    //       options={{ headerTitle: () => <Text style={Exstyles.heading}>Contact List</Text> }} 
    //     />
    //     <Stack.Screen 
    //       name="CreateContact" 
    //       component={CreateNewContact} 
    //       options={{ headerTitle: 'Add New Contact' }} 
    //     />
    //      <Stack.Screen 
    //       name="UpdateContact" 
    //       component={UpdateContact} 
    //       options={{ headerTitle: 'Update Contact' }} 
    //     />
    //     <Stack.Screen 
    //       name="FavouriteScreen" 
    //       component={FavoriteContactsScreen} 
    //       options={{ headerTitle: 'Favourite Contact' }} 
    //     />
    //   </Stack.Navigator> */}
    // </NavigationContainer>
    <NavigationContainer>
    <Drawer.Navigator initialRouteName="ContactList">
      <Drawer.Screen 
        name="MyContacts" 
        component={ContactStack} 
        
      />
      <Drawer.Screen name="ContactList" component={ContactListScreen} />
      <Drawer.Screen name="Favourite" component={FavoriteContactsScreen} />
      {/* Add more drawer screens here if needed */}
    </Drawer.Navigator>
  </NavigationContainer>
  );
}


