import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Alert, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Searchbar, Chip, Card, Avatar, FAB } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SwipeCards from 'react-native-deck-swiper';
import { useAppStore, CreatorProfile as StoreCreatorProfile } from '../../store';
import { apiService } from '../../services/api';
import SwipeCard from '../../components/SwipeCard';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface EnhancedCreatorProfile {
  id: string;
  name: string;
  avatar: string;
  followerCount: number;
  category: string;
  instagramLink: string;
  bio: string;
  engagementRate: number;
  averageViews: number;
  location: string;
  tags: string[];
  portfolioImages: string[];
  isShortlisted?: boolean;
}

const BrandDiscoverScreen: React.FC = () => {
  const { user } = useAppStore();
  const [creators, setCreators] = useState<EnhancedCreatorProfile[]>([]);
  const [filteredCreators, setFilteredCreators] = useState<EnhancedCreatorProfile[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shortlistedCreators, setShortlistedCreators] = useState<EnhancedCreatorProfile[]>([]);
  const swipeRef = useRef<any>(null);

  const categories = ['All', 'Fashion', 'Technology', 'Fitness', 'Food', 'Travel', 'Lifestyle'];

  useEffect(() => {
    loadCreators();
  }, []);

  useEffect(() => {
    filterCreators();
  }, [creators, searchQuery, selectedCategory]);

  const loadCreators = async () => {
    setIsLoading(true);
    try {
      const response = await apiService.getCreatorProfiles();
      // Enhanced mock creator data
      const mockCreators: EnhancedCreatorProfile[] = [
        {
          id: '1',
          name: 'Sarah Fashion',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b9c0bbc8?w=400&h=400&fit=crop',
          followerCount: 25000,
          category: 'Fashion',
          instagramLink: '@sarahfashion',
          bio: 'Fashion enthusiast sharing daily outfit inspiration and style tips. Passionate about sustainable fashion and conscious living.',
          engagementRate: 4.8,
          averageViews: 12500,
          location: 'New York, NY',
          tags: ['Fashion', 'Style', 'Sustainable', 'OOTD'],
          portfolioImages: [
            'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=300&fit=crop',
            'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=300&h=300&fit=crop',
            'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=300&h=300&fit=crop',
          ],
        },
        {
          id: '2',
          name: 'Tech Mike',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
          followerCount: 35000,
          category: 'Technology',
          instagramLink: '@techmike',
          bio: 'Tech reviewer and gadget enthusiast. Unboxing the latest tech and sharing honest reviews to help you make informed decisions.',
          engagementRate: 5.2,
          averageViews: 18000,
          location: 'San Francisco, CA',
          tags: ['Tech', 'Reviews', 'Gadgets', 'Innovation'],
          portfolioImages: [
            'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=300&h=300&fit=crop',
            'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=300&h=300&fit=crop',
            'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=300&h=300&fit=crop',
          ],
        },
        {
          id: '3',
          name: 'Fitness Emma',
          avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop',
          followerCount: 42000,
          category: 'Fitness',
          instagramLink: '@fitnessemma',
          bio: 'Certified personal trainer helping people achieve their fitness goals. Sharing workout routines, nutrition tips, and motivation.',
          engagementRate: 6.1,
          averageViews: 22000,
          location: 'Los Angeles, CA',
          tags: ['Fitness', 'Workout', 'Nutrition', 'Wellness'],
          portfolioImages: [
            'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop',
            'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=300&fit=crop',
            'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=300&h=300&fit=crop',
          ],
        },
        {
          id: '4',
          name: 'Chef Antonio',
          avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop',
          followerCount: 28000,
          category: 'Food',
          instagramLink: '@chefantonio',
          bio: 'Professional chef sharing delicious recipes and cooking techniques. From quick weeknight meals to gourmet dining experiences.',
          engagementRate: 4.5,
          averageViews: 15000,
          location: 'Chicago, IL',
          tags: ['Food', 'Recipes', 'Cooking', 'Gourmet'],
          portfolioImages: [
            'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop',
            'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&h=300&fit=crop',
            'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=300&fit=crop',
          ],
        },
        {
          id: '5',
          name: 'Travel Luna',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
          followerCount: 55000,
          category: 'Travel',
          instagramLink: '@travelluna',
          bio: 'Digital nomad exploring the world one destination at a time. Sharing travel tips, hidden gems, and cultural experiences.',
          engagementRate: 5.8,
          averageViews: 28000,
          location: 'Currently in Bali',
          tags: ['Travel', 'Adventure', 'Culture', 'Photography'],
          portfolioImages: [
            'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=300&h=300&fit=crop',
            'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=300&h=300&fit=crop',
            'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=300&fit=crop',
          ],
        },
        {
          id: '6',
          name: 'Lifestyle Alex',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
          followerCount: 32000,
          category: 'Lifestyle',
          instagramLink: '@lifestylealex',
          bio: 'Lifestyle content creator focusing on minimalism, productivity, and personal development. Living intentionally and inspiring others.',
          engagementRate: 4.9,
          averageViews: 16000,
          location: 'Austin, TX',
          tags: ['Lifestyle', 'Minimalism', 'Productivity', 'Wellness'],
          portfolioImages: [
            'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=300&fit=crop',
            'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop',
            'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=300&h=300&fit=crop',
          ],
        },
      ];

      setCreators(mockCreators);
    } catch (error) {
      console.error('Error loading creators:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterCreators = () => {
    let filtered = creators;

    if (searchQuery) {
      filtered = filtered.filter(creator =>
        creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        creator.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        creator.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (selectedCategory && selectedCategory !== 'All') {
      filtered = filtered.filter(creator => creator.category === selectedCategory);
    }

    setFilteredCreators(filtered);
    setCurrentIndex(0);
  };

  const handleSwipeRight = (cardIndex: number) => {
    const creator = filteredCreators[cardIndex];
    if (creator) {
      handleShortlistCreator(creator);
    }
  };

  const handleSwipeLeft = (cardIndex: number) => {
    const creator = filteredCreators[cardIndex];
    console.log('Passed on creator:', creator?.name);
  };

  const handleShortlistCreator = (creator: EnhancedCreatorProfile) => {
    if (!shortlistedCreators.find(c => c.id === creator.id)) {
      setShortlistedCreators(prev => [...prev, { ...creator, isShortlisted: true }]);
      Alert.alert(
        'Creator Shortlisted! ⭐',
        `${creator.name} has been added to your shortlist. You can now invite them to your campaigns.`,
        [{ text: 'Great!', style: 'default' }]
      );
    }
  };

  const handleManualSwipe = (direction: 'left' | 'right') => {
    if (swipeRef.current && currentIndex < filteredCreators.length) {
      if (direction === 'right') {
        swipeRef.current.swipeRight();
      } else {
        swipeRef.current.swipeLeft();
      }
    }
  };

  const handleViewShortlist = () => {
    if (shortlistedCreators.length === 0) {
      Alert.alert(
        'No Shortlisted Creators',
        'Start swiping right on creators you\'d like to work with!',
        [{ text: 'Got it!', style: 'default' }]
      );
      return;
    }

    const creatorNames = shortlistedCreators.map(c => `• ${c.name} (${c.followerCount.toLocaleString()} followers)`).join('\n');
    Alert.alert(
      `Shortlisted Creators (${shortlistedCreators.length})`,
      creatorNames + '\n\nCampaign invitation feature coming soon!',
      [{ text: 'Awesome!', style: 'default' }]
    );
  };

  const renderCard = (creator: EnhancedCreatorProfile) => {
    // Convert our enhanced creator data to match the store's CreatorProfile interface
    const storeCreatorProfile: StoreCreatorProfile = {
      id: creator.id,
      name: creator.name,
      category: creator.category,
      followerCount: creator.followerCount,
      imageUrl: creator.avatar,
      instagramLink: creator.instagramLink,
      rating: creator.engagementRate,
      completedCampaigns: Math.floor(creator.averageViews / 5000), // Mock calculation
    };

    return (
      <SwipeCard
        type="creator"
        data={storeCreatorProfile}
      />
    );
  };

  const renderEmptyCard = () => (
    <Card style={styles.emptyCard}>
      <Card.Content style={styles.emptyContent}>
        <MaterialCommunityIcons name="account-search-outline" size={80} color="#ccc" />
        <Text style={styles.emptyTitle}>No more creators</Text>
        <Text style={styles.emptyText}>
          {searchQuery || selectedCategory !== 'All' 
            ? 'Try adjusting your search or filters'
            : 'Check back later for new creator profiles!'
          }
        </Text>
        <Button
          mode="outlined"
          onPress={() => {
            setSearchQuery('');
            setSelectedCategory('All');
          }}
          style={styles.resetButton}
        >
          Reset Filters
        </Button>
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Discover Creators</Text>
        <Text style={styles.subtitle}>Swipe right to shortlist talented creators</Text>
      </View>

      <View style={styles.searchSection}>
        <Searchbar
          placeholder="Search creators, categories, or tags..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
          iconColor="#FF5758"
        />
        
        <View style={styles.filterSection}>
          {categories.map((category) => (
            <Chip
              key={category}
              selected={selectedCategory === category || (category === 'All' && !selectedCategory)}
              onPress={() => setSelectedCategory(category === 'All' ? '' : category)}
              style={[
                styles.categoryChip,
                (selectedCategory === category || (category === 'All' && !selectedCategory)) && styles.selectedChip
              ]}
              textStyle={[
                styles.chipText,
                (selectedCategory === category || (category === 'All' && !selectedCategory)) && styles.selectedChipText
              ]}
            >
              {category}
            </Chip>
          ))}
        </View>
      </View>

      <View style={styles.statsSection}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{filteredCreators.length}</Text>
          <Text style={styles.statLabel}>Available</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{shortlistedCreators.length}</Text>
          <Text style={styles.statLabel}>Shortlisted</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{currentIndex}</Text>
          <Text style={styles.statLabel}>Reviewed</Text>
        </View>
      </View>

      <View style={styles.swipeContainer}>
        {filteredCreators.length > 0 ? (
          <SwipeCards
            ref={swipeRef}
            cards={filteredCreators}
            renderCard={renderCard}
            onSwipedRight={handleSwipeRight}
            onSwipedLeft={handleSwipeLeft}
            onSwipedAll={() => console.log('All creators reviewed')}
            onSwiped={(cardIndex) => setCurrentIndex(cardIndex + 1)}
            cardIndex={0}
            backgroundColor="transparent"
            stackSize={2}
            stackSeparation={15}
            animateOverlayLabelsOpacity
            animateCardOpacity
            swipeBackCard
            overlayLabels={{
              left: {
                title: 'PASS',
                style: {
                  label: {
                    backgroundColor: '#FF5722',
                    borderColor: '#FF5722',
                    color: 'white',
                    borderWidth: 1,
                    fontSize: 24,
                    fontWeight: 'bold',
                    padding: 10,
                    borderRadius: 10,
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
                title: 'SHORTLIST',
                style: {
                  label: {
                    backgroundColor: '#4CAF50',
                    borderColor: '#4CAF50',
                    color: 'white',
                    borderWidth: 1,
                    fontSize: 24,
                    fontWeight: 'bold',
                    padding: 10,
                    borderRadius: 10,
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
        ) : (
          renderEmptyCard()
        )}
      </View>

      {filteredCreators.length > 0 && (
        <View style={styles.actionButtons}>
          <Button
            mode="outlined"
            onPress={() => handleManualSwipe('left')}
            style={styles.passButton}
            icon="close"
            labelStyle={styles.passButtonText}
          >
            Pass
          </Button>
          <Button
            mode="contained"
            onPress={() => handleManualSwipe('right')}
            style={styles.shortlistButton}
            icon="star"
          >
            Shortlist
          </Button>
        </View>
      )}

      {shortlistedCreators.length > 0 && (
        <FAB
          icon="star-box"
          label={`Shortlist (${shortlistedCreators.length})`}
          style={styles.fab}
          onPress={handleViewShortlist}
        />
      )}
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
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  searchSection: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: 'white',
  },
  searchBar: {
    backgroundColor: '#f8f9fa',
    elevation: 0,
    borderRadius: 12,
  },
  filterSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  categoryChip: {
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
  },
  selectedChip: {
    backgroundColor: '#FF5758',
  },
  chipText: {
    color: '#666',
    fontSize: 12,
  },
  selectedChipText: {
    color: 'white',
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF5758',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  swipeContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  emptyCard: {
    flex: 1,
    borderRadius: 20,
    elevation: 4,
    backgroundColor: 'white',
  },
  emptyContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 40,
  },
  resetButton: {
    borderColor: '#FF5758',
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 20,
    gap: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  passButton: {
    flex: 1,
    borderColor: '#FF5722',
    borderRadius: 25,
  },
  passButtonText: {
    color: '#FF5722',
  },
  shortlistButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    borderRadius: 25,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 80,
    backgroundColor: '#FF5758',
  },
});

export default BrandDiscoverScreen; 