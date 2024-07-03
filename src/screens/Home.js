import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, Button, } from "react-native";

const Home = () => {

    
    const navigation = useNavigation()

    return(
        <View style={{flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#FFFFFF', }}>
            <Text style={{color:'black'}}>Home</Text>
            <Text>Home</Text>
            <Text>Home</Text>
            <Text>Home</Text>
            <Text>Home</Text>
            <Text>Home</Text>
            <Button 
            title="go to login"
            onPress={()=> navigation.navigate("LoginScreen")}
            // onPress={() => navigation.goBack()}
            />
        </View>
    );
    
};

export default Home;