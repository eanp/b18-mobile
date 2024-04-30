import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const ListRecipes = ({navigation}) => {
  const [data, setData] = useState();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let res = await axios.get('https://recipe-one-kappa.vercel.app/recipes');
    if (res?.data?.data) {
      setData(res.data.data);
    }
  };

  return (
    <View style={recipeStyles.container}>
      <Text style={recipeStyles.text}>List Recipes</Text>
      <ScrollView style={recipeStyles.listmenu}>
        {data?.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() =>
                navigation.navigate('DetailRecipes', {id: item.id})
              }>
              <Text
                style={[recipeStyles.text, {fontSize: 28, fontWeight: '700'}]}>
                {item.title}
              </Text>
              <Text style={recipeStyles.text}>{item.ingredient}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const recipeStyles = StyleSheet.create({
  container: {
    padding: 20,
  },
  text: {
    color: 'black',
    fontSize: 20,
  },
  listmenu: {
	marginVertical:40
  }
});

export default ListRecipes;
