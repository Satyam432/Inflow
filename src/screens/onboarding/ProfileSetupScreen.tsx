import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput, Button, SegmentedButtons } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useAppStore } from '../../store';
import { apiService } from '../../services/api';

const ProfileSetupScreen: React.FC = () => {
  const navigation = useNavigation();
  const { user, setUser, setLoading, isLoading } = useAppStore();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dateOfBirth: '',
    category: '',
    instagramLink: '',
    address: '',
    brandName: '',
    brandLogo: '',
  });

  const categories = user?.role === 'creator' 
    ? ['Fashion', 'Technology', 'Fitness', 'Food', 'Travel', 'Lifestyle']
    : ['Fashion', 'Technology', 'Beauty', 'Food & Beverage', 'Automotive', 'Health'];

  const handleCategoryChange = (category: string) => {
    setFormData(prev => ({ ...prev, category }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.category) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (user?.role === 'creator' && !formData.instagramLink) {
      Alert.alert('Error', 'Instagram link is required for creators');
      return;
    }

    if (user?.role === 'brand' && !formData.brandName) {
      Alert.alert('Error', 'Brand name is required');
      return;
    }

    setLoading(true);
    try {
      const userData = {
        ...user,
        ...formData,
      };

      const response = await apiService.createUser(userData);
      if (response.success && response.user) {
        setUser(response.user);
        navigation.navigate('Subscription' as never);
      } else {
        Alert.alert('Error', response.error || 'Failed to create profile');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Complete your profile</Text>
          <Text style={styles.subtitle}>
            {user?.role === 'creator' 
              ? 'Tell brands about yourself' 
              : 'Set up your brand profile'
            }
          </Text>
        </View>

        <View style={styles.form}>
          <TextInput
            mode="outlined"
            label={user?.role === 'creator' ? 'Full Name *' : 'Contact Person Name *'}
            value={formData.name}
            onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
            style={styles.input}
          />

          <TextInput
            mode="outlined"
            label="Email Address *"
            value={formData.email}
            onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />

          {user?.role === 'creator' && (
            <>
              <TextInput
                mode="outlined"
                label="Date of Birth"
                value={formData.dateOfBirth}
                onChangeText={(text) => setFormData(prev => ({ ...prev, dateOfBirth: text }))}
                placeholder="YYYY-MM-DD"
                style={styles.input}
              />

              <TextInput
                mode="outlined"
                label="Instagram Profile *"
                value={formData.instagramLink}
                onChangeText={(text) => setFormData(prev => ({ ...prev, instagramLink: text }))}
                placeholder="@yourusername"
                autoCapitalize="none"
                style={styles.input}
              />
            </>
          )}

          {user?.role === 'brand' && (
            <TextInput
              mode="outlined"
              label="Brand Name *"
              value={formData.brandName}
              onChangeText={(text) => setFormData(prev => ({ ...prev, brandName: text }))}
              style={styles.input}
            />
          )}

          <Text style={styles.sectionTitle}>
            {user?.role === 'creator' ? 'Content Category *' : 'Industry *'}
          </Text>
          
          <View style={styles.categoryContainer}>
            {categories.map((category) => (
              <Button
                key={category}
                mode={formData.category === category ? 'contained' : 'outlined'}
                onPress={() => handleCategoryChange(category)}
                style={[
                  styles.categoryButton,
                  formData.category === category && styles.selectedCategory
                ]}
                labelStyle={styles.categoryLabel}
              >
                {category}
              </Button>
            ))}
          </View>

          <TextInput
            mode="outlined"
            label="Address"
            value={formData.address}
            onChangeText={(text) => setFormData(prev => ({ ...prev, address: text }))}
            multiline
            numberOfLines={3}
            style={styles.input}
          />

          <Button
            mode="contained"
            onPress={handleSubmit}
            loading={isLoading}
            disabled={isLoading}
            style={styles.submitButton}
            contentStyle={styles.buttonContent}
          >
            Continue
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 24,
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
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  input: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
    marginTop: 8,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  categoryButton: {
    borderRadius: 20,
    marginBottom: 8,
  },
  selectedCategory: {
    backgroundColor: '#FF5758',
  },
  categoryLabel: {
    fontSize: 12,
    paddingHorizontal: 4,
  },
  submitButton: {
    backgroundColor: '#FF5758',
    marginTop: 24,
  },
  buttonContent: {
    paddingVertical: 12,
  },
});

export default ProfileSetupScreen; 