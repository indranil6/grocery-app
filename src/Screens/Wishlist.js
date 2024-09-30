import {View, Text, FlatList, Image, StyleSheet} from 'react-native';
import React from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import {useSelector} from 'react-redux';
import ProductCard from '../common/ProductCard';

const Wishlist = () => {
  const products = useSelector(state => state.wishlist);
  return (
    <View style={{flex: 1}}>
      <Header />
      <View style={styles.container}>
        <Text style={styles.pageTitle}>Your Wishlist</Text>
        <FlatList
          data={products}
          renderItem={({item}) => <ProductCard product={item} />}
          keyExtractor={product => product.id.toString()}
          onEndReached={() => console.log('Load more products...')} // Add pagination logic here
          ListEmptyComponent={
            <>
              <Image
                source={require('../images/empty-cart.png')}
                style={styles.notFoundImage}
              />
              <Text style={styles.notFoundText}>Your wishlist is empty</Text>
            </>
          }
        />
      </View>
      <Footer />
    </View>
  );
};

export default Wishlist;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginBottom: 70,
  },
  pageTitle: {
    fontSize: 24,
    marginTop: 20,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  notFoundImage: {
    width: 150,
    height: 150,
    alignSelf: 'center',
  },
  notFoundText: {
    fontSize: 18,
    alignSelf: 'center',
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    color: 'black',
  },
});
