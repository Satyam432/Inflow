import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, Text, Chip } from 'react-native-paper';

const categories = [
  'Lifestyle',
  'Beauty',
  'Fashion',
  'Food',
  'Travel',
  'Fitness',
  'Technology',
  'Art',
  'Music',
];

const CategoriesScreen = ({ navigation }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else if (selectedCategories.length < 3) {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleContinue = () => {
    if (selectedCategories.length > 0) {
      navigation.navigate('InstagramConnect');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Categories</Text>
      <Text style={styles.subtitle}>Choose up to 3 categories</Text>
      <ScrollView style={styles.categoriesContainer}>
        <View style={styles.chipContainer}>
          {categories.map((category) => (
            <Chip
              key={category}
              selected={selectedCategories.includes(category)}
              onPress={() => toggleCategory(category)}
              style={styles.chip}
              mode={selectedCategories.includes(category) ? 'flat' : 'outlined'}
            >
              {category}
            </Chip>
          ))}
        </View>
      </ScrollView>
      <Button
        mode="contained"
        onPress={handleContinue}
        style={styles.button}
        disabled={selectedCategories.length === 0}
      >
        Continue
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
  categoriesContainer: {
    flex: 1,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    margin: 4,
  },
  button: {
    marginTop: 20,
  },
});

export default CategoriesScreen; 