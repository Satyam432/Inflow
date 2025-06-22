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

function AppWithDebug() {
  const { clearAllData, isAuthenticated, user } = useAppStore();

  return (
    <>
      {/* Debug button - remove in production */}
      {(isAuthenticated && user?.isOnboardingComplete) && (
        <View style={{ 
          position: 'absolute', 
          top: 50, 
          right: 20, 
          zIndex: 1000, 
          backgroundColor: 'rgba(0,0,0,0.8)', 
          borderRadius: 8,
          padding: 8 
        }}>
          <Button 
            mode="contained" 
            onPress={clearAllData}
            style={{ backgroundColor: '#FF5758' }}
            labelStyle={{ fontSize: 10 }}
          >
            Reset App
          </Button>
        </View>
      )}
      <AppNavigator />
    </>
  );
}

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <SafeAreaProvider>
          <AppWithDebug />
        </SafeAreaProvider>
      </ErrorBoundary>
    </PaperProvider>
  );
} 