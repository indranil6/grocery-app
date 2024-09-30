import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Alert,
  TouchableHighlight,
  ScrollView,
  Modal,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {launchImageLibrary} from 'react-native-image-picker'; // Image picker import
import Footer from '../common/Footer';
import Header from '../common/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddressModal from '../common/AddressModal';
const ProfilePage = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  // Image Picker Function
  const pickImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 1,
      },
      response => {
        if (response.assets && response.assets.length > 0) {
          setProfileImage(response.assets[0].uri);
        }
      },
    );
  };
  const addNewAddressToStorage = async newAddress => {
    const users = JSON.parse(await AsyncStorage.getItem('users')) || [];

    const user = users.find(user => user.isLoggedIn === true);

    if (user) {
      let modifiedUser = {
        ...user,
        addresses: user?.addresses
          ? [...user?.addresses, newAddress]
          : [newAddress],
      };

      users.splice(users.indexOf(user), 1, modifiedUser);

      await AsyncStorage.setItem('users', JSON.stringify(users));
    }
  };
  // Add Address with Validation
  const updateAddressToStorage = async modifiedAddresses => {
    const users = JSON.parse(await AsyncStorage.getItem('users')) || [];
    const user = users.find(user => user.isLoggedIn === true);
    if (user) {
      let modifiedUser = {
        ...user,
        addresses: modifiedAddresses,
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
    setAddresses([...addresses, newAddress]);
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

  useEffect(() => {
    getAddresses();
  }, []);

  const removeAddress = index => {
    const updatedAddresses = addresses.filter((_, i) => i !== index);
    setAddresses(updatedAddresses);
    updateAddressToStorage(updatedAddresses);
  };
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
    updateAddressToStorage(updatedAddresses);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={{flex: 1}}>
      <Header />
      <ScrollView style={styles.container}>
        {/* User Info Section */}
        <View style={styles.profileSection}>
          {/* Profile Image with Picker */}
          <TouchableOpacity onPress={pickImage}>
            <Image
              source={
                profileImage
                  ? {uri: profileImage}
                  : require('../images/profile-user.png')
              }
              style={styles.profileImage}
            />
            <Text style={styles.changePhotoText}>Change Photo</Text>
          </TouchableOpacity>

          <Text style={styles.profileName}>John Doe</Text>
          <Text style={styles.profileEmail}>john.doe@example.com</Text>
        </View>

        {/* Addresses Section */}
        <View style={styles.addressSection}>
          <Text style={styles.sectionTitle}>My Addresses</Text>

          <Image
            source={require('../images/not-found.png')}
            style={styles.notFoundImage}
          />
          <Text style={styles.notFoundText}>No saved addresses found</Text>

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
              <TouchableOpacity
                onPress={() => {
                  removeAddress(index);
                }}
                style={styles.deleteButton}>
                {/* <Text style={styles.deleteText}>Delete</Text> */}
                <Image
                  source={require('../images/trash-can.png')}
                  style={styles.deleteIcon}
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
          }}
          style={[styles.profileButton, {backgroundColor: '#000'}]}>
          <Text style={styles.buttonText}>Add New Address</Text>
        </TouchableOpacity>

        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
          <TouchableOpacity
            style={[styles.profileButton, {flex: 1, marginRight: 5}]}
            onPress={() => {}}>
            <Text style={styles.buttonText}>Change Password</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.profileButton,
              {flex: 1, marginLeft: 5, backgroundColor: 'green'},
            ]}>
            <Text style={styles.buttonText}>Log out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <AddressModal
        isVisible={modalVisible}
        onClose={closeModal}
        onSubmit={addAddress}
      />
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f9f9f9',
    marginBottom: 70,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    borderColor: '#ddd',
    borderWidth: 2,
    elevation: 5,
  },
  changePhotoText: {
    color: '#3498db',
    fontSize: 14,
    marginTop: 5,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  profileEmail: {
    fontSize: 16,
    color: '#888',
  },
  addressSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#555',
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
  emptyText: {
    color: '#888',
    textAlign: 'center',
    marginTop: 10,
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  profileButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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

export default ProfilePage;
