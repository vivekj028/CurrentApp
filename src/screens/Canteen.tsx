import React, { useContext, useState } from 'react';
import { View, Text, SectionList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CartContext } from './CartContext';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList, MenuOption, CanteenSection } from '../types/types';

type CanteenProps = {
  navigation: NavigationProp<RootStackParamList, 'Canteen'>;
};

const menuData: { [key: string]: { afternoon: MenuOption[]; breakfast: MenuOption[] } }  = {
  
    Monday: {
      afternoon: [
        { id: 1, name: 'Sandwich', price: '$5' },
        { id: 5, name: 'Juice', price: '$2' },
        { id: 3, name: 'Chips', price: '$1' }
      ],
      breakfast: [
        { id: 4, name: 'Pancakes', price: '$3' },
        { id: 2, name: 'Coffee', price: '$1.5' },
        { id: 6, name: 'Fruit Salad', price: '$4' }
      ]
    },
    Tuesday: {
      afternoon: [
        { id: 7, name: 'Burger', price: '$6' },
        { id: 11, name: 'Soda', price: '$2' },
        { id: 9, name: 'Cookies', price: '$1.5' }
      ],
      breakfast: [
        { id: 10, name: 'Omelette', price: '$4' },
        { id: 8, name: 'Tea', price: '$1.2' },
        { id: 12, name: 'Yogurt', price: '$2.5' }
      ]
    },
    Wednesday: {
      afternoon: [
        { id: 13, name: 'Pizza', price: '$7' },
        { id: 11, name: 'Lemonade', price: '$2' },
        { id: 15, name: 'Fries', price: '$1.5' }
      ],
      breakfast: [
        { id: 16, name: 'Bagel', price: '$3' },
        { id: 14, name: 'Milk', price: '$1' },
        { id: 18, name: 'Muffin', price: '$2.5' }
      ]
    },
    Thursday: {
      afternoon: [
        { id: 19, name: 'Wrap', price: '$6' },
        { id: 17, name: 'Iced Tea', price: '$2' },
        { id: 21, name: 'Brownie', price: '$2' }
      ],
      breakfast: [
        { id: 22, name: 'Cereal', price: '$2.5' },
        { id: 20, name: 'Orange Juice', price: '$2' },
        { id: 24, name: 'Croissant', price: '$3' }
      ]
    },
    Friday: {
      afternoon: [
        { id: 25, name: 'Hot Dog', price: '$5' },
        { id: 23, name: 'Fizzy Drink', price: '$2' },
        { id: 27, name: 'Pretzel', price: '$1.5' }
      ],
      breakfast: [
        { id: 28, name: 'Toast', price: '$2' },
        { id: 26, name: 'Black Coffee', price: '$1.5' },
        { id: 30, name: 'Smoothie', price: '$3.5' }
      ]
    }
  
  
};

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const Canteen: React.FC<CanteenProps> = ({ navigation }) => {
  const [selectedDay, setSelectedDay] = useState('Monday');
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    return <Text>Loading...</Text>;
  }

  const { cartItems, addedItems, addItemToCart } = cartContext;

  const menu = menuData[selectedDay];

  const sections: CanteenSection[] = [
    {
      title: 'Afternoon Break',
      data: menu.afternoon,
    },
    {
      title: 'Breakfast',
      data: menu.breakfast,
    },
  ];
  
  const renderMenuItem = ({ item }: { item: MenuOption }) => (
    <Card style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.itemName}>{item.name}</Text>
        <View style={styles.itemRight}>
          <Text style={styles.itemPrice}>{item.price}</Text>
          <TouchableOpacity
            onPress={() => addItemToCart(item)}
            style={styles.addButton}
            disabled={addedItems[item.id]}
          >
            <Text style={styles.addButtonText}>
              {addedItems[item.id] ? 'Added' : 'Add'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  );

  const renderSectionHeader = ({ section: { title } }: { section: CanteenSection }) => (
    <View style={styles.sectionHeader}>
      <Icon name="ice-cream" size={21} color="black" />
      <Text style={styles.sectionTitle}> {title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.headerContainer}>
        {daysOfWeek.map((day) => (
          <TouchableOpacity
            key={day}
            onPress={() => setSelectedDay(day)}
            style={[
              styles.headerButton,
              selectedDay === day && styles.selectedHeaderButton,
            ]}
          >
            <Text
              style={[
                styles.headerButtonText,
                selectedDay === day && styles.selectedHeaderButtonText,
              ]}
            >
              {day.slice(0, 3)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMenuItem}
        renderSectionHeader={renderSectionHeader}
      />
      {cartItems.length > 0 && (
        <TouchableOpacity
          style={styles.cartIconContainer}
          onPress={() => navigation.navigate('Cart')}
        >
          <Icon name="cart" size={30} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    padding: 0,
  },
  headerContainer: {
    flexDirection: 'row',
    backgroundColor: '#BDBDBD',
    padding: 0,
    marginVertical: 5,
  },
  headerButton: {
    padding: 3,
    marginHorizontal: 12,
  },
  selectedHeaderButton: {
    backgroundColor: '#bd2323',
    margin: 0,
    padding: 5,
  },
  headerButtonText: {
    fontSize: 16,
    color: 'black',
    paddingHorizontal: 10,
  },
  selectedHeaderButtonText: {
    color: 'white',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#BDBDBD',
    padding: 12,
    marginVertical: 5,
  },
  sectionTitle: {
    fontSize: 15,
    marginLeft: 5,
    color: 'black',
  },
  card: {
    padding: 10,
    marginVertical: 0,
    borderRadius: 0,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 16,
    color: 'black',
  },
  itemRight: {
    alignItems: 'center',
    justifyContent: 'flex-end'
    
  },
  itemPrice: {
    fontSize: 14,
    color: 'black',
    marginBottom: 5,
  },
  addButton: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 0.5,
    padding: 5,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: 'black',
    fontSize: 14,
  },
  cartIconContainer: {
    width: 50,
    height: 'auto',
    left: 350,
    backgroundColor: '#bd2323',
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
});

export default Canteen;


// import React, { useContext, useState, createContext } from 'react';
// import { View, Text, SectionList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
// import { Card } from 'react-native-paper';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import { NavigationProp } from '@react-navigation/native';
// import { MenuOption, CanteenSection, RootStackParamList,  } from './types';

// type CartItem = {
//   id: string;
//   name: string;
//   price: string;
// };

// type CartContextType = {
//   cartItems: CartItem[];
//   addedItems: { [key: string]: boolean };
//   addItemToCart: (item: CartItem) => void;
// };

// const CartContext = createContext<CartContextType | undefined>(undefined);

// type CanteenProps = {
//   navigation: NavigationProp<RootStackParamList, 'Canteen'>;
// };

// const menuData: { [key: string]: { afternoon: MenuOption[]; breakfast: MenuOption[] } }  = {
//   Monday: {
//     afternoon: [
//       { id: '1', name: 'Sandwich', price: '$5' },
//       { id: '5', name: 'Juice', price: '$2' },
//       { id: '3', name: 'Chips', price: '$1' },
//     ],
//     breakfast: [
//       { id: '4', name: 'Pancakes', price: '$3' },
//       { id: '2', name: 'Coffee', price: '$1.5' },
//       { id: '6', name: 'Fruit Salad', price: '$4' },
//     ],
//   },
//   Tuesday: {
//     afternoon: [
//       { id: '7', name: 'Burger', price: '$6' },
//       { id: '11', name: 'Soda', price: '$2' },
//       { id: '9', name: 'Cookies', price: '$1.5' },
//     ],
//     breakfast: [
//       { id: '10', name: 'Omelette', price: '$4' },
//       { id: '8', name: 'Tea', price: '$1.2' },
//       { id: '12', name: 'Yogurt', price: '$2.5' },
//     ],
//   },
//   Wednesday: {
//     afternoon: [
//       { id: '13', name: 'Pizza', price: '$7' },
//       { id: '11', name: 'Lemonade', price: '$2' },
//       { id: '15', name: 'Fries', price: '$1.5' },
//     ],
//     breakfast: [
//       { id: '16', name: 'Bagel', price: '$3' },
//       { id: '14', name: 'Milk', price: '$1' },
//       { id: '18', name: 'Muffin', price: '$2.5' },
//     ],
//   },
//   Thursday: {
//     afternoon: [
//       { id: '19', name: 'Wrap', price: '$6' },
//       { id: '17', name: 'Iced Tea', price: '$2' },
//       { id: '21', name: 'Brownie', price: '$2' },
//     ],
//     breakfast: [
//       { id: '22', name: 'Cereal', price: '$2.5' },
//       { id: '20', name: 'Orange Juice', price: '$2' },
//       { id: '24', name: 'Croissant', price: '$3' },
//     ],
//   },
//   Friday: {
//     afternoon: [
//       { id: '25', name: 'Hot Dog', price: '$5' },
//       { id: '23', name: 'Fizzy Drink', price: '$2' },
//       { id: '27', name: 'Pretzel', price: '$1.5' },
//     ],
//     breakfast: [
//       { id: '28', name: 'Toast', price: '$2' },
//       { id: '26', name: 'Black Coffee', price: '$1.5' },
//       { id: '30', name: 'Smoothie', price: '$3.5' },
//     ],
//   },
// };

// const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

// const Canteen: React.FC<CanteenProps> = ({ navigation }) => {
//   const [selectedDay, setSelectedDay] = useState('Monday');
  // const cartContext = useContext(CartContext);

  // if (!cartContext) {
  //   return <Text>Loading...</Text>;
  // }

  // const { cartItems, addedItems, addItemToCart } = cartContext;
//   const menu = menuData[selectedDay];

//   const sections: CanteenSection[] = [
//     {
//       title: 'Afternoon Break',
//       data: menu.afternoon,
//     },
//     {
//       title: 'Breakfast',
//       data: menu.breakfast,
//     },
//   ];

//   const renderMenuItem = ({ item }: { item: MenuOption }) => (
//     <Card style={styles.card}>
//       <View style={styles.cardContent}>
//         <Text style={styles.itemName}>{item.name}</Text>
//         <View style={styles.itemRight}>
//           <Text style={styles.itemPrice}>{item.price}</Text>
//           <TouchableOpacity
//             onPress={() => addItemToCart(item)}
//             style={styles.addButton}
//             disabled={addedItems[item.id]}
//           >
//             <Text style={styles.addButtonText}>
//               {addedItems[item.id] ? 'Added' : 'Add'}
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </Card>
//   );

//   const renderSectionHeader = ({ section: { title } }: { section: CanteenSection }) => (
//     <View style={styles.sectionHeader}>
//       <Icon name="ice-cream" size={21} color="black" />
//       <Text style={styles.sectionTitle}> {title}</Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <ScrollView horizontal style={styles.headerContainer}>
//         {daysOfWeek.map((day) => (
//           <TouchableOpacity
//             key={day}
//             onPress={() => setSelectedDay(day)}
//             style={[
//               styles.headerButton,
//               selectedDay === day && styles.selectedHeaderButton,
//             ]}
//           >
//             <Text
//               style={[
//                 styles.headerButtonText,
//                 selectedDay === day && styles.selectedHeaderButtonText,
//               ]}
//             >
//               {day.slice(0, 3)}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>
//       <SectionList
//         sections={sections}
//         keyExtractor={(item) => item.id}
//         renderItem={renderMenuItem}
//         renderSectionHeader={renderSectionHeader}
//       />
//       {cartItems.length > 0 && (
//         <TouchableOpacity
//           style={styles.cartIconContainer}
//           onPress={() => navigation.navigate('Cart')}
//         >
//           <Icon name="cart" size={30} color="white" />
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 0,
//     padding: 0,
//   },
//   headerContainer: {
//     flexDirection: 'row',
//     backgroundColor: '#BDBDBD',
//     padding: 0,
//     marginVertical: 5,
//   },
//   headerButton: {
//     padding: 3,
//     marginHorizontal: 12,
//   },
//   selectedHeaderButton: {
//     backgroundColor: '#bd2323',
//     margin: 0,
//     padding: 5,
//   },
//   headerButtonText: {
//     fontSize: 16,
//     color: 'black',
//     paddingHorizontal: 10,
//   },
//   selectedHeaderButtonText: {
//     color: 'white',
//   },
//   sectionHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#BDBDBD',
//     padding: 12,
//     marginVertical: 5,
//   },
//   sectionTitle: {
//     fontSize: 15,
//     marginLeft: 5,
//     color: 'black',
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
//   itemName: {
//     fontSize: 16,
//     color: 'black',
//   },
//   itemRight: {
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//   },
//   itemPrice: {
//     fontSize: 14,
//     color: 'black',
//     marginBottom: 5,
//   },
//   addButton: {
//     backgroundColor: 'white',
//     borderColor: 'black',
//     borderWidth: 0.5,
//     padding: 5,
//     paddingHorizontal: 15,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   addButtonText: {
//     color: 'black',
//     fontSize: 14,
//   },
//   cartIconContainer: {
//     width: 50,
//     height: 'auto',
//     left: 350,
//     backgroundColor: '#bd2323',
//     padding: 10,
//     borderRadius: 50,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 50,
//   },
// });

// export default Canteen;


// import React, { useState } from 'react';
// import { View, Text, SectionList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
// import { Card } from 'react-native-paper';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

// const Canteen = ({ navigation }) => {
//   const [selectedDay, setSelectedDay] = useState('Monday');
//   const [cartItems, setCartItems] = useState([]);
//   const [addedItems, setAddedItems] = useState({});

//   const menu = menuData[selectedDay];

//   const sections = [
//     {
//       title: 'Afternoon Break',
//       data: menu.afternoon,
//     },
//     {
//       title: 'Breakfast',
//       data: menu.breakfast,
//     },
//   ];

//   const addItemToCart = (item) => {
//     setCartItems((prevItems) => {
//       const itemIndex = prevItems.findIndex((cartItem) => cartItem.id === item.id);
//       if (itemIndex >= 0) {
//         return prevItems;
//       } else {
//         setAddedItems((prevAddedItems) => ({ ...prevAddedItems, [item.id]: true }));
//         return [...prevItems, item];
//       }
//     });
//   };

//   const renderMenuItem = ({ item }) => (
//     <Card style={styles.card}>
//       <View style={styles.cardContent}>
//         <Text style={styles.itemName}>{item.name}</Text>
//         <View style={styles.itemRight}>
//           <Text style={styles.itemPrice}>{item.price}</Text>
//           <TouchableOpacity
//             onPress={() => addItemToCart(item)}
//             style={styles.addButton}
//             disabled={addedItems[item.id]}
//           >
//             <Text style={styles.addButtonText}>
//               {addedItems[item.id] ? 'Added' : 'Add'}
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </Card>
//   );

//   const renderSectionHeader = ({ section: { title } }) => (
//     <View style={styles.sectionHeader}>
//       <Icon name="ice-cream" size={21} color="black" />
//       <Text style={styles.sectionTitle}> {title}</Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <ScrollView horizontal style={styles.headerContainer}>
//         {daysOfWeek.map((day) => (
//           <TouchableOpacity
//             key={day}
//             onPress={() => setSelectedDay(day)}
//             style={[
//               styles.headerButton,
//               selectedDay === day && styles.selectedHeaderButton,
//             ]}
//           >
//             <Text
//               style={[
//                 styles.headerButtonText,
//                 selectedDay === day && styles.selectedHeaderButtonText,
//               ]}
//             >
//               {day.slice(0, 3)}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>
//       <SectionList
//         sections={sections}
//         keyExtractor={(item) => item.id}
//         renderItem={renderMenuItem}
//         renderSectionHeader={renderSectionHeader}
//       />
//       {cartItems.length > 0 && (
//         <TouchableOpacity
//           style={styles.cartIconContainer}
//           onPress={() => navigation.navigate('Cart', { cartItems })}
//         >
//           <Icon name="cart" size={30} color="white" />
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// };


// export default Canteen;


// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
// import { Card } from 'react-native-paper';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// const menuData = {
//   Monday: {
//     afternoon: [
//       { id: '1', name: 'Sandwich', price: '$5' },
//       { id: '2', name: 'Juice', price: '$2' },
//       { id: '3', name: 'Chips', price: '$1' },
//     ],
//     breakfast: [
//       { id: '4', name: 'Pancakes', price: '$3' },
//       { id: '5', name: 'Coffee', price: '$1.5' },
//       { id: '6', name: 'Fruit Salad', price: '$4' },
//     ],
//   },
//   Tuesday: {
//     afternoon: [
//       { id: '7', name: 'Burger', price: '$6' },
//       { id: '8', name: 'Soda', price: '$2' },
//       { id: '9', name: 'Cookies', price: '$1.5' },
//     ],
//     breakfast: [
//       { id: '10', name: 'Omelette', price: '$4' },
//       { id: '11', name: 'Tea', price: '$1.2' },
//       { id: '12', name: 'Yogurt', price: '$2.5' },
//     ],
//   },
//   // Add menus for other days similarly
//   Wednesday: {
//     afternoon: [
//       { id: '13', name: 'Pizza', price: '$7' },
//       { id: '14', name: 'Lemonade', price: '$2' },
//       { id: '15', name: 'Fries', price: '$1.5' },
//     ],
//     breakfast: [
//       { id: '16', name: 'Bagel', price: '$3' },
//       { id: '17', name: 'Milk', price: '$1' },
//       { id: '18', name: 'Muffin', price: '$2.5' },
//     ],
//   },
//   Thursday: {
//     afternoon: [
//       { id: '19', name: 'Wrap', price: '$6' },
//       { id: '20', name: 'Iced Tea', price: '$2' },
//       { id: '21', name: 'Brownie', price: '$2' },
//     ],
//     breakfast: [
//       { id: '22', name: 'Cereal', price: '$2.5' },
//       { id: '23', name: 'Orange Juice', price: '$2' },
//       { id: '24', name: 'Croissant', price: '$3' },
//     ],
//   },
//   Friday: {
//     afternoon: [
//       { id: '25', name: 'Hot Dog', price: '$5' },
//       { id: '26', name: 'Fizzy Drink', price: '$2' },
//       { id: '27', name: 'Pretzel', price: '$1.5' },
//     ],
//     breakfast: [
//       { id: '28', name: 'Toast', price: '$2' },
//       { id: '29', name: 'Black Coffee', price: '$1.5' },
//       { id: '30', name: 'Smoothie', price: '$3.5' },
//     ],
//   },
// };

// const getDayOfWeek = () => {
//   const date = new Date();
//   const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//   return daysOfWeek[date.getDay()];
// };

// const Canteen = ({ navigation }) => {
//   const [cartItems, setCartItems] = useState([]);
//   const [addedItems, setAddedItems] = useState({});
//   const currentDay = getDayOfWeek();
//   const menu = menuData[currentDay] || { afternoon: [], breakfast: [] };

//   const addItemToCart = (item) => {
//     setCartItems((prevItems) => {
//       const itemIndex = prevItems.findIndex((cartItem) => cartItem.id === item.id);
//       if (itemIndex >= 0) {
//         return prevItems;
//       } else {
//         setAddedItems((prevAddedItems) => ({ ...prevAddedItems, [item.id]: true }));
//         return [...prevItems, item];
//       }
//     });
//   };

//   const renderMenuItem = ({ item }) => (
//     <Card style={styles.card}>
//       <View style={styles.cardContent}>
//         <Text style={styles.itemName}>{item.name}</Text>
//         <View style={styles.itemRight}>
//           <Text style={styles.itemPrice}>{item.price}</Text>
//           <TouchableOpacity
//             onPress={() => addItemToCart(item)}
//             style={styles.addButton}
//             disabled={addedItems[item.id]}
//           >
//             <Text style={styles.addButtonText}>
//               {addedItems[item.id] ? 'Added' : 'Add'}
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </Card>
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerText}>{currentDay}</Text>
//       </View>
//       {menu.afternoon.length > 0 && (
//         <>
//           <View style={styles.sectionHeader}>
//             <Icon name="ice-cream" size={21} color="black" />
//             <Text style={styles.sectionTitle}> Afternoon Break</Text>
//           </View>
//           <FlatList
//             data={menu.afternoon}
//             keyExtractor={(item) => item.id}
//             renderItem={renderMenuItem}
//           />
//         </>
//       )}
//       {menu.breakfast.length > 0 && (
//         <>
//           <View style={styles.sectionHeader}>
//             <Icon name="ice-cream" size={21} color="black" />
//             <Text style={styles.sectionTitle}> Copy Breakfast</Text>
//           </View>
//           <FlatList
//             data={menu.breakfast}
//             keyExtractor={(item) => item.id}
//             renderItem={renderMenuItem}
//           />
//         </>
//       )}
//       {cartItems.length > 0 && (
//         <TouchableOpacity
//           style={styles.cartIconContainer}
//           onPress={() => navigation.navigate('Cart', { cartItems })}
//         >
//           <Icon name="cart" size={30} color="white" />
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 0,
//     padding: 0,
//   },
//   header: {
//     backgroundColor: '#BDBDBD',
//     padding: 12,
//   },
//   headerText: {
//     fontSize: 20,
//     color: 'black',
//   },
//   sectionHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#BDBDBD',
//     padding: 12,
//     marginVertical: 5,
//   },
//   sectionTitle: {
//     fontSize: 15,
//     marginLeft: 5,
//     color: 'black',
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
//   itemName: {
//     fontSize: 16,
//     color: 'black',
//   },
//   itemRight: {
//     alignItems: 'center',
//   },
//   itemPrice: {
//     fontSize: 14,
//     color: 'black',
//     marginBottom: 5,
//   },
//   addButton: {
//     backgroundColor: 'white',
//     borderColor: 'black',
//     borderWidth: 0.5,
//     padding: 5,
//     paddingHorizontal: 15,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   addButtonText: {
//     color: 'black',
//     fontSize: 14,
//   },
//   cartIconContainer: {
//     width: 50,
//     height: 'auto',
//     bottom: 0,
//     left: 350,
//     backgroundColor: '#bd2323',
//     padding: 10,
//     borderRadius: 50,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

// export default Canteen;


// import React, { useState } from 'react';
// import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
// import { Card } from 'react-native-paper';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// const menuItemsAfternoon = [
//   { id: '1', name: 'Sandwich', price: '$5' },
//   { id: '2', name: 'Juice', price: '$2' },
//   { id: '3', name: 'Chips', price: '$1' },
// ];

// const menuItemsBreakfast = [
//   { id: '4', name: 'Pancakes', price: '$3' },
//   { id: '5', name: 'Coffee', price: '$1.5' },
//   { id: '6', name: 'Fruit Salad', price: '$4' },
// ];

// const Canteen = ({ navigation }) => {
//   const [cartItems, setCartItems] = useState([]);
//   const [addedItems, setAddedItems] = useState({});

//   const addItemToCart = (item) => {
//     setCartItems((prevItems) => {
//       const itemIndex = prevItems.findIndex((cartItem) => cartItem.id === item.id);
//       if (itemIndex >= 0) {
//         return prevItems;
//       } else {
//         setAddedItems((prevAddedItems) => ({ ...prevAddedItems, [item.id]: true }));
//         return [...prevItems, item];
//       }
//     });
//   };

//   const renderMenuItem = ({ item }) => (
//     <Card style={styles.card}>
//       <View style={styles.cardContent}>
//         <Text style={styles.itemName}>{item.name}</Text>
//         <View style={styles.itemRight}>
//           <Text style={styles.itemPrice}>{item.price}</Text>
//           <TouchableOpacity 
//             onPress={() => addItemToCart(item)}
//             style={styles.addButton}
//             disabled={addedItems[item.id]}
//           >
//             <Text style={styles.addButtonText}>
//               {addedItems[item.id] ? 'Added' : 'Add'}
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </Card>
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.sectionHeader}>
//         <Icon name="ice-cream" size={21} color="black" />
//         <Text style={styles.sectionTitle}> Afternoon Break</Text>
//       </View>
//       <FlatList
//         data={menuItemsAfternoon}
//         keyExtractor={(item) => item.id}
//         renderItem={renderMenuItem}
//       />
//       <View style={styles.sectionHeader}>
//         <Icon name="ice-cream" size={21} color="black" />
//         <Text style={styles.sectionTitle}> Copy Breakfast</Text>
//       </View>
//       <FlatList
//         data={menuItemsBreakfast}
//         keyExtractor={(item) => item.id}
//         renderItem={renderMenuItem}
//       />
//       {cartItems.length > 0 && (
//         <TouchableOpacity
//           style={styles.cartIconContainer}
//           onPress={() => navigation.navigate('Cart', { cartItems })}
//         >
//           <Icon name="cart" size={30} color="white" />
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 0,
//     padding: 0,
//   },
//   sectionHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#BDBDBD',
//     padding: 12,
//     marginVertical: 5,
//   },
//   sectionTitle: {
//     fontSize: 15,
//     marginLeft: 5,
//     color: 'black',
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
//   itemName: {
//     fontSize: 16,
//     color: 'black',
//   },
//   itemRight: {
//     alignItems: 'center',
//   },
//   itemPrice: {
//     fontSize: 14,
//     color: 'black',
//     marginBottom: 5,
//   },
//   addButton: {
//     backgroundColor: 'white',
//     borderColor: 'black',
//     borderWidth: 0.5,
//     padding: 5,
//     paddingHorizontal: 15,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   addButtonText: {
//     color: 'black',
//     fontSize: 14,
//   },
//   cartIconContainer: {
//     width: 50,
//     height: 'auto',
//     bottom: 0,
//     left: 350,
//     backgroundColor: '#bd2323',
//     padding: 10,
//     borderRadius: 50,
//     alignItems: 'center',
//     justifyContent: 'center',

//   },
// });

// export default Canteen;


// import React, { useState } from 'react';
// import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
// import { Card } from 'react-native-paper';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// const menuItemsAfternoon = [
//   { id: '1', name: 'Sandwich', price: '$5' },
//   { id: '2', name: 'Juice', price: '$2' },
//   { id: '3', name: 'Chips', price: '$1' },
// ];

// const menuItemsBreakfast = [
//   { id: '4', name: 'Pancakes', price: '$3' },
//   { id: '5', name: 'Coffee', price: '$1.5' },
//   { id: '6', name: 'Fruit Salad', price: '$4' },
//   { id: '7', name: 'Tea', price: '$2' },
// ];

// const Canteen = ({ navigation }) => {
//   const [cartItems, setCartItems] = useState([]);
//   const [addedItems, setAddedItems] = useState({});

//   const addItemToCart = (item) => {
//     setCartItems((prevItems) => {
//       const itemIndex = prevItems.findIndex((cartItem) => cartItem.id === item.id);
//       if (itemIndex >= 0) {
//         return prevItems;
//       } else {
//         setAddedItems((prevAddedItems) => ({ ...prevAddedItems, [item.id]: true }));
//         return [...prevItems, item];
//       }
//     });
//   };

//   const renderMenuItem = ({ item }) => (
//     <Card style={styles.card}>
//       <View style={styles.cardContent}>
//         <Text style={styles.itemName}>{item.name}</Text>
//         <View style={styles.itemRight}>
//           <Text style={styles.itemPrice}>{item.price}</Text>
//           <TouchableOpacity 
//             onPress={() => addItemToCart(item)}
//             style={styles.addButton}
//             disabled={addedItems[item.id]}
//           >
//             <Text style={styles.addButtonText}>
//               {addedItems[item.id] ? 'Added' : 'Add'}
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </Card>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.sectionTitle}>Afternoon Break</Text>
//       <FlatList
//         data={menuItemsAfternoon}
//         keyExtractor={(item) => item.id}
//         renderItem={renderMenuItem}
//       />
//       <Text style={styles.sectionTitle}>Breakfast</Text>
//       <FlatList
//         data={menuItemsBreakfast}
//         keyExtractor={(item) => item.id}
//         renderItem={renderMenuItem}
//       />
//       {cartItems.length > 0 && (
//         <TouchableOpacity
//           style={styles.cartIconContainer}
//           onPress={() => navigation.navigate('Cart', { cartItems })}
//         >
//           <Icon name="cart" size={30} color="white" />
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 0,
//     padding: 0,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     marginVertical: 5,
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
//   itemName: {
//     fontSize: 16,
//     color: 'black',
//   },
//   itemRight: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   itemPrice: {
//     fontSize: 14,
//     marginRight: 8,
//     color: 'black',
//   },
//   addButton: {
//     backgroundColor: 'white',
//     borderColor: 'black',
//     borderWidth: 0.5,
//     padding: 5,
//     paddingHorizontal: 15,
//     borderRadius: 5,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   addButtonText: {
//     color: 'black',
//     fontSize: 14,
//   },
//   cartIconContainer: {
//     position: 'absolute',
//     bottom: 0,
//     right: 20,
//     backgroundColor: '#bd2323',
//     padding: 10,
//     borderRadius: 50,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

// export default Canteen;


// import React, { useState } from 'react';
// import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
// import { Card, IconButton } from 'react-native-paper';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// const menuItemsAfternoon = [
//   { id: '1', name: 'Sandwich', price: '$5' },
//   { id: '2', name: 'Juice', price: '$2' },
//   { id: '3', name: 'Chips', price: '$1' },
// ];

// const menuItemsBreakfast = [
//   { id: '4', name: 'Pancakes', price: '$3' },
//   { id: '5', name: 'Coffee', price: '$1.5' },
//   { id: '6', name: 'Fruit Salad', price: '$4' },
// ];

// const Canteen = ({ navigation }) => {
//   const [cartItems, setCartItems] = useState([]);

//   const addItemToCart = (item) => {
//     setCartItems((prevItems) => {
//       const itemIndex = prevItems.findIndex((cartItem) => cartItem.id === item.id);
//       if (itemIndex >= 0) {
//         return prevItems;
//       } else {
//         return [...prevItems, item];
//       }
//     });
//   };

//   const renderMenuItem = ({ item }) => (
//     <Card style={styles.card}>
//       <View style={styles.cardContent}>
//         <Text style={styles.itemName}>{item.name}</Text>
//         <View style={styles.itemRight}>
//           <Text style={styles.itemPrice}>{item.price}</Text>

//           <TouchableOpacity 
//           title="Add" 
//           onPress={() => addItemToCart(item)}
//           style={{
//             backgroundColor: 'white',
//             borderBlockColor: 'black',
//             borderWidth: 0.5,
//             padding: 5,
//             paddingHorizontal: 15,
//             borderRadius: 0, // Apply a moderate rounded effect
//             alignItems: 'center', // Center content horizontally
//             justifyContent: 'center', // Center content vertically
//         }}
//           >
//             <Text style={{ color: 'black', fontFamily: "Work Sans", fontSize: 14 }}>Add</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </Card>
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.navigate('Cart', { cartItems })}>
//           <Icon name="cart" size={24} color="black" />
//         </TouchableOpacity>
//       </View>
//       <Text style={styles.sectionTitle}>Afternoon Break</Text>
//       <FlatList
//         data={menuItemsAfternoon}
//         keyExtractor={(item) => item.id}
//         renderItem={renderMenuItem}
//       />
//       <Text style={styles.sectionTitle}>Breakfast</Text>
//       <FlatList
//         data={menuItemsBreakfast}
//         keyExtractor={(item) => item.id}
//         renderItem={renderMenuItem}
//       />

//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 0,
//     padding: 0,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 0,
//     marginHorizontal: 10,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     marginVertical: 6,
//     marginHorizontal: 0,
//     color: 'black',
//     backgroundColor: '#BDBDBD',
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
//   itemName: {
//     fontSize: 16,
//     color: 'black',
//   },
//   itemRight: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   itemPrice: {
//     fontSize: 14,
//     marginRight: 8,
//     color: 'black',
//   },
// });

// export default Canteen;



// import React, { useState } from 'react';
// import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
// import { Card, IconButton } from 'react-native-paper';

// const menuItemsAfternoon = [
//   { id: '1', name: 'Sandwich', price: '$5' },
//   { id: '2', name: 'Juice', price: '$2' },
//   { id: '3', name: 'Chips', price: '$1' },
// ];

// const menuItemsBreakfast = [
//   { id: '4', name: 'Pancakes', price: '$3' },
//   { id: '5', name: 'Coffee', price: '$1.5' },
//   { id: '6', name: 'Fruit Salad', price: '$4' },
// ];

// const Canteen = ({ navigation }) => {
//   const [cartItems, setCartItems] = useState([]);

//   const addItemToCart = (item) => {
//     setCartItems([...cartItems, item]);
//   };

//   const renderMenuItem = ({ item }) => (
//     <Card style={styles.card}>
//       <View style={styles.cardContent}>
//         <Text style={styles.itemName}>{item.name}</Text>
//         <View style={styles.itemRight}>
//           <Text style={styles.itemPrice}>{item.price}</Text>
//           <Button title="Add" onPress={() => addItemToCart(item)} />
//         </View>
//       </View>
//     </Card>
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.navigate('Cart', { cartItems })}>
//           <IconButton icon="cart" size={24} color="#fff" />
//         </TouchableOpacity>
//       </View>
//       <Text style={styles.sectionTitle}>Afternoon Break</Text>
//       <FlatList
//         data={menuItemsAfternoon}
//         keyExtractor={(item) => item.id}
//         renderItem={renderMenuItem}
//       />
//       <Text style={styles.sectionTitle}>Breakfast</Text>
//       <FlatList
//         data={menuItemsBreakfast}
//         keyExtractor={(item) => item.id}
//         renderItem={renderMenuItem}
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
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     marginVertical: 8,
//     color: 'black',
//     backgroundColor: 'grey',
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
//   itemName: {
//     fontSize: 16,
//     color: 'black',
//   },
//   itemRight: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   itemPrice: {
//     fontSize: 16,
//     marginRight: 8,
//     color: 'black',
//   },
// });

// export default Canteen;

// import React, { useState } from 'react';
// import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
// import { Card, IconButton } from 'react-native-paper';

// const menuItemsAfternoon = [
//   { id: '1', name: 'Sandwich' },
//   { id: '2', name: 'Juice' },
//   { id: '3', name: 'Chips' },
// ];

// const menuItemsBreakfast = [
//   { id: '4', name: 'Pancakes' },
//   { id: '5', name: 'Coffee' },
//   { id: '6', name: 'Fruit Salad' },
// ];

// const Canteen = ({ navigation }) => {
//   const [cartItems, setCartItems] = useState([]);

//   const addItemToCart = (item) => {
//     setCartItems([...cartItems, item]);
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.navigate('Cart', { cartItems })}>
//           <IconButton icon="cart" size={24} color="#fff" />
//         </TouchableOpacity>
//       </View>
//       <Text style={styles.sectionTitle}>Afternoon Break</Text>
//       <FlatList
//         data={menuItemsAfternoon}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <Card style={styles.card}>
//             <Text style={styles.text}>{item.name}</Text>
//             <Button title="Add" onPress={() => addItemToCart(item)} />
//           </Card>
//         )}
//       />
//       <Text style={styles.sectionTitle}>Breakfast</Text>
//       <FlatList
//         data={menuItemsBreakfast}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <Card style={styles.card}>
//             <Text style={styles.text}>{item.name}</Text>
//             <Button title="Add" onPress={() => addItemToCart(item)} />
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
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 16,
//     color:'black',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color:'black',
//   },
//   sectionTitle: {
//     fontSize: 20,
//     marginVertical: 8,
//     color:'black',
//   },
//   card: {
//     padding: 16,
//     marginVertical: 4,
//     color:'black',
//   },
//   text: {
//     color:"black",
//   },
// });

// export default Canteen;
