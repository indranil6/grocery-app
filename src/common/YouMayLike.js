import {View, Text, FlatList, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import ProductCard from './ProductCard';
import axios from 'axios';

const YouMayLike = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);
  if (products.length === 0) {
    return null;
  }
  return (
    <View style={{marginTop: 20}}>
      <Text style={styles.sectionTitle}>You may also like</Text>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </View>
  );
};

export default YouMayLike;

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
});
