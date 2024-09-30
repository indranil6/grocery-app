import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  ScrollView,
  Button,
  Alert,
  Pressable,
} from 'react-native';
import {useSelector} from 'react-redux';
import Header from '../common/Header';
import Footer from '../common/Footer';
import CommonButton from '../common/CommonButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddressModal from '../common/AddressModal';
import {useNavigation} from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';

const CheckoutPage = ({route, navigation}) => {
  const {cartItems, totalPrice} = route.params;
  const [addresses, setAddresses] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  // For billing details
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');

  // Payment method (this can be expanded to support multiple options)
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState('credit-card');

  const handlePlaceOrder = () => {
    // Add your place order logic here
    Alert.alert('Order placed successfully!');
    navigation.navigate('Home');
  };
  const addNewAddressToStorage = async newAddress => {
    const users = JSON.parse(await AsyncStorage.getItem('users')) || [];

    const user = users.find(user => user.isLoggedIn === true);

    if (user) {
      let modifiedUser = {
        ...user,
        addresses: user?.addresses
          ? [...user?.addresses, newAddress]
          : [{...newAddress, isPrimary: true}],
      };

      users.splice(users.indexOf(user), 1, modifiedUser);

      await AsyncStorage.setItem('users', JSON.stringify(users));
    }
  };
  const addAddress = async newAddress => {
    if (
      !newAddress.name ||
      !newAddress.address ||
      !newAddress.city ||
      !newAddress.phone
    ) {
      // Validation
      Alert.alert('Error', 'Please fill in all the required fields.');
      return;
      //make phone number 10 digits
    } else if (newAddress.phone.length !== 10) {
      Alert.alert('Error', 'Please enter a valid 10-digit phone number.');
      return;
    }
    setAddresses(prev =>
      prev.length > 0
        ? [...prev, newAddress]
        : [{...newAddress, isPrimary: true}],
    );
    addNewAddressToStorage(newAddress);

    closeModal();
  };
  const getAddresses = async () => {
    const users = JSON.parse(await AsyncStorage.getItem('users')) || [];
    const user = users.find(user => user.isLoggedIn === true);
    if (user) {
      setAddresses(user?.addresses || []);
    }
  };

  React.useEffect(() => {
    getAddresses();
  }, []);

  const toggleSelection = index => {
    const updatedAddresses = addresses.map((address, i) => {
      if (i === index) {
        return {
          ...address,
          isPrimary: !address.isPrimary,
        };
      } else {
        return {
          ...address,
          isPrimary: false,
        };
      }
    });
    console.log(updatedAddresses);
    setAddresses(updatedAddresses);
  };
  const closeModal = () => {
    setModalVisible(false);
  };
  const renderCartItem = ({item}) => (
    <View style={styles.cartItem} key={item.id}>
      <Image source={{uri: item.image}} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.title}</Text>
        <Text style={styles.productQuantity}>Quantity: {item.quantity}</Text>
        <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
      </View>
    </View>
  );

  return (
    <View style={{flex: 1}}>
      <Header />
      <ScrollView style={styles.container}>
        <Text style={styles.pageTitle}>Checkout</Text>

        {addresses.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Delivering to</Text>

            {addresses?.map((item, index) => (
              <View
                key={index}
                style={[
                  styles.addressItem,
                  item.isPrimary && styles.primaryAddress,
                ]}>
                <CheckBox
                  value={!!item.isPrimary}
                  onValueChange={() => toggleSelection(index)}
                />

                <View style={styles.addressInfo}>
                  <Text style={styles.addressName}>
                    {item.name} - {item.phone}
                  </Text>
                  <Text style={styles.addressSubInfo}>
                    {item.address}, {item.city}
                  </Text>
                </View>
              </View>
            ))}
            <CommonButton
              style={{
                backgroundColor: '#e74c3c',
                width: '50%',
                height: 40,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                marginBottom: 10,
              }}
              title="+ Add Address"
              textSize={16}
              onPress={() => setModalVisible(true)}
            />
          </>
        )}

        {/* Billing Details */}
        {addresses.length === 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Billing Details</Text>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Address"
              value={address}
              onChangeText={setAddress}
            />
            <TextInput
              style={styles.input}
              placeholder="City"
              value={city}
              onChangeText={setCity}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />

            <CommonButton
              style={{
                backgroundColor: '#e74c3c',
                width: '50%',
                height: 40,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                marginTop: 10,
              }}
              title="+ Add Address"
              textSize={16}
              onPress={() =>
                addAddress({
                  name,
                  address,
                  city,
                  phone,
                })
              }
            />
          </View>
        )}

        {/* Order Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          {/* <FlatList
            data={cartItems}
            renderItem={renderCartItem}
            keyExtractor={item => item.id.toString()}
          /> */}
          {cartItems.map(item => renderCartItem({item}))}
          <Pressable
            style={styles.totalSection}
            onPress={() =>
              navigation.navigate('ProductDetails', {product: item})
            }>
            <Text style={styles.totalText}>Total Price: </Text>
            <Text style={styles.totalPrice}>${totalPrice}</Text>
          </Pressable>
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <View style={styles.paymentMethods}>
            <TouchableOpacity
              style={[
                styles.paymentOption,
                selectedPaymentMethod === 'cod' && styles.selectedPaymentOption,
              ]}
              onPress={() => setSelectedPaymentMethod('cod')}>
              <Text style={styles.paymentText}>COD</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.paymentOption,
                selectedPaymentMethod === 'upi' && styles.selectedPaymentOption,
              ]}
              onPress={() => setSelectedPaymentMethod('upi')}>
              <Text style={styles.paymentText}>UPI</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.paymentOption,
                selectedPaymentMethod === 'credit-card' &&
                  styles.selectedPaymentOption,
              ]}
              onPress={() => setSelectedPaymentMethod('credit-card')}>
              <Text style={styles.paymentText}>Credit Card</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Place Order Button */}
        <TouchableOpacity
          style={styles.placeOrderButton}
          onPress={handlePlaceOrder}>
          <Text style={styles.placeOrderText}>Place Order</Text>
        </TouchableOpacity>
      </ScrollView>
      <Footer />

      <AddressModal
        isVisible={modalVisible}
        onClose={closeModal}
        onSubmit={addAddress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    marginBottom: 70,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  cartItem: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
    elevation: 3,
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
  },
  productQuantity: {
    fontSize: 14,
    color: '#777',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e74c3c',
  },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  totalText: {
    fontSize: 18,
    fontWeight: '600',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#27ae60',
  },
  paymentMethods: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  paymentOption: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 5,
    alignItems: 'center',
  },
  selectedPaymentOption: {
    borderColor: '#27ae60',
    borderWidth: 2,
    elevation: 5,
  },
  paymentText: {
    color: '#333',
  },
  placeOrderButton: {
    backgroundColor: '#27ae60',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  placeOrderText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  addressItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 3,
  },
  primaryAddress: {
    borderWidth: 1,
    borderColor: '#e74c3c',
    elevation: 8,
  },
  addressInfo: {
    flex: 1,
    alignSelf: 'center',
    marginLeft: 10,
  },
  addressName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  addressSubInfo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginBottom: 10,
  },
});

export default CheckoutPage;
