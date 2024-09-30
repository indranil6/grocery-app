import React, {useState, useMemo} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {useSelector, useDispatch} from 'react-redux';
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from '../redux/actions';
import Header from '../common/Header';
import Footer from '../common/Footer';
import {useNavigation} from '@react-navigation/native';
import CommonButton from '../common/CommonButton';

const CartPage = () => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const [selectedItems, setSelectedItems] = useState({});

  React.useEffect(() => {
    cartItems.forEach(item => {
      setSelectedItems(prevSelectedItems => ({
        ...prevSelectedItems,
        [item.id]: true,
      }));
    });
  }, [cartItems]);

  const navigation = useNavigation();
  const handleCheckout = () => {
    // Handle checkout logic
    navigation.navigate('Checkout', {
      cartItems: selectedCartItems,
      totalItems: selectedCartItems.length,
      totalPrice: calculateTotalPrice,
    });
  };

  const toggleSelection = id => {
    setSelectedItems(prevSelectedItems => ({
      ...prevSelectedItems,
      [id]: !prevSelectedItems[id],
    }));
  };
  const selectedCartItems = useMemo(() => {
    return cartItems.filter(item => selectedItems[item.id]);
  }, [cartItems, selectedItems]);

  const handleIncrement = id => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrement = id => {
    dispatch(decrementQuantity(id));
  };

  const handleRemove = id => {
    dispatch(removeFromCart(id));
  };
  const calculateTotalPrice = useMemo(() => {
    return selectedCartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  }, [selectedCartItems]);

  const renderItem = ({item}) => (
    <View style={styles.cartItem}>
      <CheckBox
        value={!!selectedItems[item.id]}
        onValueChange={() => toggleSelection(item.id)}
      />
      <Pressable
        onPress={() => navigation.navigate('ProductDetails', {product})}>
        <Image source={{uri: item.image}} style={styles.productImage} />
      </Pressable>
      <Pressable
        style={styles.productInfo}
        onPress={() => navigation.navigate('ProductDetails', {product})}>
        <Text style={styles.productName}>{item.title}</Text>
        <Text style={styles.productPrice}>${item.price}</Text>
        <View style={styles.quantityControl}>
          <TouchableOpacity
            onPress={() => handleDecrement(item.id)}
            style={styles.counterButton}>
            <Text style={styles.counterText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity
            onPress={() => handleIncrement(item.id)}
            style={styles.counterButton}>
            <Text style={styles.counterText}>+</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
      <TouchableOpacity
        onPress={() => handleRemove(item.id)}
        style={styles.deleteButton}>
        {/* <Text style={styles.deleteText}>Delete</Text> */}
        <Image
          source={require('../images/trash-can.png')}
          style={styles.deleteIcon}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{flex: 1}}>
      <Header />
      <View style={styles.container}>
        <Text style={styles.title}>Review Your Cart</Text>
        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          ListEmptyComponent={
            <>
              <Image
                source={require('../images/empty-cart.png')}
                style={styles.notFoundImage}
              />
              <Text style={styles.notFoundText}>Your cart is empty</Text>
              <CommonButton
                title={'Continue Shopping'}
                onPress={() => {
                  navigation.navigate('Home');
                }}
              />
            </>
          }
        />
        {cartItems.length > 0 && (
          <>
            {/* Total Price Section */}
            <View style={styles.totalSection}>
              <Text style={styles.totalText}>
                Total ({selectedCartItems?.length}):
              </Text>
              <Text style={styles.totalAmount}>${calculateTotalPrice}</Text>
            </View>
            {/* Checkout Button */}
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={handleCheckout}>
              <Text style={styles.checkoutText}>Proceed to Checkout</Text>
            </TouchableOpacity>
            {/* Add Checkout Button or Other UI Elements Here */}
          </>
        )}
      </View>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginBottom: 70,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  productImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginRight: 15,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginBottom: 10,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterButton: {
    backgroundColor: '#eee',
    borderRadius: 5,
    padding: 5,
  },
  counterText: {
    fontSize: 18,
    color: '#333',
  },
  quantity: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  deleteText: {
    color: '#fff',
    fontWeight: '600',
  },
  deleteIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: '#fff',
  },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 0,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#27ae60',
  },
  checkoutButton: {
    backgroundColor: '#27ae60',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  checkoutText: {
    color: '#fff',
    fontSize: 18,
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

export default CartPage;
