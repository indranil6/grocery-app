import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useMemo} from 'react';
import Footer from '../common/Footer';
import Header from '../common/Header';
import {useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
} from '../redux/actions';
import YouMayLike from '../common/YouMayLike';
const ProductDetails = () => {
  const {params} = useRoute();
  const {product} = params;
  return (
    <View style={{flex: 1}}>
      <Header />
      <ProductDetailsPage product={product} />

      <Footer />
    </View>
  );
};

export default ProductDetails;
const ProductDetailsPage = ({product}) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const isInCart = useMemo(() => {
    return cartItems.some(item => item.id === product.id);
  }, [cartItems, product.id]);

  const cartProduct = useMemo(() => {
    return cartItems.find(item => item.id === product.id);
  }, [cartItems, product.id]);

  // console.log(isInCart);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };
  const handleIncrementQuantity = () => {
    dispatch(incrementQuantity(product.id));
  };
  const handleDecrementQuantity = () => {
    dispatch(decrementQuantity(product.id));
  };
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
        <TouchableOpacity
          style={[styles.addToCartButton, {backgroundColor: '#000'}]}>
          <Image
            style={styles.addToCartImage}
            source={require('../images/payment-method.png')}
          />
          <Text style={styles.buttonText}>Buy Now</Text>
        </TouchableOpacity>

        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
          {isInCart ? (
            <View style={{flex: 1, flexDirection: 'row'}}>
              <TouchableOpacity
                style={[
                  styles.addToCartButton,
                  {
                    flex: 1,
                    borderTopEndRadius: 0,
                    borderBottomEndRadius: 0,
                  },
                ]}
                onPress={handleDecrementQuantity}>
                <Text style={styles.buttonText}>-</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.addToCartButton,
                  {flex: 1, borderRadius: 0, marginHorizontal: 0.5},
                ]}>
                <Text style={styles.buttonText}>{cartProduct.quantity}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.addToCartButton,
                  {
                    flex: 1,
                    borderTopStartRadius: 0,
                    borderBottomStartRadius: 0,
                  },
                ]}
                onPress={handleIncrementQuantity}>
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={[styles.addToCartButton, {flex: 1, marginRight: 5}]}
              onPress={handleAddToCart}>
              <Image
                style={styles.addToCartImage}
                source={require('../images/bag.png')}
              />
              <Text style={styles.buttonText}>Add to Cart</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[
              styles.addToCartButton,
              {flex: 1, marginLeft: 5, backgroundColor: 'green'},
            ]}>
            <Image
              style={styles.addToCartImage}
              source={require('../images/heart.png')}
            />
            <Text style={styles.buttonText}>Add to Wishlist</Text>
          </TouchableOpacity>
        </View>

        <YouMayLike />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 10,
    marginBottom: 70,
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
