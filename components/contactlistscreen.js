import { View, Text, Image, FlatList, Button, ScrollView, TouchableOpacity,TextInput} from "react-native";
import Exstyles from "../styles/style";
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { SwipeListView } from "react-native-swipe-list-view";

const ContactListScreen = () => {
    const navigation = useNavigation();
    const [contactData,setContactData]=useState([]);
    const [searchQuery, setSearchQuery] = useState('');
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
          const sortedContacts = contact.sort((a, b) => a.name.localeCompare(b.name));
          const contactsWithIds = sortedContacts.map((contact, index) => ({
            ...contact,
            id: index.toString(), 
          }));
          setContactData(contactsWithIds);
          //console.warn('Contact Data',contactData)
        }
      }
      catch(error)
      {
        console.error('Error displaying data',error);
      }
     
    }
   
  const favouriteItem=()=>{
    navigation.navigate('FavouriteScreen');
  }
    const handleAdd=()=>{
        navigation.navigate('CreateContact');
    }
    const handleUpdate = (contact) => {
      navigation.navigate('UpdateContact', { contact });
    };
    const handleSearch = (text) => {
      setSearchQuery(text);
  };

  const filteredContacts = contactData.filter(contact =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const renderItem = ({ item }) => (
     
    <TouchableOpacity onPress={()=>handleUpdate(item)}>
    
      <View style={Exstyles.contactItem}>
       <Image source={{ uri: item.imageUri }} style={Exstyles.contactPhoto} /> 
      <Text style={Exstyles.contactName}>{item.name}</Text>
    </View>
    </TouchableOpacity>

    
  );
  const renderHiddenItem = (data, rowMap) => (
    <View style={Exstyles.rowBack}>
        <TouchableOpacity
            style={[Exstyles.backRightBtn, Exstyles.backRightBtnRight]}
            onPress={deleteContact}
        >
            <Text style={Exstyles.backTextWhite}>Delete</Text>
        </TouchableOpacity>
    </View>
);
  return (
    // <View>
      
    //   <ScrollView style={{marginBottom:80}}>
    //   {/* <FlatList
    //     data={contactData}
    //     renderItem={renderItem}
    //     keyExtractor={(item) => item.id.toString()}
    //     contentContainerStyle={Exstyles.listContainer}
    //   /> */}
    //    {contactData.length > 0 ? (
    //     <FlatList
    //       data={contactData}
    //       renderItem={renderItem}
    //       keyExtractor={(item) => item.id.toString()}
    //       contentContainerStyle={Exstyles.listContainer}
    //     />
    //   ) : (
    //     <Text style={{marginTop:40}}>{contactData.name}</Text>
    //   )}
    //   </ScrollView>
    //   <View style={Exstyles.buttonContainer}>
    //     <Button title="Add" onPress={handleAdd}></Button>
       
    //     <Button title="Go" onPress={favouriteItem}></Button>
    //   </View>
     
     
    // </View>
    
    <View>
       
    <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
        placeholder="Search by name"
        value={searchQuery}
        onChangeText={handleSearch}
    />
   
    <ScrollView style={{ marginBottom: 80 }}>
        {filteredContacts.length > 0 ? (
            <FlatList
                data={filteredContacts}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={Exstyles.listContainer}
            />
        ) : (
            <Text style={{ marginTop: 40 }}>No matching contacts found</Text>
        )}
    </ScrollView>
    <View style={Exstyles.buttonContainer}>
        <Button title="Add" onPress={handleAdd}></Button>
        
    </View>
</View>
  );
};

export default ContactListScreen;
