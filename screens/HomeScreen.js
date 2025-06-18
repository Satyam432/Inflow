import React from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Card, Text, Button, useTheme } from 'react-native-paper';

const HomeScreen = () => {
  const theme = useTheme();
  const campaigns = [
    {
      id: 1,
      brand: 'Nike',
      title: 'Summer Collection Campaign',
      description: 'Create content featuring Nike\'s new summer collection',
      reward: '₹10,000',
      image: 'https://example.com/nike.jpg',
    },
    {
      id: 2,
      brand: 'Samsung',
      title: 'Galaxy S24 Launch',
      description: 'Review and showcase the new Samsung Galaxy S24',
      reward: '₹15,000',
      image: 'https://example.com/samsung.jpg',
    },
    {
      id: 3,
      brand: 'Starbucks',
      title: 'New Menu Items',
      description: 'Feature Starbucks\' new seasonal menu items',
      reward: '₹8,000',
      image: 'https://example.com/starbucks.jpg',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Campaigns</Text>
      <ScrollView style={styles.campaignsContainer}>
        {campaigns.map((campaign) => (
          <Card key={campaign.id} style={styles.campaignCard}>
            <Card.Cover
              source={{ uri: campaign.image }}
              style={styles.campaignImage}
            />
            <Card.Content>
              <Text style={styles.brandName}>{campaign.brand}</Text>
              <Text style={styles.campaignTitle}>{campaign.title}</Text>
              <Text style={styles.campaignDescription}>
                {campaign.description}
              </Text>
              <Text style={[styles.reward, { color: theme.colors.primary }]}>
                Reward: {campaign.reward}
              </Text>
            </Card.Content>
            <Card.Actions>
              <Button mode="contained" onPress={() => {}}>
                Apply Now
              </Button>
            </Card.Actions>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
    paddingBottom: 10,
  },
  campaignsContainer: {
    flex: 1,
    padding: 10,
  },
  campaignCard: {
    marginBottom: 20,
    elevation: 4,
  },
  campaignImage: {
    height: 200,
  },
  brandName: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
  campaignTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  campaignDescription: {
    fontSize: 16,
    color: '#333',
    marginTop: 5,
    marginBottom: 10,
  },
  reward: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen; 