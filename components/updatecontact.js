
import { View,Text,TextInput,Button,pickImage,image } from "react-native";
import CreateNewContact from "./creatcontact";
import { useEffect,useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import AddCntactStyle from "../styles/addcontactstyle";
import { useRoute } from '@react-navigation/native';
const UpdateContact=({navigation})=>{
    const route=useRoute();
    const contact=route.params;
    const [name, setName] = useState(contact.name);
    const [mobile, setMobile] = useState(contact.mobile);
    const [landline, setLandline] = useState(contact.landline);
    const[isFavourite,setIsFavourite]=useState(contact.isFavourite);

    useEffect(()=>{
        loadContact();
    },[])
    const loadContact = async () => {
        try {
            console.warn('contact detail', contact);
            console.warn('Checking Id',contact.contact.id);
            setName(contact.contact.name);
            setMobile(contact.contact.mobile.toString());
            setLandline(contact.contact.landline.toString());
            setIsFavourite(contact.contact.isFavourite);
           
        } catch (error) {
            console.error('Error loading contact details:', error);
        }
    };
    const updateContact = async () => {
        try {
            const storedContactsJson = await AsyncStorage.getItem('mycontacts');
            let storedContacts = storedContactsJson ? JSON.parse(storedContactsJson) : [];
            
           // console.log('Stored Contacts:', storedContacts);
            console.log('Before:', contact.contact.isFavourite)
            const updatedContacts = storedContacts.map((item) => {
                console.log('Item ID:', item.id);
                console.log('Contact ID:', contact.contact.id);
                
                if (item.mobile === contact.contact.mobile) {
                    return {
                        ...item,
                        name: name,
                        mobile: parseInt(mobile),
                        landline: parseInt(landline),
                        isFavourite: isFavourite
                    };
                }
                return item;
            });
            
            console.log('Updated Contacts:', updatedContacts);
            console.log('After:', contact.contact.isFavourite)
            await AsyncStorage.setItem('mycontacts', JSON.stringify(updatedContacts));
            alert('Contact updated successfully');
            navigation.goBack();
        } catch (error) {
            console.error('Error updating contact:', error);
        }
    };
    
    
    // const updateContact = async () => {
    //     try {
            
    //         const storedContactsJson = await AsyncStorage.getItem('mycontacts');
    //         let storedContacts = storedContactsJson ? JSON.parse(storedContactsJson) : [];
            
            
    //         const contactIndex = contact.contact.id;
    //         console.warn('Contact Index',contactIndex);
    //         console.warn('Index matching',contact.contact.id)
            
    //         if (contactIndex !== -1) {
        
    //             const updatedContacts = [...storedContacts];
                
                
    //             updatedContacts[contactIndex] = {
    //                 ...updatedContacts[contactIndex],
    //                 name: name,
    //                 mobile: parseInt(mobile),
    //                 landline: parseInt(landline),
                    
    //             };
                
       
    //             await AsyncStorage.setItem('mycontacts', JSON.stringify(updatedContacts));
    //             console.log(updatedContacts)
    //             alert('Contact updated successfully');
    //             navigation.goBack();
    //         } else {
    //             alert('Contact not found');
    //         }
    //     } catch (error) {
    //         console.error('Error updating contact:', error);
    //     }
    // };
    markFavourite=()=>{
        setIsFavourite(!isFavourite);
    }
    const deleteContact = async () => {
        try {
            const storedContactsJson = await AsyncStorage.getItem('mycontacts');
            let storedContacts = storedContactsJson ? JSON.parse(storedContactsJson) : [];
           // console.log(item.id);
            console.log(contact.contact.id);
            const updatedContacts = storedContacts.filter(item => item.mobile !== contact.contact.mobile);
            console.log(updatedContacts)
            await AsyncStorage.setItem('mycontacts', JSON.stringify(updatedContacts));
            alert('Contact deleted successfully');
            navigation.goBack();
        } catch (error) {
            console.error('Error deleting contact:', error);
        }
    };
    return(
        <View style={AddCntactStyle.container}>
        <Text style={AddCntactStyle.text}>Name:</Text>
        <TextInput style={AddCntactStyle.textInput} placeholder="Enter Name" value={name} onChangeText={setName}></TextInput>
        <Text style={AddCntactStyle.text}>Mobile Number:</Text>
        <TextInput style={AddCntactStyle.textInput} placeholder="Enter mobile no" keyboardType="numeric" value={mobile} onChangeText={setMobile} ></TextInput>
        <Text style={AddCntactStyle.text}>Landline number:</Text>
        <TextInput style={AddCntactStyle.textInput} placeholder="Enter LandLine no" keyboardType="numeric" value={landline} onChangeText={setLandline} ></TextInput>
        
        <View style={AddCntactStyle.buttonContainer}>
        <Button title="Pick Image" onPress={pickImage}  />
          {image && <Image source={{ uri: image }} style={AddCntactStyle.image} />}
          <View style={{ width: 10 }} />
        <Button title='Save' onPress={updateContact} ></Button>
        <View style={{ width: 10 }} />
        <Button title='Delete' onPress={deleteContact} />
        <View style={{ width: 10 }} />
        <Button title='favourite' onPress={markFavourite} ></Button>
        </View>
       
        </View>
    )
}

export default UpdateContact;