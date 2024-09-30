import React, {useEffect, useRef} from 'react';
import {View, Text, Animated, StyleSheet, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux'; // Assuming cartItems is in Redux store

const CartIcon = () => {
  const cartItems = useSelector(state => state.cart.items); // Get cart items from Redux
  const cartLength = cartItems.length;

  const scaleValue = useRef(new Animated.Value(1)).current; // Scale starts at 1

  useEffect(() => {
    // Trigger animation whenever cartItems length changes
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.2, // Scale up
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1, // Scale down back to normal
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [cartLength]);

  return (
    <TouchableOpacity style={styles.cartContainer}>
      <Animated.View
        style={[styles.cartIcon, {transform: [{scale: scaleValue}]}]}>
        <Text style={styles.cartText}>🛒</Text>
        {cartLength > 0 && <Text style={styles.cartBadge}>{cartLength}</Text>}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cartContainer: {
    position: 'absolute',
    top: 15,
    right: 20,
  },
  cartIcon: {
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  cartText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  cartBadge: {
    position: 'absolute',
    right: -10,
    top: -10,
    backgroundColor: '#e74c3c',
    color: '#fff',
    borderRadius: 25,
    padding: 5,
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default CartIcon;
