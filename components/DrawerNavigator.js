// DrawerNavigator.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ContactListScreen from './contactlistscreen';
import FavoriteContactsScreen from './favouritecontact';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="ContactList">
      <Drawer.Screen name="ContactList" component={ContactListScreen} />
      <Drawer.Screen name="Favourite" component={FavoriteContactsScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
