import React from 'react';
import { View, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './types';

type CartIconNavigationProp = StackNavigationProp<RootStackParamList, 'CartScreen'>;

const CartIcon = () => {
  const navigation = useNavigation<CartIconNavigationProp>();

  return (
    <View style={styles.container}>
      <MaterialIcons
        name="shopping-cart"
        size={30}
        color="#fff"
        onPress={() => navigation.navigate('CartScreen')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 15,
  },
});

export default CartIcon;
