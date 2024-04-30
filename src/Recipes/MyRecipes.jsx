import React, { useEffect, useState } from 'react';
import {Image, PermissionsAndroid, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from "react-native-image-picker";
import axios from 'axios';

const base_url = "https://recipe-one-kappa.vercel.app/"

let headers = {
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMzYTQ1NDU4LTgyYjUtNDczZi1iMjhkLTJiN2E2YzA5ZDUwYSIsImVtYWlsIjoiY2VjaWxAZ21haWwuY29tIiwicGhvdG8iOm51bGwsImNyZWF0ZWRfYXQiOiIyMDI0LTAzLTA4VDA4OjQyOjQ4LjQ3NloiLCJpYXQiOjE3MDk4ODQzMjd9.qKCs1JT4Pwdfb96ubhFBfKQjJP7lJhjJ4plrTffia7s"
  }
}

const MyRecipes = ({navigation}) => {
  const [photo,setPhoto] = useState(null)
  const [res,setRes] = useState(null)

  useEffect(()=>{
    res && navigation.navigate("ListRecipes")
  },res)

  let uploadRecipe = async () => {
    let formData = new FormData()
    formData.append('title','nasi bakar')
    formData.append('ingredient','nasi bakar')
    formData.append('category_id',1)
    formData.append('photo',{
      uri:photo.uri,
      name: photo.fileName,
      type: photo.type
    })

    let result = await axios.post(base_url+"recipes",formData,headers)
    console.log(result)
    result && setRes(result.data)
  }

  const requestPermission = async ()=> {
    try{
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA, {
          title: 'App Camera Permission',
          message: 'this app need camera permission',
          buttonPositive: 'Oke',
          buttonNegative: 'Decline'
        }
      )

      if(granted === PermissionsAndroid.RESULTS.GRANTED){
        console.log("success camera permission")
      } else{
        console.log("failed camera permission")
        console.log(PermissionsAndroid.RESULTS.GRANTED)
      }
    } catch (err){
      console.log("failed camera permission")
      console.log(PermissionsAndroid.RESULTS.GRANTED)
    }
  }

  const cameraLaunch = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, res => {
      console.log('response camera ', res);
      if (res.didCancel) {
        console.log('user cancel camera');
      } else if (res.error) {
        console.log('camera error', res.errorMessage);
      } else {
        console.log('camera success');
        console.log(res);
        setPhoto(res.assets[0]);
      }
    });
  };

  const galleryLaunch = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, res => {
      console.log('response gallery ', res);
      if (res.didCancel) {
        console.log('user cancel gallery');
      } else if (res.error) {
        console.log('gallery error', res.errorMessage);
      } else {
        console.log('gallery success');
        console.log(res);
        setPhoto(res.assets[0]);
      }
    });
  };

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.title} onPress={()=>requestPermission()}>My Recipes</Text>
      <View style={styles.inputTitle}>
        <Ionicons name="book" color="grey" size={28} style={styles.icon} />
        <TextInput style={styles.input} value='Title' />
      </View>
      <TextInput style={[styles.input,styles.textarea]}value='Ingredients' />
	  <TouchableOpacity style={[styles.input,styles.inputFoto]} onPress={()=>cameraLaunch()}>
		<Text>Add Photo</Text>
	  </TouchableOpacity>
	  <TouchableOpacity style={[styles.input,styles.inputFoto]} onPress={()=>galleryLaunch()} >
		<Text>Add Photo From Galerry</Text>
	  </TouchableOpacity>

    {
      photo ? 
      <Image style={{height:200,width:200}} source={{uri:photo.uri}} />
      :null
    }

	  <TouchableOpacity style={styles.PostButton} onPress={()=>uploadRecipe()}>
		<Text style={styles.PostButtonText}>Post</Text>
	  </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    color: '#EFC81A',
    fontSize: 40,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 40,
  },
  container: {
    backgroundColor: '#F5F5F5',
    marginHorizontal:20
  },
  inputTitle: {
    backgroundColor:"white",
    flexDirection: 'row',
    alignItems: 'center',
	paddingHorizontal:8,
	width:"80%",
	borderRadius:8
  },
  input: {backgroundColor: 'white', width: '80%',borderRadius:8,color:"black",paddingHorizontal:8,alignItems:""},
  textarea: {
	marginTop:20,
	height:200
  }
  ,
  icon: {
    marginRight: 10,
  },
  inputFoto:{
	marginTop:20,
	height:40,
	justifyContent:'center',
	alignItems:'center'
  },
  PostButton:{
	marginTop:20,
	height:40,
	justifyContent:'center',
	alignItems:'center',
	backgroundColor:"#EFC81A",
	width:"60%",
	borderRadius:8
},
PostButtonText:{
	  fontSize:20,
	  fontWeight:"700"
  }
});

export default MyRecipes;
