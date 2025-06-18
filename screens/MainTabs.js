import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomeScreen from './HomeScreen';
import { View, Text } from 'react-native';

function MessagesScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Messages (Coming Soon)</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile (Coming Soon)</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <>
      <Text style={{textAlign: 'center', marginTop: 40, color: 'red'}}>DEBUG: MainTabs Rendered</Text>
      <Tab.Navigator
        initialRouteName="Campaigns"
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: '#FF5758',
          tabBarInactiveTintColor: '#888',
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Campaigns') {
              iconName = 'bullhorn';
            } else if (route.name === 'Messages') {
              iconName = 'message-text-outline';
            } else if (route.name === 'Profile') {
              iconName = 'account-circle-outline';
            }
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Campaigns" component={HomeScreen} />
        <Tab.Screen name="Messages" component={MessagesScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </>
  );
} 