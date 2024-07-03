import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { DrawerContentComponentProps } from '@react-navigation/drawer';

const DrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <Image source={require('../assets/Images/logo1.png')} style={styles.logo} />
        <Text style={styles.userInfo}>Vivek Jadhav</Text>
        <Text style={styles.userinfo}>vivek@gmail.com</Text>
        <Text style={styles.userinfo}>Test App School 2</Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerHeader: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor:'#bd2323', 
    alignContent: 'center',
    textAlign: 'center',  
  },
  logo: {
    width: 100,
    height: 100,
    alignItems: 'center',
    marginLeft: 70,
    
  },
  userInfo: {
    fontSize: 16,
    fontFamily: 'WorkSans-500',
    color:'white', 
  },
  userinfo: {
    fontSize: 12,
    fontFamily: 'WorkSans-300',
    color:'white', 
  },
});

export default DrawerContent;
