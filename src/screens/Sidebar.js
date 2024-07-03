import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Sidebar = ({ navigation }) => {
  const navigateToScreen = (screenName) => () => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={navigateToScreen('Home')} style={styles.navItem}>
        <Text>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={navigateToScreen('Dashboard')} style={styles.navItem}>
        <Text>Dashboard</Text>
      </TouchableOpacity>
      {/* Add more navigation items as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  navItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default Sidebar;
