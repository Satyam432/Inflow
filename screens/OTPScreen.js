import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';

const OTPScreen = ({ navigation, route }) => {
  const [otp, setOtp] = useState('');
  const { phoneNumber } = route.params;

  const handleVerify = () => {
    // Hardcoded OTP verification
    if (otp === '222222') {
      navigation.navigate('UserDetails');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify OTP</Text>
      <Text style={styles.subtitle}>
        Enter the OTP sent to {phoneNumber}
      </Text>
      <TextInput
        mode="outlined"
        label="OTP"
        value={otp}
        onChangeText={setOtp}
        keyboardType="number-pad"
        style={styles.input}
        maxLength={6}
        placeholder="Enter 6-digit OTP"
      />
      <Button
        mode="contained"
        onPress={handleVerify}
        style={styles.button}
        disabled={otp.length !== 6}
      >
        Verify OTP
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  input: {
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
  },
});

export default OTPScreen; 