import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

const ListRecipes = ({route,navigation}) => {
	const [data,setData] = useState()
	
	useEffect(()=>{
		getData()
	},[])

	const getData = async () => {
		let res = await axios.get(`https://recipefree.vercel.app/recipes/${route?.params?.id}`)
		if(res?.data?.data){
			setData(res.data.data)
		}
	}

  return (
	<View style={recipeStyles.container}>
		<Text style={recipeStyles.text}>List Recipes</Text>

				<View>
					<Text style={[recipeStyles.text,{fontSize:28,fontWeight:'700'}]}>{data?.title}</Text>
					<Text style={recipeStyles.text}>{data?.ingredient}</Text>
					<Image source={{uri:data?.photo}} style={recipeStyles.image} />
				</View>
	</View>
  )
}

const recipeStyles = StyleSheet.create({
	container: {
		padding:20
	},
	text: {
		color:"black",
		fontSize:20
	},
	image:{
		height:200,
		width:200
	}
})

export default ListRecipes