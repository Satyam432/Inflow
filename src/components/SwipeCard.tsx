import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { Card, Button, Chip, Avatar } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Campaign, CreatorProfile } from '../store';

const { width } = Dimensions.get('window');

interface SwipeCardProps {
  data: Campaign | CreatorProfile;
  type: 'campaign' | 'creator';
  onApply?: () => void;
  onPass?: () => void;
  onLike?: () => void;
}

export const SwipeCard: React.FC<SwipeCardProps> = ({ data, type, onApply, onPass, onLike }) => {
  const isCampaign = type === 'campaign';
  const campaign = isCampaign ? (data as Campaign) : null;
  const creator = !isCampaign ? (data as CreatorProfile) : null;

  if (isCampaign && campaign) {
    return (
      <Card style={styles.card}>
        <Card.Cover 
          source={{ uri: campaign.imageUrl }} 
          style={styles.cardImage}
          resizeMode="cover"
        />
        <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Card.Content style={styles.cardContent}>
            <View style={styles.header}>
              <Text style={styles.title}>{campaign.title}</Text>
              <View style={styles.budgetContainer}>
                <MaterialCommunityIcons name="currency-usd" size={16} color="#4CAF50" />
                <Text style={styles.budget}>${campaign.budget.toLocaleString()}</Text>
              </View>
            </View>
            
            <Text style={styles.description} numberOfLines={3}>
              {campaign.description}
            </Text>

            <View style={styles.infoSection}>
              <View style={styles.infoRow}>
                <MaterialCommunityIcons name="account-group" size={16} color="#666" />
                <Text style={styles.infoText}>Min {campaign.minFollowers.toLocaleString()} followers</Text>
              </View>
              
              <View style={styles.infoRow}>
                <MaterialCommunityIcons name="clock-outline" size={16} color="#666" />
                <Text style={styles.infoText}>{campaign.timeline}</Text>
              </View>

              <View style={styles.infoRow}>
                <MaterialCommunityIcons name="percent" size={16} color="#FF5758" />
                <Text style={styles.affiliateText}>{campaign.affiliatePercentage}% commission</Text>
              </View>
            </View>

            <View style={styles.deliverablesSection}>
              <Text style={styles.sectionTitle}>Deliverables:</Text>
              <View style={styles.chipContainer}>
                {campaign.deliverables.map((deliverable, index) => (
                  <Chip key={index} mode="outlined" style={styles.deliverableChip}>
                    {deliverable}
                  </Chip>
                ))}
              </View>
            </View>

            <View style={styles.requirementsSection}>
              <Text style={styles.sectionTitle}>Requirements:</Text>
              <Text style={styles.requirements}>{campaign.requirements}</Text>
            </View>
          </Card.Content>
        </ScrollView>

        <Card.Actions style={styles.cardActions}>
          <Button
            mode="outlined"
            onPress={onPass}
            style={[styles.actionButton, styles.passButton]}
            labelStyle={styles.passButtonText}
            icon="close"
          >
            Skip
          </Button>
          <Button
            mode="contained"
            onPress={onApply}
            style={[styles.actionButton, styles.applyButton]}
            labelStyle={styles.applyButtonText}
            icon="check"
          >
            Apply
          </Button>
        </Card.Actions>
      </Card>
    );
  }

  if (!isCampaign && creator) {
    return (
      <Card style={styles.card}>
        <View style={styles.creatorHeader}>
          <Avatar.Image
            source={{ uri: creator.imageUrl }}
            size={80}
            style={styles.creatorAvatar}
          />
          <View style={styles.creatorInfo}>
            <Text style={styles.creatorName}>{creator.name}</Text>
            <Text style={styles.creatorCategory}>{creator.category}</Text>
            <View style={styles.creatorStats}>
              <View style={styles.statItem}>
                <MaterialCommunityIcons name="account-heart" size={16} color="#FF5758" />
                <Text style={styles.statText}>{creator.followerCount.toLocaleString()}</Text>
              </View>
              <View style={styles.statItem}>
                <MaterialCommunityIcons name="star" size={16} color="#FFC107" />
                <Text style={styles.statText}>{creator.rating}</Text>
              </View>
            </View>
          </View>
        </View>

        <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Card.Content style={styles.cardContent}>
            <View style={styles.creatorMetrics}>
              <View style={styles.metricCard}>
                <Text style={styles.metricNumber}>{creator.followerCount.toLocaleString()}</Text>
                <Text style={styles.metricLabel}>Followers</Text>
              </View>
              <View style={styles.metricCard}>
                <Text style={styles.metricNumber}>{creator.completedCampaigns}</Text>
                <Text style={styles.metricLabel}>Campaigns</Text>
              </View>
              <View style={styles.metricCard}>
                <Text style={styles.metricNumber}>{creator.rating}</Text>
                <Text style={styles.metricLabel}>Rating</Text>
              </View>
            </View>

            <View style={styles.creatorLinks}>
              <TouchableOpacity style={styles.socialLink}>
                <MaterialCommunityIcons name="instagram" size={20} color="#E4405F" />
                <Text style={styles.socialText}>{creator.instagramLink}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.portfolioSection}>
              <Text style={styles.sectionTitle}>Portfolio Highlights</Text>
              <View style={styles.portfolioGrid}>
                {/* Mock portfolio images */}
                <View style={styles.portfolioItem}>
                  <View style={styles.portfolioPlaceholder}>
                    <MaterialCommunityIcons name="image" size={24} color="#ccc" />
                  </View>
                </View>
                <View style={styles.portfolioItem}>
                  <View style={styles.portfolioPlaceholder}>
                    <MaterialCommunityIcons name="video" size={24} color="#ccc" />
                  </View>
                </View>
                <View style={styles.portfolioItem}>
                  <View style={styles.portfolioPlaceholder}>
                    <MaterialCommunityIcons name="camera" size={24} color="#ccc" />
                  </View>
                </View>
              </View>
            </View>
          </Card.Content>
        </ScrollView>

        <Card.Actions style={styles.cardActions}>
          <Button
            mode="outlined"
            onPress={onPass}
            style={[styles.actionButton, styles.passButton]}
            labelStyle={styles.passButtonText}
            icon="close"
          >
            Pass
          </Button>
          <Button
            mode="contained"
            onPress={onLike}
            style={[styles.actionButton, styles.shortlistButton]}
            labelStyle={styles.shortlistButtonText}
            icon="heart"
          >
            Shortlist
          </Button>
        </Card.Actions>
      </Card>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  card: {
    width: width - 40,
    height: '85%',
    borderRadius: 16,
    elevation: 8,
    backgroundColor: 'white',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  cardImage: {
    height: 200,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  scrollContent: {
    flex: 1,
  },
  cardContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginRight: 8,
  },
  budgetContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  budget: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginLeft: 2,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 16,
  },
  infoSection: {
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  infoText: {
    fontSize: 13,
    color: '#666',
    marginLeft: 6,
  },
  affiliateText: {
    fontSize: 13,
    color: '#FF5758',
    fontWeight: '600',
    marginLeft: 6,
  },
  deliverablesSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  deliverableChip: {
    height: 28,
    backgroundColor: '#F5F5F5',
  },
  requirementsSection: {
    marginBottom: 8,
  },
  requirements: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  cardActions: {
    padding: 16,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    borderRadius: 12,
  },
  passButton: {
    borderColor: '#FF6B6B',
  },
  passButtonText: {
    color: '#FF6B6B',
    fontWeight: '600',
  },
  applyButton: {
    backgroundColor: '#4CAF50',
  },
  applyButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  shortlistButton: {
    backgroundColor: '#FF5758',
  },
  shortlistButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  // Creator-specific styles
  creatorHeader: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  creatorAvatar: {
    marginRight: 12,
  },
  creatorInfo: {
    flex: 1,
  },
  creatorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  creatorCategory: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  creatorStats: {
    flexDirection: 'row',
    gap: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 13,
    color: '#666',
    marginLeft: 4,
    fontWeight: '500',
  },
  creatorMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    paddingVertical: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
  },
  metricCard: {
    alignItems: 'center',
  },
  metricNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  metricLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  creatorLinks: {
    marginBottom: 16,
  },
  socialLink: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
  },
  socialText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
    fontWeight: '500',
  },
  portfolioSection: {
    marginBottom: 8,
  },
  portfolioGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  portfolioItem: {
    flex: 1,
  },
  portfolioPlaceholder: {
    height: 60,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SwipeCard; 