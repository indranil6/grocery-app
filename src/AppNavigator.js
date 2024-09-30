// In App.js in a new project

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from './Screens/Splash';
import Login from './Screens/Login';
import Signup from './Screens/Signup';
import Home from './Screens/Home';
import ProductDetails from './Screens/ProductDetails';
import CartPage from './Screens/Cart';
import CheckoutPage from './Screens/Checkout';
import ProfilePage from './Screens/Profile';
import Wishlist from './Screens/Wishlist';
import SearchPage from './Screens/Search';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Cart"
          component={CartPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Checkout"
          component={CheckoutPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Profile"
          component={ProfilePage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Wishlist"
          component={Wishlist}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Search"
          component={SearchPage}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
