import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ErrorBoundary } from 'react-error-boundary';
import { ActivityIndicator, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MainTabs } from './navigation/MainTabs';
import { OnboardingScreen } from './screens/OnboardingScreen';
import { PhoneVerificationScreen } from './screens/PhoneVerificationScreen';
import { UserDetailsScreen } from './screens/UserDetailsScreen';
import { CategorySelectionScreen } from './screens/CategorySelectionScreen';
import { InstagramConnectScreen } from './screens/InstagramConnectScreen';
import { SubscriptionScreen } from './screens/SubscriptionScreen';
import { RootStackParamList } from './types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

function ErrorFallback({ error }: { error: Error }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: 'red' }}>Something went wrong:</Text>
      <Text>{error.message}</Text>
    </View>
  );
}

function LoadingScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#007AFF" />
    </View>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator 
            initialRouteName="Onboarding"
            screenOptions={{ 
              headerShown: false,
              animation: 'slide_from_right'
            }}
          >
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="PhoneVerification" component={PhoneVerificationScreen} />
            <Stack.Screen name="UserDetails" component={UserDetailsScreen} />
            <Stack.Screen name="CategorySelection" component={CategorySelectionScreen} />
            <Stack.Screen name="InstagramConnect" component={InstagramConnectScreen} />
            <Stack.Screen name="Subscription" component={SubscriptionScreen} />
            <Stack.Screen 
              name="MainTabs" 
              component={MainTabs}
              options={{
                gestureEnabled: false,
                animation: 'fade'
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
} 