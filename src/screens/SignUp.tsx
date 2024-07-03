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
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from './types';

type SingUpProps = StackNavigationProp<RootStackParamList, 'SingUp'>;

type Props = {
  navigation: SingUpProps;
};

const SignUp: React.FC<Props> = ({navigation}) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const validatePassword = (password: string) => {
    // Password regex pattern for validation
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordPattern.test(password);
  };

  const validateEmail = (email: string) => {
    // Regular expression pattern for email validation
    const emailPattern = /^\S+@\S+\.\S+$/;
    return emailPattern.test(email);
  };

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Validation Error', 'Please enter both email and password.');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Validation Error', 'Please enter a valid email address.');
      return;
    }

    if (!validatePassword(password)) {
      Alert.alert(
        'Validation Error',
        'Password must contain at least one uppercase letter, one lowercase letter, one special character, one numeric character, and be at least 8 characters long.',
      );
      return;
    }

    if (true) {
      navigation.navigate('Home');
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
          source={require('../Images/logo.jpg')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Sign Up</Text>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.box}
          placeholder="Enter name"
          placeholderTextColor="gray"
          value={name}
          onChangeText={text => setName(text)}
          autoCapitalize="none"
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.box}
          placeholder="Enter email"
          placeholderTextColor="gray"
          value={email}
          onChangeText={text => setEmail(text)}
          autoCapitalize="none"
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.box}
          placeholder="Enter password"
          placeholderTextColor="gray"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
        />
        <Button title="SignUp" onPress={handleLogin} color="#007AFF" />
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
    marginBottom: 20,
    padding: 10,
    color: 'black',
  },
  label: {
    marginBottom: 5,
    color: '#000000',
    fontSize: 16,
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'green',
    textAlign: 'center',
    padding: 10,
  },
});

export default SignUp;
