import {useNavigation} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {toggleWishlistSelection} from '../redux/actions';

const ProductCard = ({product, cardStyles}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const wishlist = useSelector(state => state.wishlist);
  const addToWishlist = () => {
    dispatch(toggleWishlistSelection(product));
  };
  const isInTheWishlist = useMemo(() => {
    return wishlist.some(item => item.id === product.id);
  }, [wishlist, product.id]);

  return (
    <TouchableOpacity
      style={[styles.card, cardStyles]}
      onPress={() => {
        navigation.navigate('ProductDetails', {product});
      }}>
      <Image source={{uri: product.image}} style={styles.productImage} />
      <View style={styles.cardContent}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {product.description}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={styles.price}>${product.price}</Text>
          <TouchableOpacity
            style={styles.wishlistIconContainer}
            onPress={addToWishlist}>
            <Image
              source={
                isInTheWishlist
                  ? require('../images/heart-fill.png')
                  : require('../images/heart.png')
              }
              style={{width: 20, height: 20}}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    marginBottom: 20,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  category: {
    fontSize: 14,
    color: '#888',
    marginVertical: 5,
    textTransform: 'capitalize',
  },
  description: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e74c3c',
  },
  wishlistIconContainer: {
    backgroundColor: '#f8f8f8',
    padding: 10,
    borderRadius: 25,
    elevation: 5,
  },
});

export default React.memo(ProductCard);
