import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';

const TABS = {
  MAIN: 'Home',
  SEARCH: 'Search',
  CART: 'Cart',
  WISHLIST: 'Wishlist',
  PROFILE: 'Profile',
};

const Footer = () => {
  const route = useRoute();
  const selectedTab = route.name;
  const navigation = useNavigation();
  const setSelectedTab = tab => {
    if (tab === TABS.MAIN || tab === TABS.CART) navigation.navigate(tab);
    else alert('Primarily for testing purpose');
  };
  return (
    <View style={styles.drawerContainer}>
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => {
          setSelectedTab(TABS.MAIN);
        }}>
        <Image
          source={require('../images/home.png')}
          style={
            selectedTab === TABS.MAIN
              ? [styles.drawerImage, styles.drawerImageActive]
              : styles.drawerImage
          }
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => {
          setSelectedTab(TABS.SEARCH);
        }}>
        <Image
          source={require('../images/search-interface-symbol.png')}
          style={
            selectedTab === TABS.SEARCH
              ? [styles.drawerImage, styles.drawerImageActive]
              : styles.drawerImage
          }
        />
      </TouchableOpacity>

      <View style={styles.drawerItem}>
        <TouchableOpacity
          style={
            selectedTab === TABS.CART
              ? [styles.middleItem, styles.middleItemActive]
              : styles.middleItem
          }
          onPress={() => {
            setSelectedTab(TABS.CART);
          }}>
          <Image
            source={require('../images/bag.png')}
            style={[styles.drawerImage, {tintColor: '#fff'}]}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => {
          setSelectedTab(TABS.WISHLIST);
        }}>
        <Image
          source={require('../images/heart.png')}
          style={
            selectedTab === TABS.WISHLIST
              ? [styles.drawerImage, styles.drawerImageActive]
              : styles.drawerImage
          }
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => {
          setSelectedTab(TABS.PROFILE);
        }}>
        <Image
          source={require('../images/user.png')}
          style={
            selectedTab === TABS.PROFILE
              ? [styles.drawerImage, styles.drawerImageActive]
              : styles.drawerImage
          }
        />
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(Footer);
const styles = StyleSheet.create({
  drawerContainer: {
    width: '100%',
    height: 70,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    flexDirection: 'row',
  },
  drawerItem: {
    width: '20%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleItem: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#000',
  },
  middleItemActive: {
    backgroundColor: 'green',
  },
  drawerImage: {
    width: 24,
    height: 24,
    tintColor: '#8e8e8e',
  },
  drawerImageActive: {
    tintColor: '#000',
  },
});
