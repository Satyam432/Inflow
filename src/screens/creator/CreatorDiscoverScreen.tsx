import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-deck-swiper';
import { SwipeCard } from '../../components/SwipeCard';
import { useAppStore, Campaign } from '../../store';
import { apiService } from '../../services/api';

const { width, height } = Dimensions.get('window');

const CreatorDiscoverScreen: React.FC = () => {
  const { campaigns, setCampaigns, user } = useAppStore();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    loadCampaigns();
  }, []);

  const loadCampaigns = async () => {
    try {
      const fetchedCampaigns = await apiService.getCampaigns();
      setCampaigns(fetchedCampaigns);
    } catch (error) {
      console.error('Error loading campaigns:', error);
    }
  };

  const handleApply = async (campaignId: string) => {
    if (!user?.id) return;
    
    try {
      await apiService.applyCampaign(campaignId, user.id);
      // Handle success
    } catch (error) {
      console.error('Error applying to campaign:', error);
    }
  };

  if (campaigns.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Loading campaigns...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Discover Campaigns</Text>
        <Text style={styles.subtitle}>Swipe right to apply, left to pass</Text>
      </View>

      <View style={styles.swiperContainer}>
        <Swiper
          cards={campaigns}
          renderCard={(campaign: Campaign) => (
            <SwipeCard
              data={campaign}
              type="campaign"
              onApply={() => handleApply(campaign.id)}
            />
          )}
          onSwipedRight={(cardIndex) => {
            const campaign = campaigns[cardIndex];
            if (campaign) handleApply(campaign.id);
          }}
          cardIndex={currentIndex}
          backgroundColor="transparent"
          stackSize={2}
          stackSeparation={15}
          animateOverlayLabelsOpacity
          animateCardOpacity
          swipeBackCard
          onSwipedAll={() => {
            console.log('All campaigns swiped');
          }}
          onSwiped={(cardIndex) => {
            setCurrentIndex(cardIndex + 1);
          }}
          overlayLabels={{
            left: {
              title: 'PASS',
              style: {
                label: {
                  backgroundColor: '#FF6B6B',
                  color: 'white',
                  borderRadius: 10,
                  padding: 10,
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-start',
                  marginTop: 30,
                  marginLeft: -30,
                },
              },
            },
            right: {
              title: 'APPLY',
              style: {
                label: {
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  borderRadius: 10,
                  padding: 10,
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  marginTop: 30,
                  marginLeft: 30,
                },
              },
            },
          }}
        />
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
    paddingVertical: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  swiperContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
});

export default CreatorDiscoverScreen; 