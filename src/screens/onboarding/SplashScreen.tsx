import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withSequence 
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const SplashScreen: React.FC = () => {
  const navigation = useNavigation();
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);

  useEffect(() => {
    // Animate logo entrance
    opacity.value = withTiming(1, { duration: 1000 });
    scale.value = withSequence(
      withTiming(1.1, { duration: 500 }),
      withTiming(1, { duration: 500 })
    );

    // Navigate to role selection after animation
    const timeout = setTimeout(() => {
      navigation.navigate('RoleSelection' as never);
    }, 2500);

    return () => clearTimeout(timeout);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoContainer, animatedStyle]}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>inflo</Text>
        </View>
        <Text style={styles.tagline}>Connect • Create • Earn</Text>
      </Animated.View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>Empowering creators and brands</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF5758',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 100,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    marginBottom: 24,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF5758',
    letterSpacing: -1,
  },
  tagline: {
    fontSize: 18,
    color: 'white',
    fontWeight: '300',
    letterSpacing: 2,
  },
  footer: {
    position: 'absolute',
    bottom: 50,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '300',
  },
});

export default SplashScreen; 