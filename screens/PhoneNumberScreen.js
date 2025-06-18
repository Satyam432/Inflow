import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, HelperText, Snackbar } from 'react-native-paper';

const PhoneNumberScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);

  const isValidPhone = (num) => /^\d{10}$/.test(num);

  const handleSubmit = () => {
    if (!isValidPhone(phoneNumber)) {
      setError('Please enter a valid 10-digit phone number.');
      setShowSnackbar(true);
      return;
    }
    setError('');
    navigation.navigate('OTP', { phoneNumber });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter your phone number</Text>
      <TextInput
        mode="outlined"
        label="Phone Number"
        value={phoneNumber}
        onChangeText={text => {
          setPhoneNumber(text.replace(/[^0-9]/g, ''));
          if (error) setError('');
        }}
        keyboardType="phone-pad"
        style={styles.input}
        placeholder="Enter your phone number"
        maxLength={10}
        error={!!error}
      />
      <HelperText type={error ? 'error' : 'info'} visible={!!error || phoneNumber.length > 0}>
        {error || 'We will send you an OTP to verify your number.'}
      </HelperText>
      <Button
        mode="contained"
        onPress={handleSubmit}
        style={styles.button}
        disabled={!isValidPhone(phoneNumber)}
      >
        Continue
      </Button>
      <Snackbar
        visible={showSnackbar}
        onDismiss={() => setShowSnackbar(false)}
        duration={2000}
        style={{ backgroundColor: '#FF5758' }}
      >
        {error}
      </Snackbar>
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
    marginBottom: 20,
  },
  input: {
    marginBottom: 4,
  },
  button: {
    marginTop: 10,
  },
});

export default PhoneNumberScreen; 