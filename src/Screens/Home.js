import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';

const Home = () => {
  return (
    <View style={styles.container}>
      <View style={styles.drawerContainer}>
        <TouchableOpacity style={styles.drawerItem}>
          <Image
            source={require('../images/home.png')}
            style={styles.drawerImage}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.drawerItem}>
          <Image
            source={require('../images/search-interface-symbol.png')}
            style={styles.drawerImage}
          />
        </TouchableOpacity>

        <View style={styles.drawerItem}>
          <TouchableOpacity style={styles.middleItem}>
            <Image
              source={require('../images/bag.png')}
              style={[styles.drawerImage, {tintColor: '#fff'}]}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.drawerItem}>
          <Image
            source={require('../images/heart.png')}
            style={styles.drawerImage}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.drawerItem}>
          <Image
            source={require('../images/user.png')}
            style={styles.drawerImage}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
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
  drawerImage: {
    width: 24,
    height: 24,
  },
});
