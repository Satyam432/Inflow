import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Card, Chip } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppStore } from '../../store';
import { apiService } from '../../services/api';

type SubscriptionPlan = 'trial' | 'monthly' | 'yearly';

const SubscriptionScreen: React.FC = () => {
  const navigation = useNavigation();
  const { user, updateUser, setLoading, isLoading, setAuthenticated } = useAppStore();
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan>('trial');

  // Debug logging
  console.log('🔄 SubscriptionScreen render:', {
    userRole: user?.role,
    isOnboardingComplete: user?.isOnboardingComplete,
    selectedPlan,
    isLoading
  });

  const plans = [
    {
      id: 'trial',
      name: 'Free Trial',
      price: 0,
      period: '7 days',
      features: [
        'Limited campaigns access',
        'Basic analytics',
        'Community support',
        'No payment required'
      ],
      popular: false,
      color: '#6c757d',
    },
    {
      id: 'monthly',
      name: 'Monthly Plan',
      price: 29.99,
      period: 'per month',
      features: [
        'Unlimited campaigns',
        'Advanced analytics',
        'Priority support',
        'Premium features'
      ],
      popular: true,
      color: '#FF5758',
    },
    {
      id: 'yearly',
      name: 'Yearly Plan',
      price: 299.99,
      period: 'per year',
      originalPrice: 359.88,
      features: [
        'Everything in Monthly',
        'Save 17% annually',
        'Exclusive features',
        'Priority onboarding'
      ],
      popular: false,
      color: '#28a745',
    },
  ];

  const handlePlanSelection = (planId: SubscriptionPlan) => {
    setSelectedPlan(planId);
  };

  const handleContinue = async () => {
    setLoading(true);
    
    try {
      if (selectedPlan === 'trial') {
        // ✅ 1. Calculate trial expiry
        const trialExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(); // 7 days trial
        
        console.log('Starting trial activation...');
        
        // ✅ 2. Update user state with subscription details AND onboarding completion
        updateUser({ 
          subscriptionPlan: 'trial',
          subscriptionExpiry: trialExpiry,
          isOnboardingComplete: true
        });
        
        console.log('User state updated, setting authenticated...');
        
        // ✅ 3. Set authenticated immediately after user update
        setAuthenticated(true);
        setLoading(false);
        
        console.log('Authentication set, navigation should happen automatically...');
        
        // ✅ 4. Show success message after navigation occurs
        setTimeout(() => {
          Alert.alert(
            'Welcome to Inflo! 🎉',
            `Your 7-day free trial has started. ${
              user?.role === 'creator' 
                ? 'Start discovering campaigns and grow your influence!' 
                : 'Start finding creators and launch your campaigns!'
            }`,
            [
              {
                text: 'Let\'s Go!',
                onPress: () => {
                  console.log(`Trial activated for ${user?.role}: navigation complete`);
                }
              }
            ]
          );
        }, 1000);
        
      } else {
        // For paid plans - integrate with payment processing
        Alert.alert(
          'Payment Integration',
          'Payment processing would be implemented here with Stripe/Razorpay integration.',
          [
            {
              text: 'Skip for Demo',
              onPress: () => {
                // Demo: treat as successful payment
                const subscriptionExpiry = selectedPlan === 'monthly' 
                  ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days
                  : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(); // 365 days
                
                updateUser({ 
                  subscriptionPlan: selectedPlan,
                  subscriptionExpiry: subscriptionExpiry,
                  isOnboardingComplete: true
                });
                
                setAuthenticated(true);
                setLoading(false);
                
                setTimeout(() => {
                  Alert.alert(
                    'Subscription Activated! 🎉',
                    `Your ${selectedPlan} subscription is now active. Welcome to Inflo!`,
                    [
                      {
                        text: 'Start Exploring',
                        onPress: () => {
                          console.log(`Paid subscription activated for ${user?.role}`);
                        }
                      }
                    ]
                  );
                }, 1000);
              }
            },
            {
              text: 'Cancel',
              style: 'cancel',
              onPress: () => setLoading(false)
            }
          ]
        );
      }
    } catch (error) {
      console.error('Subscription error:', error);
      setLoading(false);
      Alert.alert(
        'Subscription Error',
        'Something went wrong while setting up your subscription. Please try again.',
        [
          {
            text: 'Retry',
            onPress: () => setLoading(false)
          }
        ]
      );
    }
  };

  const PlanCard = ({ plan }: { plan: typeof plans[0] }) => {
    const isSelected = selectedPlan === plan.id;
    
    return (
      <TouchableOpacity
        onPress={() => handlePlanSelection(plan.id as SubscriptionPlan)}
        style={[
          styles.planCard,
          isSelected && { borderColor: plan.color, borderWidth: 2 }
        ]}
      >
        <Card style={[styles.card, isSelected && { elevation: 8 }]}>
          <Card.Content style={styles.cardContent}>
            <View style={styles.planHeader}>
              <View style={styles.planTitleContainer}>
                <Text style={styles.planName}>{plan.name}</Text>
                {plan.popular && (
                  <Chip mode="flat" style={styles.popularChip} textStyle={styles.popularText}>
                    Most Popular
                  </Chip>
                )}
              </View>
              
              <View style={styles.priceContainer}>
                <Text style={styles.price}>
                  ${plan.price}
                  {plan.originalPrice && (
                    <Text style={styles.originalPrice}> ${plan.originalPrice}</Text>
                  )}
                </Text>
                <Text style={styles.period}>{plan.period}</Text>
              </View>
            </View>

            <View style={styles.featuresContainer}>
              {plan.features.map((feature, index) => (
                <View key={index} style={styles.feature}>
                  <MaterialCommunityIcons
                    name="check-circle"
                    size={16}
                    color={plan.color}
                  />
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>

            {isSelected && (
              <View style={styles.selectedIndicator}>
                <MaterialCommunityIcons
                  name="check-circle"
                  size={24}
                  color={plan.color}
                />
              </View>
            )}
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Choose your plan</Text>
          <Text style={styles.subtitle}>
            Start with a free trial, upgrade anytime
          </Text>
        </View>

        <View style={styles.plansContainer}>
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </View>

        <View style={styles.actionContainer}>
          <Button
            mode="contained"
            onPress={handleContinue}
            loading={isLoading}
            disabled={isLoading}
            style={[styles.continueButton, { backgroundColor: plans.find(p => p.id === selectedPlan)?.color }]}
            contentStyle={styles.buttonContent}
          >
            {selectedPlan === 'trial' ? 'Start Free Trial' : 'Continue to Payment'}
          </Button>

          <Text style={styles.disclaimer}>
            {selectedPlan === 'trial' 
              ? 'No credit card required for free trial'
              : 'Cancel anytime. No hidden fees.'
            }
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 24,
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
  plansContainer: {
    paddingHorizontal: 24,
    gap: 16,
  },
  planCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  card: {
    borderRadius: 16,
  },
  cardContent: {
    padding: 20,
  },
  planHeader: {
    marginBottom: 20,
  },
  planTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  planName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  popularChip: {
    backgroundColor: '#FF5758',
    height: 24,
  },
  popularText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  originalPrice: {
    fontSize: 16,
    textDecorationLine: 'line-through',
    color: '#999',
  },
  period: {
    fontSize: 14,
    color: '#666',
  },
  featuresContainer: {
    gap: 12,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureText: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  selectedIndicator: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  actionContainer: {
    paddingHorizontal: 24,
    paddingVertical: 32,
    alignItems: 'center',
  },
  continueButton: {
    width: '100%',
    marginBottom: 16,
  },
  buttonContent: {
    paddingVertical: 12,
  },
  disclaimer: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default SubscriptionScreen; 