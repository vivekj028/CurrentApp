
import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  SectionList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import {Card, IconButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useCart} from './CartContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, CartItem } from './types';

type CartScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Cart'>;

type CartProps = {
  navigation: CartScreenNavigationProp;
};



const Cart: React.FC<CartProps> = ({navigation}) => {
  const {cartItems} = useCart();
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [comment, setComment] = useState('');
  const [walletBalance, setWalletBalance] = useState(50); // Assume initial wallet balance is $50

  useEffect(() => {
    const initialQuantities = cartItems.reduce((acc: Record<number, number>, item: CartItem) => {
      acc[item.id] = 1; // Default quantity is 1 for each item
      return acc;
    }, {});
    setQuantities(initialQuantities);
  }, [cartItems]);

  const incrementQuantity = (id: number) => {
    setQuantities(prev => ({
      ...prev,
      [id]: prev[id] + 1,
    }));
  };

  const decrementQuantity = (id: number) => {
    setQuantities(prev => {
      const newQuantities = {...prev};
      if (newQuantities[id] > 1) {
        newQuantities[id] -= 1;
      } else {
        delete newQuantities[id];
      }
      return newQuantities;
    });
  };

  const getTotalItems = () => {
    return Object.values(quantities).reduce((acc, qty) => acc + qty, 0);
  };

  const getTotalPrice = () => {
    return cartItems
      .reduce(
        (acc: number, item: CartItem) =>
          acc + parseFloat(item.price.slice(1)) * (quantities[item.id] || 0),
        0,
      )
      .toFixed(2);
  };

  const sections = [
    {
      title: 'Afternoon Break',
      data: cartItems.filter((item: CartItem) => item.id % 2 !== 0),
    },
    {
      title: 'Copy Breakfast',
      data: cartItems.filter((item: CartItem) => item.id % 2 === 0),
    },
  ].filter(section => section.data.length > 0);

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={sections}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <Card style={styles.card}>
            <View style={styles.cardContent}>
              <Text style={styles.text}>{item.name}</Text>
              <View style={styles.itemRight}>
                <Text style={styles.price}>{item.price}</Text>
                <View style={styles.counter}>
                  <IconButton
                    icon="minus"
                    size={16}
                    onPress={() => decrementQuantity(item.id)}
                  />
                  <Text style={styles.quantity}>{quantities[item.id]}</Text>
                  <IconButton
                    icon="plus"
                    size={16}
                    onPress={() => incrementQuantity(item.id)}
                  />
                </View>
              </View>
            </View>
          </Card>
        )}
        renderSectionHeader={({section: {title}}) => (
          <View style={styles.sectionHeader}>
            <Icon name="ice-cream" size={21} color="black" />
            <Text style={styles.sectionTitle}>{title}</Text>
          </View>
        )}
        ListFooterComponent={() => (
          <View>
            <Text style={styles.summary}>
              Number of items: {getTotalItems()}
            </Text>
            <Text style={styles.summary}>Cart total: ${getTotalPrice()}</Text>
            <Text style={styles.summary}>
              Wallet Balance: ${walletBalance.toFixed(2)}
            </Text>
            <TextInput
              style={styles.commentBox}
              placeholder="Any comment?"
              value={comment}
              onChangeText={setComment}
            />
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={() =>
                navigation.navigate('Payment', {
                  total: parseFloat(getTotalPrice()),
                  walletBalance: walletBalance,
                  orderNumber: '123456', 
                  orderDate: new Date().toISOString(), 
                  transactionId: 'abc123',
                })
              }>
              <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: '#fff',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#BDBDBD',
    padding: 12,
    marginVertical: 0,
  },
  sectionTitle: {
    fontSize: 15,
    marginVertical: 0,
    color: 'black',
    backgroundColor: '#BDBDBD',
    padding: 8,
  },
  card: {
    padding: 10,
    marginVertical: 0,
    borderRadius: 0,
    backgroundColor: '#fff',
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: 'black',
  },
  itemRight: {
    alignItems: 'center',
  },
  price: {
    fontSize: 14,
    color: 'black',
    marginBottom: 5,
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 0.5,
    height: 30,
  },
  quantity: {
    fontSize: 14,
    marginHorizontal: 0,
    color: 'black',
  },
  summary: {
    fontSize: 16,
    marginVertical: 5,
    paddingHorizontal: 10,
    color: 'black',
  },
  commentBox: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    margin: 15,
    height: 120,
    color: 'black',
  },
  checkoutButton: {
    backgroundColor: '#bd2323',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: 220,
    left: 100,
  },
  checkoutButtonText: {
    color: '#ffffff',
    fontFamily: 'Work Sans',
    fontSize: 14,
  },
});

export default Cart;

// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   SafeAreaView,
//   SectionList,
//   TouchableOpacity,
//   StyleSheet,
//   TextInput,
// } from 'react-native';
// import {Card, IconButton} from 'react-native-paper';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// const Cart = ({route, navigation}) => {
//   const {cartItems: initialCartItems} = route.params;
//   const [cartItems, setCartItems] = useState(initialCartItems);
//   const [quantities, setQuantities] = useState({});
//   const [comment, setComment] = useState('');
//   const [walletBalance, setWalletBalance] = useState(50); // Assume initial wallet balance is $50

//   useEffect(() => {
//     const initialQuantities = cartItems.reduce((acc, item) => {
//       acc[item.id] = 1; // Default quantity is 1 for each item
//       return acc;
//     }, {});
//     setQuantities(initialQuantities);
//   }, [cartItems]);

//   const incrementQuantity = id => {
//     setQuantities(prev => ({
//       ...prev,
//       [id]: prev[id] + 1,
//     }));
//   };

//   const decrementQuantity = id => {
//     setQuantities(prev => {
//       const newQuantities = {...prev};
//       if (newQuantities[id] > 1) {
//         newQuantities[id] -= 1;
//       } else {
//         const updatedCartItems = cartItems.filter(item => item.id !== id);
//         setCartItems(updatedCartItems);
//         delete newQuantities[id];
//       }
//       return newQuantities;
//     });
//   };

//   const getTotalItems = () => {
//     return Object.values(quantities).reduce((acc, qty) => acc + qty, 0);
//   };

//   const getTotalPrice = () => {
//     return cartItems
//       .reduce(
//         (acc, item) =>
//           acc + parseFloat(item.price.slice(1)) * (quantities[item.id] || 0),
//         0,
//       )
//       .toFixed(2);
//   };

//   const sections = [
//     {
//       title: 'Afternoon Break',
//       data: cartItems.filter(item => item.id % 2 !== 0),
//     },
//     {
//       title: 'Copy Breakfast',
//       data: cartItems.filter(item => item.id % 2 === 0),
//     },
//   ].filter(section => section.data.length > 0);

//   return (
//     <SafeAreaView style={styles.container}>
//       <SectionList
//         sections={sections}
//         keyExtractor={item => item.id.toString()}
//         renderItem={({item}) => (
//           <Card style={styles.card}>
//             <View style={styles.cardContent}>
//               <Text style={styles.text}>{item.name}</Text>
//               <View style={styles.itemRight}>
//                 <Text style={styles.price}>{item.price}</Text>
//                 <View style={styles.counter}>
//                   <IconButton
//                     icon="minus"
//                     size={16}
//                     onPress={() => decrementQuantity(item.id)}
//                   />
//                   <Text style={styles.quantity}>{quantities[item.id]}</Text>
//                   <IconButton
//                     icon="plus"
//                     size={16}
//                     onPress={() => incrementQuantity(item.id)}
//                   />
//                 </View>
//               </View>
//             </View>
//           </Card>
//         )}
//         renderSectionHeader={({section: {title}}) => (
//           <View style={styles.sectionHeader}>
//             <Icon name="ice-cream" size={21} color="black" />
//             <Text style={styles.sectionTitle}>{title}</Text>
//           </View>
//         )}
//         ListFooterComponent={() => (
//           <View>
//             <Text style={styles.summary}>
//               Number of items: {getTotalItems()}
//             </Text>
//             <Text style={styles.summary}>Cart total: ${getTotalPrice()}</Text>
//             <Text style={styles.summary}>Add comment</Text>
//             <TextInput
//               style={styles.commentBox}
//               value={comment}
//               onChangeText={setComment}
//             />
//             <TouchableOpacity
//               onPress={() =>
//                 navigation.navigate('Payment', {
//                   total: getTotalPrice(),
//                   walletBalance: walletBalance,
//                 })
//               }
//               style={styles.checkoutButton}>
//               <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       />
//     </SafeAreaView>
//   );
// };

// export default Cart;

// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   TextInput,
// } from 'react-native';
// import {Card, IconButton} from 'react-native-paper';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// const Cart = ({route, navigation}) => {
//   const {cartItems: initialCartItems} = route.params;
//   const [cartItems, setCartItems] = useState(initialCartItems);
//   const [quantities, setQuantities] = useState({});
//   const [comment, setComment] = useState('');
//   const [walletBalance, setWalletBalance] = useState(50); // Assume initial wallet balance is $50

//   useEffect(() => {
//     const initialQuantities = cartItems.reduce((acc, item) => {
//       acc[item.id] = 1; // Default quantity is 1 for each item
//       return acc;
//     }, {});
//     setQuantities(initialQuantities);
//   }, [cartItems]);

//   const incrementQuantity = id => {
//     setQuantities(prev => ({
//       ...prev,
//       [id]: prev[id] + 1,
//     }));
//   };

//   const decrementQuantity = id => {
//     setQuantities(prev => {
//       const newQuantities = {...prev};
//       if (newQuantities[id] > 1) {
//         newQuantities[id] -= 1;
//       } else {
//         const updatedCartItems = cartItems.filter(item => item.id !== id);
//         setCartItems(updatedCartItems);
//         delete newQuantities[id];
//       }
//       return newQuantities;
//     });
//   };

//   const getTotalItems = () => {
//     return Object.values(quantities).reduce((acc, qty) => acc + qty, 0);
//   };

//   const getTotalPrice = () => {
//     return cartItems
//       .reduce(
//         (acc, item) => acc + item.price.slice(1) * (quantities[item.id] || 0),
//         0,
//       )
//       .toFixed(2);
//   };

//   const renderSection = (title, items) => (
//     <View key={title}>
//       <View style={styles.sectionHeader}>
//         <Icon name="ice-cream" size={21} color="black" />
//         <Text style={styles.sectionTitle}>{title}</Text>
//       </View>
//       <FlatList
//         data={items}
//         keyExtractor={item => item.id}
//         renderItem={({item}) => (
//           <Card style={styles.card}>
//             <View style={styles.cardContent}>
//               <Text style={styles.text}>{item.name}</Text>
//               <View style={styles.itemRight}>
//                 <Text style={styles.price}>{item.price}</Text>
//                 <View style={styles.counter}>
//                   <IconButton
//                     icon="minus"
//                     size={16}
//                     onPress={() => decrementQuantity(item.id)}
//                   />
//                   <Text style={styles.quantity}>{quantities[item.id]}</Text>
//                   <IconButton
//                     icon="plus"
//                     size={16}
//                     onPress={() => incrementQuantity(item.id)}
//                   />
//                 </View>
//               </View>
//             </View>
//           </Card>
//         )}
//       />
//     </View>
//   );

//   const afternoonBreakItems = cartItems.filter(item => item.id <= 3);
//   const breakfastItems = cartItems.filter(item => item.id > 3);

//   return (
//     <View style={styles.container}>
//       {afternoonBreakItems.length > 0 &&
//         renderSection(' Afternoon Break', afternoonBreakItems)}
//       {breakfastItems.length > 0 && renderSection(' Copy Breakfast', breakfastItems)}
//       <Text style={styles.summary}>Number of items: {getTotalItems()}</Text>
//       <Text style={styles.summary}>Cart total: ${getTotalPrice()}</Text>
//       <Text style={styles.summary}>Add comment</Text>
//       <TextInput
//         style={styles.commentBox}
//         value={comment}
//         onChangeText={setComment}
//       />
//       <TouchableOpacity
//         onPress={() =>
//           navigation.navigate('Payment', {
//             total: getTotalPrice(),
//             walletBalance: walletBalance,
//           })
//         }
//         style={styles.checkoutButton}>
//         <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 0,
//   },
//   sectionHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#BDBDBD',
//     padding: 12,
//     marginVertical: 0,
//   },
//   sectionTitle: {
//     fontSize: 15,
//     marginVertical: 0,
//     color: 'black',
//     backgroundColor: '#BDBDBD',
//     padding: 8,
//   },
//   card: {
//     padding: 10,
//     marginVertical: 0,
//     borderRadius: 0,
//   },
//   cardContent: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 16,
//     color: 'black',
//   },
//   itemRight: {
//     alignItems: 'center',
//   },
//   price: {
//     fontSize: 14,
//     color: 'black',
//     marginBottom: 5,
//   },
//   counter: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderColor: 'black',
//     borderWidth: 0.5,
//     height:30,
//   },
//   quantity: {
//     fontSize: 14,
//     marginHorizontal: 0,
//     color: 'black',
//   },
//   summary: {
//     fontSize: 16,
//     marginVertical: 5,
//     paddingHorizontal: 10,
//     color: 'black',
//   },
//   commentBox: {
//     borderColor: 'gray',
//     borderWidth: 1,
//     borderRadius: 4,
//     padding: 8,
//     margin: 15,
//     height: 120,
//   },
//   checkoutButton: {
//     backgroundColor: '#bd2323',
//     padding: 15,
//     borderRadius: 30,
//     alignItems: 'center',
//     justifyContent: 'center',
//     position: 'relative',
//     width: 220,
//     left: 100,
//   },
//   checkoutButtonText: {
//     color: '#ffffff',
//     fontFamily: 'Work Sans',
//     fontSize: 14,
//   },
// });

// export default Cart;

// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   StyleSheet,
//   Button,
//   TextInput,
// } from 'react-native';
// import {Card, IconButton} from 'react-native-paper';

// const Cart = ({route, navigation}) => {
//   const {cartItems: initialCartItems} = route.params;
//   const [cartItems, setCartItems] = useState(initialCartItems);
//   const [quantities, setQuantities] = useState({});
//   const [comment, setComment] = useState('');
//   const [walletBalance, setWalletBalance] = useState(50); // Assume initial wallet balance is $50

//   useEffect(() => {
//     const initialQuantities = cartItems.reduce((acc, item) => {
//       acc[item.id] = 1; // Default quantity is 1 for each item
//       return acc;
//     }, {});
//     setQuantities(initialQuantities);
//   }, [cartItems]);

//   const incrementQuantity = id => {
//     setQuantities(prev => ({
//       ...prev,
//       [id]: prev[id] + 1,
//     }));
//   };

//   const decrementQuantity = id => {
//     setQuantities(prev => {
//       const newQuantities = {...prev};
//       if (newQuantities[id] > 1) {
//         newQuantities[id] -= 1;
//       } else {
//         const updatedCartItems = cartItems.filter(item => item.id !== id);
//         setCartItems(updatedCartItems);
//         delete newQuantities[id];
//       }
//       return newQuantities;
//     });
//   };

//   const getTotalItems = () => {
//     return Object.values(quantities).reduce((acc, qty) => acc + qty, 0);
//   };

//   const getTotalPrice = () => {
//     return cartItems
//       .reduce((acc, item) => acc + item.price.slice(1) * (quantities[item.id] || 0), 0)
//       .toFixed(2);
//   };

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={cartItems}
//         keyExtractor={item => item.id}
//         renderItem={({item}) => (
//           <Card style={styles.card}>
//             <View style={styles.cardContent}>
//               <Text style={styles.text}>{item.name}</Text>
//               <Text style={styles.price}>{item.price}</Text>
//               <View style={styles.counter}>
//                 <IconButton
//                   icon="minus"
//                   size={20}
//                   onPress={() => decrementQuantity(item.id)}
//                 />
//                 <Text style={styles.quantity}>{quantities[item.id]}</Text>
//                 <IconButton
//                   icon="plus"
//                   size={20}
//                   onPress={() => incrementQuantity(item.id)}
//                 />
//               </View>
//             </View>
//           </Card>
//         )}
//       />
//       <Text style={styles.summary}>Number of items: {getTotalItems()}</Text>
//       <Text style={styles.summary}>Cart total: ${getTotalPrice()}</Text>
//       <Text style={styles.summary}>Add comment</Text>
//       <TextInput
//         style={styles.commentBox}
//         value={comment}
//         onChangeText={setComment}
//       />

//       <TouchableOpacity
//         onPress={() =>
//           navigation.navigate('Payment', {
//             total: getTotalPrice(),
//             walletBalance: walletBalance,
//           })
//         }
//         style={styles.checkoutButton}>
//         <Text style={styles.checkoutButtonText}>
//           Proceed to Checkout
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 0,
//     padding: 0,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   card: {
//     padding: 10,
//     marginVertical: 0,
//     borderRadius: 0,
//   },
//   cardContent: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 16,
//     color: 'black',
//   },
//   price: {
//     fontSize: 16,
//     color: 'black',
//   },
//   counter: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   quantity: {
//     fontSize: 16,
//     marginHorizontal: 8,
//     color: 'black',
//   },
//   summary: {
//     fontSize: 16,
//     marginVertical: 8,
//     paddingHorizontal: 10,
//     color: 'black',
//   },
//   commentBox: {
//     borderColor: 'gray',
//     borderWidth: 1,
//     borderRadius: 4,
//     padding: 8,
//     margin: 15,
//     height: 120,
//   },
//   checkoutButton: {
//     backgroundColor: '#bd2323',
//     padding: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//     position: 'relative',
//   },
//   checkoutButtonText: {
//     color: '#ffffff',
//     fontFamily: 'Work Sans',
//     fontSize: 14,
//   },
// });

// export default Cart;

// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   StyleSheet,
//   Button,
//   TextInput,
// } from 'react-native';
// import {Card, IconButton} from 'react-native-paper';

// const Cart = ({route, navigation}) => {
//   const {cartItems} = route.params;
//   const [quantities, setQuantities] = useState({});
//   const [comment, setComment] = useState('');
//   const [walletBalance, setWalletBalance] = useState(50); // Assume initial wallet balance is $50

//   useEffect(() => {
//     const initialQuantities = cartItems.reduce((acc, item) => {
//       acc[item.id] = 1; // Default quantity is 1 for each item
//       return acc;
//     }, {});
//     setQuantities(initialQuantities);
//   }, [cartItems]);

//   const incrementQuantity = id => {
//     setQuantities(prev => ({
//       ...prev,
//       [id]: prev[id] + 1,
//     }));
//   };

//   const decrementQuantity = id => {
//     setQuantities(prev => ({
//       ...prev,
//       [id]: prev[id] > 1 ? prev[id] - 1 : 1,
//     }));
//   };

//   const getTotalItems = () => {
//     return Object.values(quantities).reduce((acc, qty) => acc + qty, 0);
//   };

//   const getTotalPrice = () => {
//     return cartItems
//       .reduce((acc, item) => acc + item.price.slice(1) * quantities[item.id], 0)
//       .toFixed(2);
//   };

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={cartItems}
//         keyExtractor={item => item.id}
//         renderItem={({item}) => (
//           <Card style={styles.card}>
//             <View style={styles.cardContent}>
//               <Text style={styles.text}>{item.name}</Text>
//               <Text style={styles.price}>{item.price}</Text>
//               <View style={styles.counter}>
//                 <IconButton
//                   icon="minus"
//                   size={20}
//                   onPress={() => decrementQuantity(item.id)}
//                 />
//                 <Text style={styles.quantity}>{quantities[item.id]}</Text>
//                 <IconButton
//                   icon="plus"
//                   size={20}
//                   onPress={() => incrementQuantity(item.id)}
//                 />
//               </View>
//             </View>
//           </Card>
//         )}
//       />
//       <Text style={styles.summary}>Number of items: {getTotalItems()}</Text>
//       <Text style={styles.summary}>Cart total: ${getTotalPrice()}</Text>
//       <Text style={styles.summary}>Add comment</Text>
//       <TextInput
//         style={styles.commentBox}
//         value={comment}
//         onChangeText={setComment}
//       />

//       <TouchableOpacity
//         onPress={() =>
//           navigation.navigate('Payment', {
//             total: getTotalPrice(),
//             walletBalance: walletBalance,
//           })
//         }
//         style={{
//           backgroundColor: '#bd2323',
//           padding: 15,
//           borderRadius: 10, // Apply a moderate rounded effect
//           alignItems: 'center', // Center content horizontally
//           justifyContent: 'center', // Center content vertically
//           position: 'relative',
//         }}>
//         <Text style={{color: '#ffffff', fontFamily: 'Work Sans', fontSize: 14}}>
//           Proceed to Checkout
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 0,
//     padding: 16,
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   card: {
//     padding: 16,
//     marginVertical: 4,
//   },
//   cardContent: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 16,
//     color: 'black',
//   },
//   price: {
//     fontSize: 16,
//     color: 'black',
//   },
//   counter: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   quantity: {
//     fontSize: 16,
//     marginHorizontal: 8,
//     color: 'black',
//   },
//   summary: {
//     fontSize: 16,
//     marginVertical: 8,
//     color: 'black',
//   },
//   commentBox: {
//     borderColor: 'gray',
//     borderWidth: 1,
//     borderRadius: 4,
//     padding: 8,
//     marginVertical: 5,
//   },
// });

// export default Cart;

// import React from 'react';
// import { View, Text, FlatList, StyleSheet } from 'react-native';
// import { Card } from 'react-native-paper';

// const Cart = ({ route }) => {
//   const { cartItems } = route.params;

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Cart</Text>
//       <FlatList
//         data={cartItems}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <Card style={styles.card}>
//             <Text style={styles.text}>{item.name}</Text>
//           </Card>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   card: {
//     padding: 16,
//     marginVertical: 4,
//   },
//   text: {
//     color:"black",
//   },
// });

// export default Cart;
