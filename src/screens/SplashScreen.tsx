import React from 'react'
import {  View, Image } from 'react-native'

const SplashScreen = () => {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F1B143'
        }}>
        <Image 
          source={require('../Images/logo1.png')}
          style={{
            width: 200,
            height: 200,
          }}
          resizeMode="contain"
      />
      </View>
    );
}

export default SplashScreen;
