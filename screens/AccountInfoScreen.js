import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';

const AccountInfoScreen = ({ navigation }) => {
  const [bankDetails, setBankDetails] = useState({
    accountNumber: '',
    ifscCode: '',
    accountHolderName: '',
  });

  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    pincode: '',
  });

  const handleSubmit = () => {
    // Here you would typically save the data
    navigation.navigate('TrialPackages');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Account Information</Text>
      
      <Text style={styles.sectionTitle}>Bank Details</Text>
      <TextInput
        mode="outlined"
        label="Account Number"
        value={bankDetails.accountNumber}
        onChangeText={(text) => setBankDetails({ ...bankDetails, accountNumber: text })}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        mode="outlined"
        label="IFSC Code"
        value={bankDetails.ifscCode}
        onChangeText={(text) => setBankDetails({ ...bankDetails, ifscCode: text })}
        style={styles.input}
        autoCapitalize="characters"
      />
      <TextInput
        mode="outlined"
        label="Account Holder Name"
        value={bankDetails.accountHolderName}
        onChangeText={(text) => setBankDetails({ ...bankDetails, accountHolderName: text })}
        style={styles.input}
      />

      <Text style={styles.sectionTitle}>Delivery Address</Text>
      <TextInput
        mode="outlined"
        label="Street Address"
        value={address.street}
        onChangeText={(text) => setAddress({ ...address, street: text })}
        style={styles.input}
      />
      <TextInput
        mode="outlined"
        label="City"
        value={address.city}
        onChangeText={(text) => setAddress({ ...address, city: text })}
        style={styles.input}
      />
      <TextInput
        mode="outlined"
        label="State"
        value={address.state}
        onChangeText={(text) => setAddress({ ...address, state: text })}
        style={styles.input}
      />
      <TextInput
        mode="outlined"
        label="Pincode"
        value={address.pincode}
        onChangeText={(text) => setAddress({ ...address, pincode: text })}
        style={styles.input}
        keyboardType="numeric"
      />

      <Button
        mode="contained"
        onPress={handleSubmit}
        style={styles.button}
      >
        Continue
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 20,
    marginBottom: 30,
  },
});

export default AccountInfoScreen; 