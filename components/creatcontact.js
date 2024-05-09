import { View,Text,Button,TextInput,Image } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import AddCntactStyle from "../styles/addcontactstyle";
import Exstyles from "../styles/style";
import React, { useState,useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';

const CreateNewContact=({navigation})=>{
    const[name,setName]=useState('');
    const[mobile,setMobile]=useState(0);
    const[landline,setLandline]=useState(0);
    const[isFavourite,setIsFavourite]=useState(false);
    const[hasGalleryPermission,setGalleryPermission]=useState(null);
    const[imageUri,setImageUri]=useState(null);
    const [mobileError, setMobileError] = useState('');
    const [landLineError, setlandLineError] = useState('');
    useEffect(()=>{
      (async()=>{
        const galleryStatus=await ImagePicker.requestMediaLibraryPermissionsAsync();
        setGalleryPermission(galleryStatus.status==='granted');
      })();
    },[]);
    const pickImage=async()=>{
      let result=await ImagePicker.launchImageLibraryAsync({
        mediaTypes:ImagePicker.MediaTypeOptions.Images,
        allowsEditing:true,
        aspect:[4,3],
        quality:1
      });
      console.log(result.assets[0].uri);
      
      if(!result.canceled)
        {
          setImageUri(result.assets[0].uri);
        }
    };
    if(hasGalleryPermission==false)
      {
        return <Test> No Access</Test>
      }
      const validateMobile = (mobileNumber) => {
        const isValid = /^\d{10}$/.test(mobileNumber);
        setMobileError(isValid ? '' : 'Mobile number must be 10 digits');
        return isValid;
    };
    const validateLandline = (landLineNumber) => {
      const isValid = /^\d{10}$/.test(landLineNumber);
      setlandLineError(isValid ? '' : 'LandLine number must be 10 digits');
      return isValid;
  };
    const savecontact=async()=>{
      if (!name.trim()) {
        alert('Please enter a name');
        return;
    }
    if (!validateLandline(landline)) {
      return;
  }
    if (!validateMobile(mobile)) {
        return;
    }
        try{
            const key='mycontacts';
            let existingContacts = [];
            const existingContactsJson = await AsyncStorage.getItem(key);
            if (existingContactsJson) {
              
              existingContacts = JSON.parse(existingContactsJson);
              if (!Array.isArray(existingContacts)) {
                
                existingContacts = [existingContacts];
              }
            }
            console.warn('Existing',existingContactsJson)
            
            const contact={
                id:mobile,
                name:name,
                mobile:mobile,
                landline:landline,
                imageUri:imageUri,
                isFavourite:isFavourite
            }
            const updatedContacts = [...existingContacts, contact];
            await AsyncStorage.setItem(key, JSON.stringify(updatedContacts));
            await navigation.navigate('Home')
            setName('');
            setLandline('');
            setMobile('');
            setImageUri('');
            alert('Contact Saved Successfully');
            
            console.warn('Data in',updatedContacts);
           
        }
        catch(error)
        {
            console.error('Error saving data',error);
        }
    }
  
    return(
        <View style={AddCntactStyle.container}>
    <Text style={AddCntactStyle.text}>Name:</Text>
    <TextInput style={AddCntactStyle.textInput} placeholder="Enter Name" value={name} onChangeText={setName}></TextInput>
    <Text style={AddCntactStyle.text}>Mobile Number:</Text>
    {/* <TextInput style={AddCntactStyle.textInput} placeholder="Enter mobile no" keyboardType="numeric" value={mobile} onChangeText={setMobile} ></TextInput> */}
    <TextInput
                style={AddCntactStyle.textInput}
                placeholder="Enter 10-digit mobile no"
                keyboardType="numeric"
                value={mobile}
                onChangeText={(text) => {
                    setMobile(text);
                    validateMobile(text);
                }}
            />
            {mobileError ? <Text style={{color:'red'}}>{mobileError}</Text> : null}
    <Text style={AddCntactStyle.text}>Landline number:</Text>
    <TextInput style={AddCntactStyle.textInput} placeholder="Enter LandLine no" keyboardType="numeric" value={landline}  onChangeText={(text) => {
                    setLandline(text);
                    validateLandline(text);
                }} ></TextInput>
                {landLineError ? <Text style={{color:'red'}}>{landLineError}</Text> : null}
    
    <View style={AddCntactStyle.buttonContainer}>
      <Button title='Browse image' onPress={()=>{pickImage()}}></Button>
      {imageUri && <Image source={{uri:imageUri}}></Image>}
      <View style={{ width: 10 }} />
    <Button title='Save' onPress={savecontact} ></Button>
    <View style={{ width: 10 }} />
    <Button title='favourite' onPress={()=>{setIsFavourite(true)}} ></Button>
    </View>
   
    </View>
    )
}

export default CreateNewContact;