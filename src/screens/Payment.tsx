import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types/types';
import {useCart} from './CartContext';

type Props = StackScreenProps<RootStackParamList, 'Payment'>;

const Payment: React.FC<Props> = ({ route, navigation }) => {
  const { total, walletBalance, orderNumber, orderDate, transactionId } = route.params;
  const [balance, setBalance] = useState<number>(walletBalance);

  const {clearCart} = useCart();

  const addMoneyToWallet = () => {
    setBalance(balance + 10);
  };

  const handleCheckout = () => {
    if (total > balance) {
      Alert.alert('Insufficient balance', 'Please add money to your wallet.');
    } else {
      navigation.navigate('OrderCompleted', {
        orderNumber,
        orderDate,
        total,
        transactionId,
      });
      clearCart();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.summary}>Order Total: ${total}</Text>
      <Text style={styles.summary}>Wallet Balance: ${balance}</Text>
      <TouchableOpacity onPress={addMoneyToWallet}>
        <Text style={styles.addMoney}>Add Money to Wallet</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleCheckout} style={styles.checkoutButton}>
        <Text style={styles.checkoutButtonText}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'black',
  },
  summary: {
    fontSize: 16,
    marginVertical: 8,
    color: 'black',
  },
  addMoney: {
    fontSize: 16,
    color: 'blue',
    marginBottom: 10,
    textDecorationLine: 'underline',
  },
  checkoutButton: {
    backgroundColor: '#bd2323',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkoutButtonText: {
    color: '#ffffff',
    fontFamily: 'Work Sans',
    fontSize: 14,
  },
});

export default Payment;


// import React, {useState} from 'react';
// import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';

// const Payment = ({route, navigation}) => {
//   const {total, walletBalance} = route.params;
//   const [balance, setBalance] = useState(walletBalance);

//   const addMoneyToWallet = () => {
//     setBalance(balance + 10);
//   };

//   const handleCheckout = () => {
//     if (total > balance) {
//       alert('Insufficient balance. Please add money to your wallet.');
//     } else {
//       alert('Checkout successful!');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.summary}>Order Total: ${total}</Text>
//       <Text style={styles.summary}>Wallet Balance: ${balance}</Text>
//       <TouchableOpacity onPress={addMoneyToWallet}>
//         <Text style={styles.addMoney}>Add Money to Wallet</Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         onPress={handleCheckout}
//         style={{
//           backgroundColor: '#bd2323',
//           padding: 10,
//           borderRadius: 10, // Apply a moderate rounded effect
//           alignItems: 'center', // Center content horizontally
//           justifyContent: 'center', // Center content vertically
//         }}>
//         <Text style={{color: '#ffffff', fontFamily: 'Work Sans', fontSize: 14}}>
//           Checkout
//         </Text>
//       </TouchableOpacity>
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
//     color: 'black',
//   },
//   summary: {
//     fontSize: 16,
//     marginVertical: 0,
//     color: 'black',
//   },
//   addMoney: {
//     fontSize: 16,
//     color: 'blue',
//     marginBottom: 10,
//     textDecorationLine: 'underline',
//   },
// });

// export default Payment;
