import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Chip, Searchbar } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Swiper from 'react-native-deck-swiper';
import { SwipeCard } from '../../components/SwipeCard';
import { useAppStore, Campaign } from '../../store';
import { apiService } from '../../services/api';

const { width, height } = Dimensions.get('window');

const CreatorDiscoverScreen: React.FC = () => {
  const { campaigns, setCampaigns, user } = useAppStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const categories = ['All', 'Fashion', 'Technology', 'Fitness', 'Food', 'Travel', 'Lifestyle'];

  useEffect(() => {
    loadCampaigns();
  }, [selectedCategory]);

  const loadCampaigns = async () => {
    setIsLoading(true);
    try {
      const fetchedCampaigns = await apiService.getCampaigns({
        status: 'active',
        creatorRelevant: true,
        category: selectedCategory === 'All' || selectedCategory === '' ? undefined : selectedCategory
      });
      setCampaigns(fetchedCampaigns);
    } catch (error) {
      console.error('Error loading campaigns:', error);
      Alert.alert('Error', 'Failed to load campaigns. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleApply = async (campaignId: string, campaignTitle: string) => {
    if (!user?.id) return;
    
    try {
      Alert.alert(
        'Apply to Campaign',
        `Do you want to apply to "${campaignTitle}"?`,
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Apply',
            onPress: async () => {
              const response = await apiService.applyCampaign(campaignId, user.id);
              if (response.success) {
                Alert.alert(
                  'Success! 🎉',
                  'Your application has been submitted. The brand will review it shortly.',
                  [{ text: 'Great!', style: 'default' }]
                );
              } else {
                Alert.alert('Error', 'Failed to apply. Please try again.');
              }
            },
          },
        ]
      );
    } catch (error) {
      console.error('Error applying to campaign:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  const handleSkip = (campaignTitle: string) => {
    console.log(`Skipped campaign: ${campaignTitle}`);
    // You can track skipped campaigns for analytics
  };

  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    campaign.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Finding perfect campaigns for you...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (filteredCampaigns.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Discover Campaigns</Text>
          <Searchbar
            placeholder="Search campaigns..."
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.searchbar}
          />
        </View>
        <View style={styles.emptyContainer}>
          <MaterialCommunityIcons name="inbox-outline" size={64} color="#ccc" />
          <Text style={styles.emptyText}>No campaigns found</Text>
          <Text style={styles.emptySubtext}>Try adjusting your filters or check back later</Text>
          <Button mode="contained" onPress={loadCampaigns} style={styles.retryButton}>
            Refresh
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Discover Campaigns</Text>
        <Text style={styles.subtitle}>Swipe right to apply, left to skip</Text>
        
        <Searchbar
          placeholder="Search campaigns..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
        />

        <View style={styles.categoryContainer}>
          {categories.map((category) => (
            <Chip
              key={category}
              mode={selectedCategory === category ? 'flat' : 'outlined'}
              selected={selectedCategory === category}
              onPress={() => setSelectedCategory(category === 'All' ? '' : category)}
              style={[
                styles.categoryChip,
                selectedCategory === category && styles.selectedChip
              ]}
              textStyle={selectedCategory === category ? styles.selectedChipText : styles.chipText}
            >
              {category}
            </Chip>
          ))}
        </View>
      </View>

      <View style={styles.swiperContainer}>
        <Swiper
          cards={filteredCampaigns}
          renderCard={(campaign: Campaign) => (
            <SwipeCard
              data={campaign}
              type="campaign"
              onApply={() => handleApply(campaign.id, campaign.title)}
              onPass={() => handleSkip(campaign.title)}
            />
          )}
          onSwipedRight={(cardIndex) => {
            const campaign = filteredCampaigns[cardIndex];
            if (campaign) handleApply(campaign.id, campaign.title);
          }}
          onSwipedLeft={(cardIndex) => {
            const campaign = filteredCampaigns[cardIndex];
            if (campaign) handleSkip(campaign.title);
          }}
          cardIndex={currentIndex}
          backgroundColor="transparent"
          stackSize={3}
          stackSeparation={15}
          animateOverlayLabelsOpacity
          animateCardOpacity
          swipeBackCard
          onSwipedAll={() => {
            Alert.alert(
              'All Done! 🎉',
              'You\'ve reviewed all available campaigns. New ones will appear here regularly.',
              [
                {
                  text: 'Refresh',
                  onPress: loadCampaigns,
                },
              ]
            );
          }}
          onSwiped={(cardIndex) => {
            setCurrentIndex(cardIndex + 1);
          }}
          overlayLabels={{
            left: {
              title: 'SKIP',
              style: {
                label: {
                  backgroundColor: '#FF6B6B',
                  color: 'white',
                  borderRadius: 10,
                  padding: 12,
                  fontSize: 16,
                  fontWeight: 'bold',
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
                  padding: 12,
                  fontSize: 16,
                  fontWeight: 'bold',
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

      <View style={styles.footer}>
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{filteredCampaigns.length}</Text>
            <Text style={styles.statLabel}>Available</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{currentIndex}</Text>
            <Text style={styles.statLabel}>Reviewed</Text>
          </View>
        </View>
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
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  searchbar: {
    marginBottom: 16,
    elevation: 2,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryChip: {
    marginBottom: 8,
  },
  selectedChip: {
    backgroundColor: '#FF5758',
  },
  chipText: {
    color: '#666',
  },
  selectedChipText: {
    color: 'white',
  },
  swiperContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF5758',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: '#FF5758',
  },
});

export default CreatorDiscoverScreen; 