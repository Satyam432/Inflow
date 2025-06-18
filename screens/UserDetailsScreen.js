import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';

const UserDetailsScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');

  const handleSubmit = () => {
    if (firstName && lastName && dob) {
      navigation.navigate('Categories');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Let's Get Started</Text>
      <TextInput
        mode="outlined"
        label="First Name"
        value={firstName}
        onChangeText={setFirstName}
        style={styles.input}
      />
      <TextInput
        mode="outlined"
        label="Last Name"
        value={lastName}
        onChangeText={setLastName}
        style={styles.input}
      />
      <TextInput
        mode="outlined"
        label="Date of Birth"
        value={dob}
        onChangeText={setDob}
        style={styles.input}
        placeholder="DD/MM/YYYY"
      />
      <Button
        mode="contained"
        onPress={handleSubmit}
        style={styles.button}
        disabled={!firstName || !lastName || !dob}
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
    marginBottom: 20,
  },
});

export default UserDetailsScreen; 