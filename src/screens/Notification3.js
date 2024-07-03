import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';

const Notification3 = () => {
  return (
    <View style={styles.container}>
      <View style={styles.notificationCard}>
            <Text style={styles.title}>Notification 3</Text>
            <Image
                source={require('../Images/notification.jpg')} 
                style={styles.image}
                resizeMode="cover"
            />
        </View>
      <Text style={styles.description}>
        This is the detailed information about Notification 3. 
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Suspendisse varius enim in eros elementum tristique.
      </Text>
      {/* Random Paragraph */}
      <Text style={styles.paragraph}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'top',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  image: {
    width: 300,
    height: 200,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    color: 'black',
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 14,
    color: 'black',
    textAlign: 'center',
  },
  notificationCard: {
    backgroundColor: '#fff', // White background for the card
    borderRadius: 8, // Add rounded corners for a softer look
    shadowColor: '#000', // Set shadow for depth effect
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, // Add elevation for a more prominent card
    marginBottom: 20,
    padding: 15, // Add some padding for content spacing
    width: 350,
    alignItems: 'center',
  },
});

export default Notification3;
