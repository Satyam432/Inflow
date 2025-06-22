import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ErrorBoundary } from 'react-error-boundary';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { AppNavigator } from './src/navigation/AppNavigator';
import { useAppStore } from './src/store';
import { theme } from './theme';

function ErrorFallback({ error }: { error: Error }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ color: 'red', fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>
        Something went wrong:
      </Text>
      <Text style={{ color: '#333', textAlign: 'center' }}>{error.message}</Text>
    </View>
  );
}

function AppWithReset() {
  const { clearAllData, isAuthenticated, user } = useAppStore();

  return (
    <>
      {/* Reset button for testing - appears when user is authenticated */}
      {(isAuthenticated && user?.isOnboardingComplete) && (
        <View style={{ 
          position: 'absolute', 
          top: 50, 
          right: 20, 
          zIndex: 1000, 
          backgroundColor: 'rgba(255, 87, 88, 0.9)', 
          borderRadius: 12,
          padding: 12,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}>
          <Button 
            mode="contained" 
            onPress={() => {
              console.log('🔄 Resetting app to show onboarding...');
              clearAllData();
            }}
            style={{ backgroundColor: '#FF5758' }}
            labelStyle={{ fontSize: 12, color: 'white', fontWeight: 'bold' }}
            icon="refresh"
            compact
          >
            Reset to Onboarding
          </Button>
        </View>
      )}
      <AppNavigator />
    </>
  );
}

export default function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <PaperProvider theme={theme}>
        <SafeAreaProvider>
          <AppWithReset />
        </SafeAreaProvider>
      </PaperProvider>
    </ErrorBoundary>
  );
} 