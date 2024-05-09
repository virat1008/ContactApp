import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './home';
import ContactListScreen from './contactlistscreen';
import FavoriteContactsScreen from './favouritecontact';
import CreateNewContact from './creatcontact';
import UpdateContact from './updatecontact';
import { Text } from 'react-native';
import Exstyles from '../styles/style';
const Stack = createNativeStackNavigator();
const ContactStack = () => (
    <Stack.Navigator>
       <Stack.Screen 
        name="HomeScreen" 
        component={HomeScreen} 
        options={{ headerTitle: 'HomePage' }} 
      />
      <Stack.Screen 
        name="Home" 
        component={ContactListScreen} 
        options={{ headerTitle: () => <Text style={Exstyles.heading}>Contact List</Text> }} 
      />
      <Stack.Screen 
        name="CreateContact" 
        component={CreateNewContact} 
        options={{ headerTitle: 'Add New Contact' }} 
      />
      <Stack.Screen 
        name="UpdateContact" 
        component={UpdateContact} 
        options={{ headerTitle: 'Update Contact' }} 
      />
      <Stack.Screen 
        name="FavouriteScreen" 
        component={FavoriteContactsScreen} 
        options={{ headerTitle: 'Favourite Contact' }} 
      />
     
    </Stack.Navigator>
  );

export default ContactStack;