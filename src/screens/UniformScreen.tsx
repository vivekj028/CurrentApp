import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ListRenderItem } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, Supplier } from './types'

type UniformScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Uniform'>;

const suppliers: Supplier[] = [
  {
    name: 'Supplier A',
    icon: 'store',
    address: '123 Main St',
    products: [
      { id: 1, name: 'Uniform A1', price: 10 },
      { id: 2, name: 'Uniform A2', price: 15 },
    ],
  },
  {
    name: 'Supplier B',
    icon: 'store',
    address: '456 Elm St',
    products: [
      { id: 3, name: 'Uniform B1', price: 20 },
      { id: 4, name: 'Uniform B2', price: 25 },
    ],
  },
  {
    name: 'Supplier C',
    icon: 'store',
    address: '456 Elm St',
    products: [
      { id: 5, name: 'Uniform C1', price: 20 },
      { id: 6, name: 'Uniform C2', price: 25 },
    ],
  },
  {
    name: 'Supplier D',
    icon: 'store',
    address: '456 Elm St',
    products: [
      { id: 7, name: 'Uniform D1', price: 20 },
      { id: 8, name: 'Uniform D2', price: 25 },
    ],
  },
  {
    name: 'Supplier E',
    icon: 'store',
    address: '456 Elm St',
    products: [
      { id: 9, name: 'Uniform E1', price: 20 },
      { id: 10, name: 'Uniform E2', price: 25 },
    ],
  },
  {
    name: 'Supplier F',
    icon: 'store',
    address: '456 Elm St',
    products: [
      { id: 11, name: 'Uniform F1', price: 20 },
      { id: 12, name: 'Uniform F2', price: 25 },
    ],
  },
  {
    name: 'Supplier G',
    icon: 'store',
    address: '456 Elm St',
    products: [
      { id: 13, name: 'Uniform G1', price: 20 },
      { id: 14, name: 'Uniform G2', price: 25 },
    ],
  },
  {
    name: 'Supplier H',
    icon: 'store',
    address: '456 Elm St',
    products: [
      { id: 15, name: 'Uniform H1', price: 20 },
      { id: 16, name: 'Uniform H2', price: 25 },
    ],
  },
  {
    name: 'Supplier I',
    icon: 'store',
    address: '456 Elm St',
    products: [
      { id: 17, name: 'Uniform I1', price: 20 },
      { id: 18, name: 'Uniform I2', price: 25 },
    ],
  },
  {
    name: 'Supplier J',
    icon: 'store',
    address: '456 Elm St',
    products: [
      { id: 19, name: 'Uniform J1', price: 20 },
      { id: 20, name: 'Uniform J2', price: 25 },
    ],
  },
  {
    name: 'Supplier K',
    icon: 'store',
    address: '456 Elm St',
    products: [
      { id: 21, name: 'Uniform K1', price: 20 },
      { id: 22, name: 'Uniform K2', price: 25 },
    ],
  },
];

const UniformScreen = () => {
  const navigation = useNavigation<UniformScreenNavigationProp>();

  const renderSupplier: ListRenderItem<Supplier> = ({ item }) => (
    <TouchableOpacity
      style={styles.supplierContainer}
      onPress={() => navigation.navigate('SupplierProducts', { supplier: item })}
    >
      <MaterialIcons name={item.icon} size={30} color="#bd2323" />
      <View style={styles.textContainer}>
        <Text style={styles.supplierName}>{item.name}</Text>
        <Text style={styles.supplierAddress}>{item.address}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={suppliers}
        renderItem={renderSupplier}
        keyExtractor={(item) => item.name}
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
  supplierContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 0,
    paddingLeft: 20,
  },
  textContainer: {
    marginLeft: 20,
  },
  supplierName: {
    fontSize: 18,
    color: 'black',
  },
  supplierAddress: {
    fontSize: 14,
    color: '#555',
  },
});

export default UniformScreen;
