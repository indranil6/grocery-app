import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import Header from '../common/Header';
import ProductCard from '../common/ProductCard';
import Footer from '../common/Footer';
import HomeSkeleton from '../skeletons/HomeSkeleton';
import axios from 'axios';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const EcommerceHome = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load products when a category is selected
  useEffect(() => {
    if (selectedCategory) {
      setProducts(allProducts[selectedCategory]);
    }
  }, [selectedCategory, allProducts]);

  const fetchData = async () => {
    let categoriesData = await axios.get(
      'https://fakestoreapi.com/products/categories',
    );
    let categories = categoriesData.data;
    let tempProducts = {};
    //get products from each category
    for (let category of categories) {
      let productsData = await axios.get(
        `https://fakestoreapi.com/products/category/${category}`,
      );
      let products = productsData.data;
      tempProducts[category] = products;
    }
    setAllProducts(tempProducts);
    setCategories(categories);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderSlidableSections = () => {
    return categories.map(category => (
      <View key={category}>
        <Text style={[styles.sectionTitle, {textTransform: 'capitalize'}]}>
          {category}
        </Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={allProducts[category]}
          renderItem={({item}) => (
            <ProductCard
              product={item}
              cardStyles={{width: screenWidth * 0.9, marginRight: 10}}
            />
          )}
          keyExtractor={product => product.id.toString()}
        />
      </View>
    ));
  };
  if (isLoading) {
    return <HomeSkeleton />;
  }
  return (
    <View style={{flex: 1}}>
      <Header />
      <View style={styles.container}>
        <Image source={require('../images/banner.jpg')} style={styles.banner} />
        {/* Slidable Pills List */}
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={category => category}
          renderItem={({item: category}) => (
            <CategoryPill
              {...{category, selectedCategory, setSelectedCategory}}
            />
          )}
          style={styles.pillsContainer}
        />

        {/* Infinite Scroll or Slidable Sections */}
        {selectedCategory ? (
          <FlatList
            data={products}
            renderItem={({item}) => <ProductCard product={item} />}
            keyExtractor={product => product.id.toString()}
            onEndReached={() => console.log('Load more products...')} // Add pagination logic here
          />
        ) : (
          <ScrollView>{renderSlidableSections()}</ScrollView>
        )}
      </View>
      <Footer />
    </View>
  );
};

export default EcommerceHome;
const CategoryPill = ({category, selectedCategory, setSelectedCategory}) => (
  <TouchableOpacity
    key={category}
    onPress={() =>
      setSelectedCategory(
        category === selectedCategory || category === 'All' ? null : category,
      )
    }
    style={[styles.pill, selectedCategory === category && styles.selectedPill]}>
    <Text style={styles.pillText}>{category}</Text>
  </TouchableOpacity>
);
const styles = StyleSheet.create({
  container: {padding: 10, height: screenHeight - 100},
  pillsContainer: {marginBottom: 10, marginTop: 10, height: 60},
  pill: {
    padding: 10,
    backgroundColor: '#fff',
    elevation: 5,
    marginRight: 10,
    borderRadius: 20,
    borderColor: '#000',
    width: 100,
    alignItems: 'center',
    height: 40,
  },
  selectedPill: {elevation: 10, backgroundColor: 'orange', color: '#fff'},
  pillText: {
    color: '#000',
    textTransform: 'capitalize',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  section: {width: screenWidth, padding: 10},
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  banner: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 10,
    marginTop: 10,
  },
});
