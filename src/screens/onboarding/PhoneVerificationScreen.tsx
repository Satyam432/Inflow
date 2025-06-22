import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useAppStore } from '../../store';
import { apiService } from '../../services/api';

const PhoneVerificationScreen: React.FC = () => {
  const navigation = useNavigation();
  const { updateUser, setLoading, isLoading } = useAppStore();
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSendOTP = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      Alert.alert('Error', 'Please enter a valid phone number');
      return;
    }

    setLoading(true);
    try {
      const response = await apiService.sendOTP(phoneNumber);
      if (response.success) {
        updateUser({ phoneNumber });
        navigation.navigate('OTPVerification' as never);
      } else {
        Alert.alert('Error', response.error || 'Failed to send OTP');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Verify your phone</Text>
        <Text style={styles.subtitle}>
          We'll send you a verification code to confirm your number
        </Text>
      </View>

      <View style={styles.form}>
        <TextInput
          mode="outlined"
          label="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          placeholder="+1 (555) 123-4567"
          style={styles.input}
          left={<TextInput.Icon icon="phone" />}
        />

        <Button
          mode="contained"
          onPress={handleSendOTP}
          loading={isLoading}
          disabled={isLoading || phoneNumber.length < 10}
          style={styles.button}
          contentStyle={styles.buttonContent}
        >
          Send Verification Code
        </Button>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          By continuing, you agree to our Terms of Service and Privacy Policy
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  form: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  input: {
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#FF5758',
  },
  buttonContent: {
    paddingVertical: 12,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  footerText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default PhoneVerificationScreen; 