import { View, Text, Image, FlatList, Button, ScrollView, TouchableOpacity} from "react-native";
import Exstyles from "../styles/style";
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';

const FavoriteContactsScreen = () => {
    const navigation = useNavigation();
    const [contactData,setContactData]=useState([]);
  
    useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
          loadData();
      });

      return unsubscribe;
  }, [navigation]);
  
    const loadData=async()=>{
      console.warn('list');
      try{
        const jsonValue = await AsyncStorage.getItem('mycontacts');
        if (jsonValue !== null) {
          const contact = JSON.parse(jsonValue);
          // console.warn('list contact',contact)
          const contactsWithIds = contact.map((contact, index) => ({
            ...contact,
            id: index.toString(), 
          }));
          setContactData(contactsWithIds);
          console.warn('Contact Data',contactData)
        }
      }
      catch(error)
      {
        console.error('Error displaying data',error);
      }
     
    }
    const deleteItem = async (key) => {
      try {
          await AsyncStorage.removeItem(key);
          console.log('Item deleted successfully');
      } catch (error) {
          console.error('Error deleting item:', error);
      }
  };
    const handleAdd=()=>{
        navigation.navigate('CreateContact');
    }
    const handleUpdate = (contact) => {
      navigation.navigate('UpdateContact', { contact });
    };
  const renderItem = ({ item }) => (
     
    <TouchableOpacity onPress={()=>handleUpdate(item)}>
    {
        item.isFavourite?<View style={Exstyles.contactItem}>
        <Image source={{ uri: item.imageUri }} style={Exstyles.contactPhoto} /> 
       <Text style={Exstyles.contactName}>{item.name}</Text>
     </View>:null
    }
      
    </TouchableOpacity>

    
  );
  
  return (
    <View>
      
      <ScrollView style={{marginBottom:80}}>
      {/* <FlatList
        data={contactData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={Exstyles.listContainer}
      /> */}
       {contactData.length > 0 ? (
        <FlatList
          data={contactData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={Exstyles.listContainer}
        />
      ) : (
        <Text style={{marginTop:40}}>{contactData.name}</Text>
      )}
      </ScrollView>
     
       
     
    </View>
  );
};

export default FavoriteContactsScreen;
