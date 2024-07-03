import React from 'react';
import { View, Text, StyleSheet, FlatList, ListRenderItem } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { RootStackParamList, Product } from './types';

type RouteParams = RouteProp<RootStackParamList, 'SupplierProducts'>;

const SupplierProductsScreen = () => {
  const route = useRoute<RouteParams>();
  const { supplier } = route.params;

  const renderProduct: ListRenderItem<Product> = ({ item }) => (
    <View style={styles.productContainer}>
      <MaterialIcons name='image' size={30} color="#bd2323" />
      <View style={styles.info}>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>${item.price}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={supplier.products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContainer: {
    padding: 0,
  },
  productContainer: {
    flexDirection: 'row',
    marginBottom: 0,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 0,
    paddingLeft: 20,
  },
  productName: {
    fontSize: 16,
    color: 'black',
  },
  productPrice: {
    fontSize: 12,
    color: 'black',
  },
  info: {
    flexDirection:'column',
    paddingLeft: 10,
  },
});

export default SupplierProductsScreen;
