import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import Input from './Input';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from './types';

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'LoginScreen'
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen: React.FC<Props> = ({navigation}) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  const validatePassword = (password: string) => {
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordPattern.test(password);
  };

  const validateEmail = (email: string) => {
    const emailPattern = /^\S+@\S+\.\S+$/;
    return emailPattern.test(email);
  };

  const handleLogin = () => {
    // if (!email || !password) {
    //   setEmailError('Required');
    //   setPasswordError('Required');
    //   return;
    // }

    // if (!validateEmail(email)) {
    //   return;
    // }

    // if (!validatePassword(password)) {
    //   return;
    // }

    if (true) {
      navigation.navigate('Dashboard');
    } else {
      Alert.alert(
        'Login Failed',
        'Invalid email or password. Please try again.',
      );
    }
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (!validateEmail(text)) {
      setEmailError('Required');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (!validatePassword(text)) {
      setPasswordError('Required');
    } else {
      setPasswordError('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          source={require('../Images/logo1.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Input
          label="Email"
          value={email}
          onChangeText={handleEmailChange}
          placeholder="Enter email"
          error={emailError}
        />
        <Input
          label="Password"
          value={password}
          onChangeText={handlePasswordChange}
          placeholder="Enter password"
          secureTextEntry={true}
          error={passwordError}
        />

        <TouchableOpacity
          onPress={handleLogin}
          style={{
            backgroundColor: '#EB5757',
            padding: 10,
            borderRadius: 10, // Apply a moderate rounded effect
            alignItems: 'center', // Center content horizontally
            justifyContent: 'center', // Center content vertically
          }}>
          <Text
            style={{color: '#ffffff', fontFamily: 'Work Sans', fontSize: 14}}>
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.link}>Forgot your password?</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.link}>SignUp</Text>
        </TouchableOpacity> */}
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
    fontSize: 20,
  },
  box: {
    height: 40,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
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
    color: '#EB5757',
    textAlign: 'center',
    padding: 10,
    fontSize: 14,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'green',
    textAlign: 'center',
    padding: 10,
  },
  error: {
    color: 'red',
    fontSize: 14,
    marginBottom: 5,
    textAlign: 'left',
    paddingBottom: 10,
  },
});

export default LoginScreen;
