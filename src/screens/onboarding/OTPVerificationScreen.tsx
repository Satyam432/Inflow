import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useAppStore } from '../../store';
import { apiService } from '../../services/api';

const OTPVerificationScreen: React.FC = () => {
  const navigation = useNavigation();
  const { user, updateUser, setLoading, isLoading } = useAppStore();
  const [otp, setOtp] = useState('');
  const [resendTimer, setResendTimer] = useState(30);

  useEffect(() => {
    const timer = setInterval(() => {
      setResendTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 4) {
      Alert.alert('Error', 'Please enter the 4-digit verification code');
      return;
    }

    setLoading(true);
    try {
      const response = await apiService.verifyOTP(user?.phoneNumber || '', otp);
      if (response.success) {
        navigation.navigate('ProfileSetup' as never);
      } else {
        Alert.alert('Error', response.error || 'Invalid verification code');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (resendTimer > 0) return;

    setLoading(true);
    try {
      const response = await apiService.sendOTP(user?.phoneNumber || '');
      if (response.success) {
        setResendTimer(30);
        Alert.alert('Success', 'Verification code sent again');
      } else {
        Alert.alert('Error', response.error || 'Failed to resend code');
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
        <Text style={styles.title}>Enter verification code</Text>
        <Text style={styles.subtitle}>
          We sent a 4-digit code to {user?.phoneNumber}
        </Text>
        <Text style={styles.hint}>
          Use code: 1234 for testing
        </Text>
      </View>

      <View style={styles.form}>
        <TextInput
          mode="outlined"
          label="Verification Code"
          value={otp}
          onChangeText={setOtp}
          keyboardType="number-pad"
          maxLength={4}
          style={styles.input}
          textAlign="center"
          autoFocus
        />

        <Button
          mode="contained"
          onPress={handleVerifyOTP}
          loading={isLoading}
          disabled={isLoading || otp.length !== 4}
          style={styles.button}
          contentStyle={styles.buttonContent}
        >
          Verify Code
        </Button>

        <Button
          mode="text"
          onPress={handleResendOTP}
          disabled={resendTimer > 0 || isLoading}
          style={styles.resendButton}
        >
          {resendTimer > 0 ? `Resend code in ${resendTimer}s` : 'Resend code'}
        </Button>
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
    marginBottom: 8,
  },
  hint: {
    fontSize: 14,
    color: '#FF5758',
    fontWeight: '500',
  },
  form: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  input: {
    marginBottom: 24,
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 8,
  },
  button: {
    backgroundColor: '#FF5758',
    marginBottom: 16,
  },
  buttonContent: {
    paddingVertical: 12,
  },
  resendButton: {
    alignSelf: 'center',
  },
});

export default OTPVerificationScreen; 