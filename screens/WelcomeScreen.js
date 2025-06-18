import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Inflo</Text>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => navigation.navigate('PhoneNumber')}
        >
          I'm a Creator
        </Button>
        <Button
          mode="outlined"
          style={styles.button}
          onPress={() => {/* Handle brand flow */}}
        >
          I'm a Brand
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  buttonContainer: {
    width: '100%',
    gap: 20,
  },
  button: {
    width: '100%',
    padding: 5,
  },
});

export default WelcomeScreen; 