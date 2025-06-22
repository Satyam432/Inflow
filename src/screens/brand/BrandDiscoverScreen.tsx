import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-deck-swiper';
import { SwipeCard } from '../../components/SwipeCard';
import { useAppStore, CreatorProfile } from '../../store';
import { apiService } from '../../services/api';

const BrandDiscoverScreen: React.FC = () => {
  const { creatorProfiles, setCreatorProfiles, user } = useAppStore();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    loadCreators();
  }, []);

  const loadCreators = async () => {
    try {
      const fetchedCreators = await apiService.getCreatorProfiles();
      setCreatorProfiles(fetchedCreators);
    } catch (error) {
      console.error('Error loading creators:', error);
    }
  };

  const handleLike = async (creatorId: string) => {
    console.log('Creator liked:', creatorId);
    // Handle shortlisting logic here
  };

  if (creatorProfiles.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Loading creators...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Discover Creators</Text>
        <Text style={styles.subtitle}>Swipe right to shortlist, left to pass</Text>
      </View>

      <View style={styles.swiperContainer}>
        <Swiper
          cards={creatorProfiles}
          renderCard={(creator: CreatorProfile) => (
            <SwipeCard
              data={creator}
              type="creator"
              onLike={() => handleLike(creator.id)}
            />
          )}
          onSwipedRight={(cardIndex) => {
            const creator = creatorProfiles[cardIndex];
            if (creator) handleLike(creator.id);
          }}
          cardIndex={currentIndex}
          backgroundColor="transparent"
          stackSize={2}
          stackSeparation={15}
          animateOverlayLabelsOpacity
          animateCardOpacity
          swipeBackCard
          onSwipedAll={() => {
            console.log('All creators viewed');
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
              title: 'SHORTLIST',
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

export default BrandDiscoverScreen; 