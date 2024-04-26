import React from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const MyRecipes = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Recipes</Text>
      <View style={styles.inputTitle}>
        <Ionicons name="book" color="grey" size={28} style={styles.icon} />
        <TextInput style={styles.input} value='Title' />
      </View>
      <TextInput style={[styles.input,styles.textarea]}value='Ingredients' />
	  <TouchableOpacity style={[styles.input,styles.inputFoto]} >
		<Text>Add Photo</Text>
	  </TouchableOpacity>
	  <TouchableOpacity style={[styles.input,styles.inputFoto]} >
		<Text>Add Category</Text>
	  </TouchableOpacity>
	  <TouchableOpacity style={styles.PostButton} >
		<Text style={styles.PostButtonText}>Post</Text>
	  </TouchableOpacity>
    </View>
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
    alignItems: 'center',
  },
  inputTitle: {
    backgroundColor:"white",
    flexDirection: 'row',
    alignItems: 'center',
	paddingHorizontal:8,
	width:"80%",
	borderRadius:8
  },
  input: {backgroundColor: 'white', width: '80%',borderRadius:8,color:"black",paddingHorizontal:8,alignItems:"flex-start"},
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
