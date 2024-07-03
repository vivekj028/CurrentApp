import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Text,
  View,
  Button,
  SafeAreaView,
  StyleSheet,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../types/types';

type ForgotPasswordScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ForgotPassword'
>;

const ForgotPassword: React.FC = () => {
  const navigation = useNavigation<ForgotPasswordScreenNavigationProp>();

  const [email, setEmail] = useState<string>('');

  const validateEmail = (email: string) => {
    // Regular expression pattern for email validation
    const emailPattern = /^\S+@\S+\.\S+$/;
    return emailPattern.test(email);
  };

  const handleLogin = () => {
    if (!email) {
      Alert.alert('Validation Error', 'Please enter both email and password.');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Validation Error', 'Please enter a valid email address.');
      return;
    }

    if (true) {
      navigation.navigate('Dashboard');
    } else {
      Alert.alert(
        'Login Failed',
        'Invalid email or password. Please try again.',
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          source={require('../assets/Images/logo1.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.box}
          placeholder="Enter email"
          placeholderTextColor="gray"
          value={email}
          onChangeText={text => setEmail(text)}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Button title="Send OPT" onPress={handleLogin} color="#EB5757" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  text: {
    color: '#000000',
    fontSize: 14,
  },
  box: {
    height: 40,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    color: 'black',
  },
  label: {
    marginBottom: 5,
    color: '#000000',
    fontSize: 13,
  },
  logo: {
    width: 150,
    height: 200,
    marginBottom: 20,
    alignSelf: 'center',
  },
  link: {
    color: '#007AFF',
    textAlign: 'center',
    padding: 10,
    fontSize: 14,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 16,
    marginBottom: 20,
    color: '#EB5757',
    textAlign: 'center',
    padding: 10,
  },
});

export default ForgotPassword;
