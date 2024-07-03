import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RootStackParamList } from '../types/types';
import { StackScreenProps } from '@react-navigation/stack';

type OrderCompletedProps = StackScreenProps<RootStackParamList, 'OrderCompleted'>;

const OrderCompleted: React.FC<OrderCompletedProps> = ({ route, navigation }) => {
  const { orderNumber, total, transactionId } = route.params;

  // Function to format the date
  const formatDate = (date: Date) => {
    const options = { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' } as const;
    return date.toLocaleDateString('en-US', options);
  };

  // Get today's date
  const orderDate = formatDate(new Date());

  const handleBackToCanteen = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Canteen' }],
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Order Completed</Text>
      <Text style={styles.title}>Payment Completed Successfully</Text>
      <Text style={styles.summaryHeader}>Order Summary : </Text>
      <Text style={styles.summary}>Order Number: 10{orderNumber}</Text>
      <Text style={styles.summary}>Order Date: {orderDate}</Text>
      <Text style={styles.summary}>Order Total: ${total}</Text>
      <Text style={styles.summary}>Transaction ID: 1256{transactionId}</Text>
      <TouchableOpacity onPress={handleBackToCanteen} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: '#fff',
  },
  header: {
    color: '#fff',
    backgroundColor: '#bd2323',
    padding: 17,
    fontSize: 20,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    marginVertical: 16,
    color: 'black',
    textAlign: 'center',
  },
  summaryHeader: {
    fontSize: 18,
    marginVertical: 16,
    color: 'black',
    left: 15,
  },
  summary: {
    fontSize: 15,
    marginVertical: 8,
    color: 'black',
    left: 15,
  },
  backButton: {
    backgroundColor: '#bd2323',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: 120,
    left: 146,
  },
  backButtonText: {
    color: '#ffffff',
    fontFamily: 'Work Sans',
    fontSize: 14,
  },
});

export default OrderCompleted;
