import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Button, Text } from 'react-native-paper';

const InstagramConnectScreen = ({ navigation }) => {
  const handleConnect = () => {
    // Here you would typically implement Instagram OAuth
    // For now, we'll just show a success message and navigate
    alert('Instagram connected successfully!');
    navigation.navigate('AccountInfo');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connect Your Instagram</Text>
      <Text style={styles.subtitle}>
        Connect your Instagram account to get started with Inflo
      </Text>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: 'https://www.instagram.com/static/images/ico/favicon-200.png/ab6eff595bb1.png' }}
          style={styles.instagramIcon}
        />
      </View>
      <Button
        mode="contained"
        onPress={handleConnect}
        style={styles.button}
        icon="instagram"
      >
        Connect Instagram
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  imageContainer: {
    marginVertical: 40,
  },
  instagramIcon: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  button: {
    width: '100%',
    marginTop: 20,
  },
});

export default InstagramConnectScreen; 