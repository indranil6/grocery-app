import {View, Text, FlatList, Image, StyleSheet, TextInput} from 'react-native';
import React, {useMemo} from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import {useSelector} from 'react-redux';
import ProductCard from '../common/ProductCard';
import useDebounce from '../hooks/useDebounce';
import YouMayLike from '../common/YouMayLike';

const SearchPage = () => {
  const allProducts = useSelector(state => state.allProducts);
  const [searchText, setSearchText] = React.useState('');
  const debouncedValue = useDebounce(searchText, 500);
  const getSearchResults = (allProducts, searchText) => {
    if (!searchText || searchText.length < 3) {
      return [];
    }
    const products = Object.values(allProducts).flat();

    return products.filter(product => {
      return (
        product.title.toLowerCase().includes(searchText.toLowerCase()) ||
        product.category.toLowerCase().includes(searchText.toLowerCase()) ||
        product.description.toLowerCase().includes(searchText.toLowerCase())
      );
    });
  };

  const searchResults = useMemo(() => {
    return getSearchResults(allProducts, debouncedValue);
  }, [allProducts, debouncedValue]);

  return (
    <View style={{flex: 1}}>
      <Header />
      <View style={styles.container}>
        <TextInput
          style={styles.searchbar}
          placeholder="Search..."
          onChangeText={setSearchText}
        />
        <FlatList
          data={searchResults}
          renderItem={({item}) => <ProductCard product={item} />}
          keyExtractor={product => product.id.toString()}
          onEndReached={() => console.log('Load more products...')} // Add pagination logic here
          ListEmptyComponent={
            debouncedValue.length < 3 ? (
              <YouMayLike />
            ) : (
              <>
                <Image
                  source={require('../images/not-found.png')}
                  style={styles.notFoundImage}
                />
                <Text style={styles.notFoundText}>Your wishlist is empty</Text>
              </>
            )
          }
        />
      </View>
      <Footer />
    </View>
  );
};

export default SearchPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginBottom: 70,
  },
  searchbar: {
    height: 60,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: 'white',
    elevation: 5,
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
