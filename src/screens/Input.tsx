import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

interface InputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  error?: string;
}


const Input: React.FC<InputProps> = ({ label, value, onChangeText, placeholder='', secureTextEntry = false, error }) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.box}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    height: 40,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    color: 'black',
    borderRadius: 10,
  },
  label: {
    marginBottom: 5,
    color: '#000000',
    fontSize: 12,
    fontFamily: "Work Sans",
  },
  error: {
    color: 'red',
    fontSize: 12,
    fontFamily: "Work Sans",
    marginBottom: 5,
    textAlign: 'left',
    paddingBottom: 10,
  },
});

export default Input;
