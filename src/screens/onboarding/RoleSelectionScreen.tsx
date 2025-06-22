import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppStore, UserRole } from '../../store';

const { width, height } = Dimensions.get('window');

const RoleSelectionScreen: React.FC = () => {
  const navigation = useNavigation();
  const { updateUser } = useAppStore();

  const handleRoleSelection = (role: UserRole) => {
    updateUser({ role });
    navigation.navigate('PhoneVerification' as never);
  };

  const RoleCard = ({ 
    role, 
    title, 
    subtitle, 
    icon, 
    features, 
    gradient 
  }: {
    role: UserRole;
    title: string;
    subtitle: string;
    icon: string;
    features: string[];
    gradient: string[];
  }) => (
    <TouchableOpacity
      style={[styles.roleCard, { backgroundColor: gradient[0] }]}
      onPress={() => handleRoleSelection(role)}
      activeOpacity={0.8}
    >
      <View style={styles.roleHeader}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons 
            name={icon as any} 
            size={40} 
            color="white" 
          />
        </View>
        <View style={styles.roleInfo}>
          <Text style={styles.roleTitle}>{title}</Text>
          <Text style={styles.roleSubtitle}>{subtitle}</Text>
        </View>
      </View>
      
      <View style={styles.featuresContainer}>
        {features.map((feature, index) => (
          <View key={index} style={styles.featureRow}>
            <MaterialCommunityIcons 
              name="check-circle" 
              size={16} 
              color="rgba(255, 255, 255, 0.8)" 
            />
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
      </View>
      
      <View style={styles.arrowContainer}>
        <MaterialCommunityIcons 
          name="arrow-right" 
          size={24} 
          color="white" 
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to Inflo</Text>
        <Text style={styles.subtitle}>
          Choose your path to start your journey
        </Text>
      </View>

      <View style={styles.rolesContainer}>
        <RoleCard
          role="creator"
          title="I'm a Creator"
          subtitle="Monetize your influence"
          icon="account-star"
          features={[
            'Discover brand campaigns',
            'Apply to exciting projects',
            'Earn through affiliate marketing',
            'Build your creator portfolio'
          ]}
          gradient={['#FF6B6B', '#4ECDC4']}
        />

        <RoleCard
          role="brand"
          title="I'm a Brand"
          subtitle="Find perfect creators"
          icon="office-building"
          features={[
            'Create marketing campaigns',
            'Discover talented creators',
            'Manage collaborations',
            'Track campaign performance'
          ]}
          gradient={['#667eea', '#764ba2']}
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Don't worry, you can always change this later
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  rolesContainer: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    gap: 20,
  },
  roleCard: {
    borderRadius: 20,
    padding: 24,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    minHeight: 180,
  },
  roleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  roleInfo: {
    flex: 1,
  },
  roleTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  roleSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  featuresContainer: {
    flex: 1,
    gap: 8,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  featureText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    flex: 1,
  },
  arrowContainer: {
    alignSelf: 'flex-end',
    marginTop: 16,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});

export default RoleSelectionScreen; 