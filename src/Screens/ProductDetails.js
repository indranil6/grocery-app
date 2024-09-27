import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';
import Footer from '../common/Footer';
import Header from '../common/Header';
import {useRoute} from '@react-navigation/native';

const {height: screenHeight} = Dimensions.get('screen');
const ProductDetails = () => {
  const {params} = useRoute();
  const {product} = params;
  return (
    <View style={{flex: 1}}>
      <Header />
      <ProductDetailsPage product={product} />
      {/* <Footer /> */}
    </View>
  );
};

export default ProductDetails;
const ProductDetailsPage = ({product}) => {
  return (
    <ScrollView style={styles.container}>
      {/* Product Image */}
      <Image source={{uri: product.image}} style={styles.productImage} />

      {/* Product Info Section */}
      <View style={styles.productDetails}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.category}>{product.category}</Text>

        {/* Price Section */}
        <Text style={styles.price}>${product.price}</Text>

        {/* Description Section */}
        <Text style={styles.description}>{product.description}</Text>

        {/* Add to Cart Button */}
        <TouchableOpacity style={styles.addToCartButton}>
          <Image
            style={styles.addToCartImage}
            source={require('../images/bag.png')}
          />
          <Text style={styles.buttonText}>Buy Now</Text>
        </TouchableOpacity>

        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
          <TouchableOpacity
            style={[styles.addToCartButton, {flex: 1, marginRight: 5}]}>
            <Image
              style={styles.addToCartImage}
              source={require('../images/bag.png')}
            />
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.addToCartButton, {flex: 1, marginLeft: 5}]}>
            <Image
              style={styles.addToCartImage}
              source={require('../images/bag.png')}
            />
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 10,
    paddingBottom: 100,
  },
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  productDetails: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -30, // To overlay the product image slightly
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  category: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
    textTransform: 'capitalize',
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
    marginBottom: 20,
  },
  addToCartButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addToCartImage: {
    width: 22,
    height: 22,
    marginRight: 5,
    tintColor: '#fff',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
