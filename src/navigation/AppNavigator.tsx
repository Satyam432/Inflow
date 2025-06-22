import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useAppStore } from '../store';

// Onboarding Screens
import SplashScreen from '../screens/onboarding/SplashScreen';
import RoleSelectionScreen from '../screens/onboarding/RoleSelectionScreen';
import PhoneVerificationScreen from '../screens/onboarding/PhoneVerificationScreen';
import OTPVerificationScreen from '../screens/onboarding/OTPVerificationScreen';
import ProfileSetupScreen from '../screens/onboarding/ProfileSetupScreen';
import SubscriptionScreen from '../screens/onboarding/SubscriptionScreen';

// Creator Screens
import CreatorDiscoverScreen from '../screens/creator/CreatorDiscoverScreen';
import CampaignDetailsScreen from '../screens/creator/CampaignDetailsScreen';
import CreatorDashboardScreen from '../screens/creator/CreatorDashboardScreen';
import ContentSubmissionScreen from '../screens/creator/ContentSubmissionScreen';

// Brand Screens
import BrandDiscoverScreen from '../screens/brand/BrandDiscoverScreen';
import CreateCampaignScreen from '../screens/brand/CreateCampaignScreen';
import BrandDashboardScreen from '../screens/brand/BrandDashboardScreen';
import CreatorDetailsScreen from '../screens/brand/CreatorDetailsScreen';
import CampaignManagementScreen from '../screens/brand/CampaignManagementScreen';

// Shared Screens
import ProfileScreen from '../screens/shared/ProfileScreen';
import NotificationsScreen from '../screens/shared/NotificationsScreen';
import PaymentHistoryScreen from '../screens/shared/PaymentHistoryScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Creator Tab Navigator
const CreatorTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          if (route.name === 'Discover') {
            iconName = focused ? 'cards' : 'cards-outline';
          } else if (route.name === 'Dashboard') {
            iconName = focused ? 'view-dashboard' : 'view-dashboard-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'account' : 'account-outline';
          } else {
            iconName = 'help';
          }

          return <MaterialCommunityIcons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FF5758',
        tabBarInactiveTintColor: '#999',
        headerShown: false,
        tabBarStyle: {
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
      })}
    >
      <Tab.Screen 
        name="Discover" 
        component={CreatorDiscoverScreen}
        options={{ tabBarLabel: 'Campaigns' }}
      />
      <Tab.Screen 
        name="Dashboard" 
        component={CreatorDashboardScreen}
        options={{ tabBarLabel: 'My Work' }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ tabBarLabel: 'Profile' }}
      />
    </Tab.Navigator>
  );
};

// Brand Tab Navigator
const BrandTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          if (route.name === 'Discover') {
            iconName = focused ? 'account-search' : 'account-search-outline';
          } else if (route.name === 'Campaigns') {
            iconName = focused ? 'bullhorn' : 'bullhorn-outline';
          } else if (route.name === 'Dashboard') {
            iconName = focused ? 'view-dashboard' : 'view-dashboard-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'account' : 'account-outline';
          } else {
            iconName = 'help';
          }

          return <MaterialCommunityIcons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FF5758',
        tabBarInactiveTintColor: '#999',
        headerShown: false,
        tabBarStyle: {
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
      })}
    >
      <Tab.Screen 
        name="Discover" 
        component={BrandDiscoverScreen}
        options={{ tabBarLabel: 'Creators' }}
      />
      <Tab.Screen 
        name="Campaigns" 
        component={CreateCampaignScreen}
        options={{ tabBarLabel: 'Create' }}
      />
      <Tab.Screen 
        name="Dashboard" 
        component={BrandDashboardScreen}
        options={{ tabBarLabel: 'Manage' }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ tabBarLabel: 'Profile' }}
      />
    </Tab.Navigator>
  );
};

// Auth Stack Navigator
const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
      <Stack.Screen name="PhoneVerification" component={PhoneVerificationScreen} />
      <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />
      <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
      <Stack.Screen name="Subscription" component={SubscriptionScreen} />
    </Stack.Navigator>
  );
};

// Main App Stack Navigator
const AppStack = () => {
  const { user } = useAppStore();
  
  const MainTabs = user?.role === 'creator' ? CreatorTabs : BrandTabs;

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="MainTabs" component={MainTabs} />
      
      {/* Shared Modal Screens */}
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="PaymentHistory" component={PaymentHistoryScreen} />
      </Stack.Group>
      
      {/* Creator-specific screens */}
      {user?.role === 'creator' && (
        <Stack.Group>
          <Stack.Screen name="CampaignDetails" component={CampaignDetailsScreen} />
          <Stack.Screen name="ContentSubmission" component={ContentSubmissionScreen} />
        </Stack.Group>
      )}
      
      {/* Brand-specific screens */}
      {user?.role === 'brand' && (
        <Stack.Group>
          <Stack.Screen name="CreatorDetails" component={CreatorDetailsScreen} />
          <Stack.Screen name="CampaignManagement" component={CampaignManagementScreen} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

// Main App Navigator
export const AppNavigator: React.FC = () => {
  const { isAuthenticated, user } = useAppStore();

  // Enhanced debug logging
  const shouldShowMainApp = isAuthenticated && user?.isOnboardingComplete;
  
  console.log('🚀 AppNavigator render:', {
    isAuthenticated,
    userRole: user?.role,
    isOnboardingComplete: user?.isOnboardingComplete,
    subscriptionPlan: user?.subscriptionPlan,
    userId: user?.id,
    shouldShowMainApp,
    timestamp: new Date().toISOString()
  });

  return (
    <NavigationContainer>
      {!shouldShowMainApp ? (
        <AuthStack />
      ) : (
        <AppStack />
      )}
    </NavigationContainer>
  );
}; 