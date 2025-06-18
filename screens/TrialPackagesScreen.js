import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Button, Text, useTheme } from 'react-native-paper';

const TrialPackagesScreen = ({ navigation }) => {
  const theme = useTheme();
  const packages = [
    {
      id: 1,
      title: 'Basic Package',
      price: '₹999',
      duration: '3 months',
      features: [
        'Access to basic campaigns',
        'Standard support',
        'Basic analytics',
      ],
    },
    {
      id: 2,
      title: 'Premium Package',
      price: '₹1999',
      duration: '6 months',
      features: [
        'Access to all campaigns',
        'Priority support',
        'Advanced analytics',
        'Exclusive brand deals',
      ],
    },
  ];

  const handleSubscribe = (packageId) => {
    // Here you would typically handle subscription
    navigation.reset({ index: 0, routes: [{ name: 'DebugScreen' }] });
  };

  const handleSkip = () => {
    navigation.reset({ index: 0, routes: [{ name: 'DebugScreen' }] });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Package</Text>
      <ScrollView style={styles.packagesContainer}>
        {packages.map((pkg) => (
          <Card key={pkg.id} style={styles.packageCard}>
            <Card.Content>
              <Text style={styles.packageTitle}>{pkg.title}</Text>
              <Text style={[styles.packagePrice, { color: theme.colors.primary }]}>
                {pkg.price}
              </Text>
              <Text style={styles.packageDuration}>{pkg.duration}</Text>
              <View style={styles.featuresContainer}>
                {pkg.features.map((feature, index) => (
                  <Text key={index} style={styles.feature}>
                    • {feature}
                  </Text>
                ))}
              </View>
            </Card.Content>
            <Card.Actions>
              <Button
                mode="contained"
                onPress={() => handleSubscribe(pkg.id)}
                style={styles.subscribeButton}
              >
                Subscribe
              </Button>
            </Card.Actions>
          </Card>
        ))}
      </ScrollView>
      <Button
        mode="outlined"
        onPress={handleSkip}
        style={styles.skipButton}
      >
        Skip for now
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  packagesContainer: {
    flex: 1,
  },
  packageCard: {
    marginBottom: 20,
    elevation: 4,
  },
  packageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  packagePrice: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  packageDuration: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  featuresContainer: {
    marginTop: 10,
  },
  feature: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  subscribeButton: {
    marginTop: 10,
  },
  skipButton: {
    marginTop: 20,
  },
});

export default TrialPackagesScreen; 