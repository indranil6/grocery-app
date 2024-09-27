import React from 'react';
import {View, StyleSheet, Dimensions, FlatList} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const SCREEN_WIDTH = Dimensions.get('window').width;

// Skeleton Placeholder for Pills
const PillsSkeleton = () => {
  return (
    <View style={styles.pillContainer}>
      {Array(4)
        .fill()
        .map((_, index) => (
          <View key={index} style={styles.pillSkeleton}>
            <LinearGradient
              colors={['#e0e0e0', '#f7f7f7', '#e0e0e0']}
              style={styles.skeletonShimmer}
            />
          </View>
        ))}
    </View>
  );
};

// Skeleton Placeholder for Product Cards
const ProductCardSkeleton = () => {
  return (
    <View style={styles.cardSkeleton}>
      <View style={styles.imageSkeleton}>
        <LinearGradient
          colors={['#e0e0e0', '#f7f7f7', '#e0e0e0']}
          style={styles.skeletonShimmer}
        />
      </View>
      <View style={styles.textSkeleton}>
        <LinearGradient
          colors={['#e0e0e0', '#f7f7f7', '#e0e0e0']}
          style={[styles.skeletonShimmer, {height: 20, width: '60%'}]}
        />
        <LinearGradient
          colors={['#e0e0e0', '#f7f7f7', '#e0e0e0']}
          style={[
            styles.skeletonShimmer,
            {height: 20, width: '40%', marginTop: 10},
          ]}
        />
        <LinearGradient
          colors={['#e0e0e0', '#f7f7f7', '#e0e0e0']}
          style={[
            styles.skeletonShimmer,
            {height: 20, width: '80%', marginTop: 10},
          ]}
        />
      </View>
    </View>
  );
};

// Main Skeleton Component
const HomeSkeleton = () => {
  return (
    <View style={styles.container}>
      <View style={[styles.imageSkeleton, {marginBottom: 20}]}>
        <LinearGradient
          colors={['#e0e0e0', '#f7f7f7', '#e0e0e0']}
          style={styles.skeletonShimmer}
        />
      </View>
      {/* Pills Skeleton */}
      <PillsSkeleton />

      {/* Product Cards Skeleton */}
      <FlatList
        data={[1, 2, 3, 4, 5]} // Mock data for skeleton
        renderItem={() => <ProductCardSkeleton />}
        keyExtractor={item => item.toString()}
        contentContainerStyle={{paddingBottom: 20}}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 10,
  },
  // Pills Skeleton
  pillContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  pillSkeleton: {
    width: SCREEN_WIDTH * 0.2, // Dynamic width
    height: 35,
    borderRadius: 50,
    backgroundColor: '#e0e0e0',
  },
  // Product Card Skeleton
  cardSkeleton: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    marginHorizontal: 10,
    padding: 15,
  },
  imageSkeleton: {
    width: '100%',
    height: 150,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
  },
  textSkeleton: {
    marginTop: 15,
  },
  skeletonShimmer: {
    flex: 1,
    borderRadius: 5,
  },
});

export default HomeSkeleton;
