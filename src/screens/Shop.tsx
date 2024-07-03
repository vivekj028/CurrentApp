import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ListRenderItem } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';


type Option = {
  name: string;
  icon: string;
  caption: string;
};

type DrawerParamList = {
  Shop: undefined;
  Dashboard: undefined;
  Notification: undefined;
  Gallery: undefined;
  Canteens: undefined;
};

type RootStackParamList = {
  SplashScreen: undefined;
  LoginScreen: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  Dashboard: undefined;
  Home: undefined;
  Notification: undefined;
  Gallery: undefined;
  ProductDetails: undefined;
  Canteen: undefined;
  Cart: undefined;
  Payment: undefined;
  OrderCompleted: undefined;
};

const options: Option[] = [
  { name: 'School Payment', icon: 'payment', caption: 'Pay school fees' },
  { name: 'Order History', icon: 'history', caption: 'View past orders' },
  { name: 'Booklist', icon: 'book', caption: 'View and order books' },
  { name: 'Uniform', icon: 'people', caption: 'Order new uniforms' },
  { name: 'Uniform History', icon: 'history', caption: 'View uniform orders' },
];

const Shop = () => {
  type NavigationProp = CompositeNavigationProp<
    DrawerNavigationProp<DrawerParamList, 'Shop'>,
    NativeStackNavigationProp<RootStackParamList>
  >;

  const navigation = useNavigation<NavigationProp>();

  const renderOption: ListRenderItem<Option> = ({ item }) => (
    <TouchableOpacity
      style={styles.optionContainer}
      onPress={() => navigation.navigate(item.name as keyof RootStackParamList)}
    >
      <MaterialIcons name={item.icon} size={30} color="#bd2323" />
      <View style={styles.textContainer}>
        <Text style={styles.optionName}>{item.name}</Text>
        <Text style={styles.optionCaption}>{item.caption}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={options}
        renderItem={renderOption}
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
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 0,
    paddingLeft: 20,
  },
  textContainer: {
    marginLeft: 15,
  },
  optionName: {
    fontSize: 18,
    color: 'black',
  },
  optionCaption: {
    fontSize: 14,
    color: '#555',
  },
});

export default Shop;

// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, FlatList, ListRenderItem } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { DrawerNavigationProp } from '@react-navigation/drawer';
// import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';

// type Option = {
//   name: string;
//   icon: string;
//   caption: string;
// };

// type RootStackParamList = {
//   [key: string]: undefined;
// };

// const options: Option[] = [
//   { name: 'School Payment', icon: 'payment', caption: 'Pay school fees' },
//   { name: 'Order History', icon: 'history', caption: 'View past orders' },
//   { name: 'Booklist', icon: 'book', caption: 'View and order books' },
//   { name: 'Uniform', icon: 'wardrobe', caption: 'Order new uniforms' },
//   { name: 'Uniform History', icon: 'history', caption: 'View uniform orders' },
// ];

// const Shop = () => {
//   type NavigationProp = CompositeNavigationProp<
//     DrawerNavigationProp<RootStackParamList>,
//     NativeStackNavigationProp<RootStackParamList>
//   >;

//   const navigation = useNavigation<NavigationProp>();

//   const renderOption: ListRenderItem<Option> = ({ item }) => (
//     <TouchableOpacity
//       style={styles.optionContainer}
//       onPress={() => navigation.navigate(item.name as keyof RootStackParamList)}
//     >
//       <Icon name={item.icon} size={30} color="#bd2323" />
//       <View style={styles.textContainer}>
//         <Text style={styles.optionName}>{item.name}</Text>
//         <Text style={styles.optionCaption}>{item.caption}</Text>
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={options}
//         renderItem={renderOption}
//         keyExtractor={(item) => item.name}
//         contentContainerStyle={styles.listContainer}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   listContainer: {
//     padding: 20,
//   },
//   optionContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//     padding: 10,
//     backgroundColor: '#f9f9f9',
//     borderRadius: 10,
//   },
//   textContainer: {
//     marginLeft: 20,
//   },
//   optionName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   optionCaption: {
//     fontSize: 14,
//     color: '#555',
//   },
// });

// export default Shop;
