import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Card, Chip, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Campaign, CreatorProfile } from '../store';

const { width } = Dimensions.get('window');

interface SwipeCardProps {
  data: Campaign | CreatorProfile;
  type: 'campaign' | 'creator';
  onPress?: () => void;
  onApply?: () => void;
  onLike?: () => void;
  onPass?: () => void;
}

export const SwipeCard: React.FC<SwipeCardProps> = ({
  data,
  type,
  onPress,
  onApply,
  onLike,
  onPass,
}) => {
  const isCampaign = type === 'campaign';
  const campaign = isCampaign ? (data as Campaign) : null;
  const creator = !isCampaign ? (data as CreatorProfile) : null;

  const renderCampaignCard = () => (
    <Card style={styles.card} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: campaign!.imageUrl }} style={styles.image} />
        <View style={styles.budgetBadge}>
          <Text style={styles.budgetText}>${campaign!.budget}</Text>
        </View>
      </View>
      
      <Card.Content style={styles.content}>
        <Text style={styles.title}>{campaign!.title}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {campaign!.description}
        </Text>
        
        <View style={styles.requirementsContainer}>
          <View style={styles.requirement}>
            <MaterialCommunityIcons name="account-group" size={16} color="#666" />
            <Text style={styles.requirementText}>
              {campaign!.minFollowers >= 1000 
                ? `${Math.floor(campaign!.minFollowers / 1000)}K+` 
                : `${campaign!.minFollowers}+`} followers
            </Text>
          </View>
          <View style={styles.requirement}>
            <MaterialCommunityIcons name="percent" size={16} color="#666" />
            <Text style={styles.requirementText}>{campaign!.affiliatePercentage}% commission</Text>
          </View>
        </View>
        
        <View style={styles.deliverables}>
          {campaign!.deliverables.slice(0, 3).map((deliverable, index) => (
            <Chip key={index} mode="outlined" style={styles.chip} compact>
              {deliverable}
            </Chip>
          ))}
          {campaign!.deliverables.length > 3 && (
            <Chip mode="outlined" style={styles.chip} compact>
              +{campaign!.deliverables.length - 3}
            </Chip>
          )}
        </View>
        
        <View style={styles.timeline}>
          <MaterialCommunityIcons name="clock-outline" size={16} color="#666" />
          <Text style={styles.timelineText}>{campaign!.timeline}</Text>
        </View>
      </Card.Content>
      
      <View style={styles.actions}>
        <Button mode="outlined" style={styles.passButton} onPress={onPass}>
          Pass
        </Button>
        <Button mode="contained" style={styles.applyButton} onPress={onApply}>
          Apply Now
        </Button>
      </View>
    </Card>
  );

  const renderCreatorCard = () => (
    <Card style={styles.card} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: creator!.imageUrl }} style={styles.creatorImage} />
        <View style={styles.ratingBadge}>
          <MaterialCommunityIcons name="star" size={12} color="#FFD700" />
          <Text style={styles.ratingText}>{creator!.rating}</Text>
        </View>
      </View>
      
      <Card.Content style={styles.content}>
        <Text style={styles.title}>{creator!.name}</Text>
        <Text style={styles.category}>{creator!.category}</Text>
        
        <View style={styles.creatorStats}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>
              {creator!.followerCount >= 1000 
                ? `${Math.floor(creator!.followerCount / 1000)}K` 
                : creator!.followerCount}
            </Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{creator!.completedCampaigns}</Text>
            <Text style={styles.statLabel}>Campaigns</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{creator!.rating}</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.instagramLink}>
          <MaterialCommunityIcons name="instagram" size={16} color="#E4405F" />
          <Text style={styles.instagramText}>{creator!.instagramLink}</Text>
        </TouchableOpacity>
      </Card.Content>
      
      <View style={styles.actions}>
        <Button mode="outlined" style={styles.passButton} onPress={onPass}>
          Pass
        </Button>
        <Button mode="contained" style={styles.likeButton} onPress={onLike}>
          Shortlist
        </Button>
      </View>
    </Card>
  );

  return isCampaign ? renderCampaignCard() : renderCreatorCard();
};

const styles = StyleSheet.create({
  card: {
    width: width - 40,
    height: 600,
    borderRadius: 20,
    elevation: 8,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    height: 250,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  creatorImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  budgetBadge: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  budgetText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  ratingBadge: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 16,
  },
  category: {
    fontSize: 16,
    color: '#FF5758',
    fontWeight: '600',
    marginBottom: 16,
  },
  requirementsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  requirement: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  requirementText: {
    fontSize: 12,
    color: '#666',
  },
  deliverables: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  chip: {
    height: 28,
  },
  timeline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timelineText: {
    fontSize: 12,
    color: '#666',
  },
  creatorStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  instagramLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'center',
  },
  instagramText: {
    fontSize: 14,
    color: '#E4405F',
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  passButton: {
    flex: 1,
    borderColor: '#ddd',
  },
  applyButton: {
    flex: 2,
    backgroundColor: '#FF5758',
  },
  likeButton: {
    flex: 2,
    backgroundColor: '#FF5758',
  },
}); 