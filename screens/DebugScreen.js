import React from 'react';
import { View, Text, ScrollView } from 'react-native';

export default function DebugScreen() {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 24 }}>
      <Text style={{ color: 'green', fontSize: 24, marginBottom: 16 }}>DEBUG: DebugScreen Rendered</Text>
      <Text style={{ color: 'red', fontSize: 18, marginBottom: 12, textAlign: 'center' }}>
        The tab navigator (MainTabs) did NOT load.
      </Text>
      <Text style={{ fontSize: 16, marginBottom: 8, textAlign: 'center' }}>
        This usually means there is a problem with:
      </Text>
      <Text style={{ fontSize: 16, marginBottom: 4, textAlign: 'center' }}>• Missing or incompatible dependencies (e.g. @react-navigation/bottom-tabs, @expo/vector-icons)</Text>
      <Text style={{ fontSize: 16, marginBottom: 4, textAlign: 'center' }}>• Integration issues in the navigation stack</Text>
      <Text style={{ fontSize: 16, marginBottom: 4, textAlign: 'center' }}>• A crash or error inside the tab navigator or its children</Text>
      <Text style={{ fontSize: 16, marginTop: 16, textAlign: 'center' }}>
        Try running the tab navigator (MainTabs) as the only screen in a minimal App to isolate the issue.
      </Text>
      <Text style={{ fontSize: 16, marginTop: 16, color: '#888', textAlign: 'center' }}>
        Also, check your Metro or browser console for any error messages.
      </Text>
    </ScrollView>
  );
} 