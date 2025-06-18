import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { theme } from './theme';
import WelcomeScreen from './screens/WelcomeScreen';
import PhoneNumberScreen from './screens/PhoneNumberScreen';
import OTPScreen from './screens/OTPScreen';
import UserDetailsScreen from './screens/UserDetailsScreen';
import CategoriesScreen from './screens/CategoriesScreen';
import InstagramConnectScreen from './screens/InstagramConnectScreen';
import AccountInfoScreen from './screens/AccountInfoScreen';
import TrialPackagesScreen from './screens/TrialPackagesScreen';
import HomeScreen from './screens/HomeScreen';
import MainTabs from './screens/MainTabs';
import DebugScreen from './screens/DebugScreen';
import 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Welcome"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#FF5758',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen 
            name="Welcome" 
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="PhoneNumber" 
            component={PhoneNumberScreen}
            options={{ title: 'Enter Phone Number' }}
          />
          <Stack.Screen 
            name="OTP" 
            component={OTPScreen}
            options={{ title: 'Verify OTP' }}
          />
          <Stack.Screen 
            name="UserDetails" 
            component={UserDetailsScreen}
            options={{ title: 'Let\'s Get Started' }}
          />
          <Stack.Screen 
            name="Categories" 
            component={CategoriesScreen}
            options={{ title: 'Select Categories' }}
          />
          <Stack.Screen 
            name="InstagramConnect" 
            component={InstagramConnectScreen}
            options={{ title: 'Connect Instagram' }}
          />
          <Stack.Screen 
            name="AccountInfo" 
            component={AccountInfoScreen}
            options={{ title: 'Account Information' }}
          />
          <Stack.Screen 
            name="TrialPackages" 
            component={TrialPackagesScreen}
            options={{ title: 'Choose Package' }}
          />
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{ 
              title: 'Home',
              headerLeft: () => null,
            }}
          />
          <Stack.Screen 
            name="MainTabs" 
            component={MainTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="DebugScreen" 
            component={DebugScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
} 