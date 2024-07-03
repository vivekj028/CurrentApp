import React from 'react';
import { View, ScrollView, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList, Notification } from './types';

const Dashboard: React.FC = () => {

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const imagesData: Notification[] = [
    {
      title: 'Notification 1',
      imageUrl: require('../Images/notification.jpg'),
      description: 'Description for Notification 1',
      screenName: 'Notification1',
    },
    {
      title: 'Notification 2',
      imageUrl: require('../Images/notification.jpg'),
      description: 'Description for Notification 2',
      screenName: 'Notification2',
    },
    {
      title: 'Notification 3',
      imageUrl: require('../Images/notification.jpg'),
      description: 'Description for Notification 3',
      screenName: 'Notification3',
    },
    {
      title: 'Notification 4',
      imageUrl: require('../Images/notification.jpg'),
      description: 'Description for Notification 4',
    },
    {
      title: 'Notification 5',
      imageUrl: require('../Images/notification.jpg'),
      description: 'Description for Notification 5',
    },
    {
      title: 'Notification 6',
      imageUrl: require('../Images/notification.jpg'),
      description: 'Description for Notification 6',
    },
    {
      title: 'Notification 7',
      imageUrl: require('../Images/notification.jpg'),
      description: 'Description for Notification 7',
    },
    {
      title: 'Notification 8',
      imageUrl: require('../Images/notification.jpg'),
      description: 'Description for Notification 8',
    },
    {
      title: 'Notification 9',
      imageUrl: require('../Images/notification.jpg'),
      description: 'Description for Notification 9',
    },

  ];

  const handleNotificationPress = (notification: Notification) => {
    if (notification.screenName) {
      // Navigate to the notification details screen if screenName is provided
      navigation.navigate(notification.screenName, { notification });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {imagesData.map((image, index) => (
        <TouchableOpacity key={index} onPress={() => handleNotificationPress(image)}>
          <View style={styles.notificationCard}>
            <Image
              source={image.imageUrl}
              style={styles.notificationImage}
              resizeMode="cover"
            />
            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle}>{image.title}</Text>
              <Text style={styles.notificationDescription}>{image.description}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 20,
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
  },
  notificationImage: {
    width: '100%', // Make the image fill the card width
    height: 150, // Adjust image height as needed
    marginBottom: 10,
  },
  notificationContent: {
    alignItems: 'center', // Center content within the card
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  notificationDescription: {
    fontSize: 14,
    color: '#555555',
  },
  });

export default Dashboard;
