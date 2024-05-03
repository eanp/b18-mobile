// In App.js in a new project

import * as React from 'react';
import {View, Text, Button} from 'react-native';
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MyRecipes from '../Recipes/MyRecipes';
import ListRecipes from '../Recipes/ListRecipes';
import DetailRecipes from '../Recipes/DetailRecipes';
import {useDispatch, useSelector} from 'react-redux';
import { authLogin, authLogout } from '../storages/actions/auth';

function LoginScreen() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const data = {
    email : "zerfean@gmail.com",
    password: "123123"
  }
  return(
    <View>
      <Text style={{color:"red",fontSize:40}} onPress={()=>dispatch(authLogin(data))}>Login</Text>
      {auth.isLoading ? <Text style={{color:"red",fontSize:30}}>Loading</Text> : null}
    </View>
  )
}

function HomeScreen({navigation}) {
  const dispatch = useDispatch();
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
      <Button
        title="Logout"
        color={"red"}
        onPress={() => 
          dispatch(authLogout())
        }
      />
    </View>
  );
}
function ProfileScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Profile Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

function DetailsScreen({route, navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{color: 'blue'}}>Details Screen</Text>
      <Text style={{color: 'blue'}}>{route?.params?.idRecipe ?? '-'}</Text>

      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go to Details"
        onPress={() => navigation.push('Details', {idRecipe: 'oauibdu92uo'})}
      />
    </View>
  );
}

const Stack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Home() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function Recipes() {
  return (
    <Stack.Navigator initialRouteName="ListRecipes">
      <Stack.Screen
        name="ListRecipes"
        component={ListRecipes}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailRecipes"
        component={DetailRecipes}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function BottomNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Main"
      activeColor="#e91e63"
      barStyle={{backgroundColor: 'tomato'}}>
      <Tab.Screen
        name="Main"
        component={Home}
        options={{
          tabBarLabel: 'Main',
          tabBarIcon: ({color}) => (
            <Ionicons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Recipes"
        component={Recipes}
        options={{
          headerShown: false,
          tabBarLabel: 'Recipes',
          tabBarIcon: ({color}) => (
            <Ionicons name="apps" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="MyRecipes"
        component={MyRecipes}
        options={{
          headerShown: false,
          tabBarLabel: 'MyRecipes',
          tabBarIcon: ({color}) => (
            <Ionicons name="menu" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => (
            <Ionicons name="contact" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function Router() {
  const auth = useSelector(state => state.auth);
  return (
    <NavigationContainer>
      <AuthStack.Navigator>
        {auth.data ? <AuthStack.Screen name="MainNavigator" component={BottomNavigator} options={{headerShown:false}} /> : <AuthStack.Screen name="Login" component={LoginScreen} options={{headerShown:false}} />}
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}

export default Router;
