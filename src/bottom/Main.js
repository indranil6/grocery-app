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

const {width: screenWidth} = Dimensions.get('window');

const categories = [
  'Electronics',
  'Fashion',
  'Home',
  'Beauty',
  'Toys',
  'Other',
];

const dummyProducts = {
  Electronics: [...Array(20).keys()].map(i => ({
    id: i + 1,
    title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
    price: 109.95,
    description:
      'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    rating: {
      rate: 3.9,
      count: 120,
    },
  })),
  Fashion: [...Array(20).keys()].map(i => ({
    id: i + 20,
    title: "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
    price: 56.99,
    description:
      'Note:The Jackets is US standard size, Please choose size as your usual wear Material: 100% Polyester; Detachable Liner Fabric: Warm Fleece. Detachable Functional Liner: Skin Friendly, Lightweigt and Warm.Stand Collar Liner jacket, keep you warm in cold weather. Zippered Pockets: 2 Zippered Hand Pockets, 2 Zippered Pockets on Chest (enough to keep cards or keys)and 1 Hidden Pocket Inside.Zippered Hand Pockets and Hidden Pocket keep your things secure. Humanized Design: Adjustable and Detachable Hood and Adjustable cuff to prevent the wind and water,for a comfortable fit. 3 in 1 Detachable Design provide more convenience, you can separate the coat and inner as needed, or wear it together. It is suitable for different season and help you adapt to different climates',
    category: "women's clothing",
    image: 'https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg',
    rating: {
      rate: 2.6,
      count: 235,
    },
  })),
  Home: [...Array(20).keys()].map(i => ({
    id: i + 40,
    title: 'SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s',
    price: 109,
    description:
      'Easy upgrade for faster boot up, shutdown, application load and response (As compared to 5400 RPM SATA 2.5” hard drive; Based on published specifications and internal benchmarking tests using PCMark vantage scores) Boosts burst write performance, making it ideal for typical PC workloads The perfect balance of performance and reliability Read/write speeds of up to 535MB/s/450MB/s (Based on internal testing; Performance may vary depending upon drive capacity, host device, OS and application.)',
    category: 'electronics',
    image: 'https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg',
    rating: {
      rate: 2.9,
      count: 470,
    },
  })),
  Beauty: [...Array(20).keys()].map(i => ({
    id: i + 60,
    title: 'White Gold Plated Princess',
    price: 9.99,
    description:
      "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day...",
    category: 'jewelery',
    image: 'https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg',
    rating: {
      rate: 3,
      count: 400,
    },
  })),
  Toys: [...Array(20).keys()].map(i => ({
    id: i + 80,
    title:
      "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
    price: 695,
    description:
      "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
    category: 'jewelery',
    image: 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg',
    rating: {
      rate: 4.6,
      count: 400,
    },
  })),
  Other: [...Array(20).keys()].map(i => ({
    id: i + 100,
    title: 'Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin',
    price: 599,
    description:
      '21. 5 inches Full HD (1920 x 1080) widescreen IPS display And Radeon free Sync technology. No compatibility for VESA Mount Refresh Rate: 75Hz - Using HDMI port Zero-frame design | ultra-thin | 4ms response time | IPS panel Aspect ratio - 16: 9. Color Supported - 16. 7 million colors. Brightness - 250 nit Tilt angle -5 degree to 15 degree. Horizontal viewing angle-178 degree. Vertical viewing angle-178 degree 75 hertz',
    category: 'electronics',
    image: 'https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg',
    rating: {
      rate: 2.9,
      count: 250,
    },
  })),
};

const EcommerceHome = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);

  // Load products when a category is selected
  useEffect(() => {
    if (selectedCategory) {
      setProducts(dummyProducts[selectedCategory]);
    }
  }, [selectedCategory]);

  const renderSlidableSections = () => {
    return categories.map(category => (
      <View key={category}>
        <Text style={styles.sectionTitle}>{category}</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={dummyProducts[category]}
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
    </View>
  );
};

export default EcommerceHome;
const CategoryPill = ({category, selectedCategory, setSelectedCategory}) => (
  <TouchableOpacity
    key={category}
    onPress={() =>
      setSelectedCategory(category === selectedCategory ? null : category)
    }
    style={[styles.pill, selectedCategory === category && styles.selectedPill]}>
    <Text style={styles.pillText}>{category}</Text>
  </TouchableOpacity>
);
const styles = StyleSheet.create({
  container: {padding: 10},
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
  pillText: {color: '#000'},
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
