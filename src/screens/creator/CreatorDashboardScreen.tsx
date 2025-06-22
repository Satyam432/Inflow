import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Button, Chip, Avatar, ProgressBar } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppStore } from '../../store';
import { apiService } from '../../services/api';

interface AppliedCampaign {
  id: string;
  title: string;
  brandName: string;
  status: 'pending' | 'approved' | 'rejected' | 'content_submitted' | 'live';
  appliedDate: string;
  affiliatePercentage: number;
  affiliateCode?: string;
  trackingLink?: string;
  earnings?: number;
  clicks?: number;
  conversions?: number;
}

interface EarningsData {
  totalEarnings: number;
  pendingEarnings: number;
  thisMonthEarnings: number;
  activeCampaigns: number;
  totalClicks: number;
  totalConversions: number;
}

const CreatorDashboardScreen: React.FC = () => {
  const { user } = useAppStore();
  const [appliedCampaigns, setAppliedCampaigns] = useState<AppliedCampaign[]>([]);
  const [earnings, setEarnings] = useState<EarningsData>({
    totalEarnings: 0,
    pendingEarnings: 0,
    thisMonthEarnings: 0,
    activeCampaigns: 0,
    totalClicks: 0,
    totalConversions: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      // Mock applied campaigns data
      const mockAppliedCampaigns: AppliedCampaign[] = [
        {
          id: '1',
          title: 'Summer Fashion Collection',
          brandName: 'StyleCo',
          status: 'live',
          appliedDate: '2024-01-15',
          affiliatePercentage: 15,
          affiliateCode: 'STYLE15',
          trackingLink: 'https://inflo.app/track/style15',
          earnings: 245.50,
          clicks: 1250,
          conversions: 12,
        },
        {
          id: '2',
          title: 'Tech Gadget Review',
          brandName: 'TechWorld',
          status: 'approved',
          appliedDate: '2024-01-20',
          affiliatePercentage: 20,
          affiliateCode: 'TECH20',
          trackingLink: 'https://inflo.app/track/tech20',
          earnings: 0,
          clicks: 0,
          conversions: 0,
        },
        {
          id: '3',
          title: 'Fitness Challenge',
          brandName: 'FitLife',
          status: 'pending',
          appliedDate: '2024-01-22',
          affiliatePercentage: 12,
        },
        {
          id: '4',
          title: 'Sustainable Living',
          brandName: 'EcoLiving',
          status: 'content_submitted',
          appliedDate: '2024-01-18',
          affiliatePercentage: 18,
        },
      ];

      // Mock earnings data
      const mockEarnings: EarningsData = {
        totalEarnings: 1245.75,
        pendingEarnings: 320.25,
        thisMonthEarnings: 245.50,
        activeCampaigns: 2,
        totalClicks: 3250,
        totalConversions: 28,
      };

      setAppliedCampaigns(mockAppliedCampaigns);
      setEarnings(mockEarnings);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleContentSubmission = (campaignId: string, campaignTitle: string) => {
    Alert.alert(
      'Submit Content',
      `Ready to submit content for "${campaignTitle}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Upload Content',
          onPress: () => {
            Alert.alert(
              'Content Upload',
              'Content upload feature coming soon! You\'ll be able to upload images/videos with descriptions.',
              [{ text: 'Got it!', style: 'default' }]
            );
          },
        },
      ]
    );
  };

  const handleWithdrawEarnings = () => {
    Alert.alert(
      'Withdraw Earnings',
      `Withdraw $${earnings.totalEarnings.toFixed(2)} to your connected account?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Withdraw',
          onPress: () => {
            Alert.alert(
              'Withdrawal Initiated',
              'Your withdrawal request has been submitted. Funds will be transferred within 2-3 business days.',
              [{ text: 'Great!', style: 'default' }]
            );
          },
        },
      ]
    );
  };

  const getStatusColor = (status: AppliedCampaign['status']) => {
    switch (status) {
      case 'pending': return '#FFA726';
      case 'approved': return '#4CAF50';
      case 'rejected': return '#FF5722';
      case 'content_submitted': return '#2196F3';
      case 'live': return '#8BC34A';
      default: return '#9E9E9E';
    }
  };

  const getStatusText = (status: AppliedCampaign['status']) => {
    switch (status) {
      case 'pending': return 'Under Review';
      case 'approved': return 'Approved - Submit Content';
      case 'rejected': return 'Not Selected';
      case 'content_submitted': return 'Content Under Review';
      case 'live': return 'Live & Earning';
      default: return 'Unknown';
    }
  };

  const EarningsCard = () => (
    <Card style={styles.earningsCard}>
      <Card.Content>
        <View style={styles.earningsHeader}>
          <View>
            <Text style={styles.earningsTitle}>Total Earnings</Text>
            <Text style={styles.earningsAmount}>${earnings.totalEarnings.toFixed(2)}</Text>
          </View>
          <TouchableOpacity style={styles.withdrawButton} onPress={handleWithdrawEarnings}>
            <MaterialCommunityIcons name="bank-transfer" size={20} color="white" />
            <Text style={styles.withdrawText}>Withdraw</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.earningsGrid}>
          <View style={styles.earningsStat}>
            <Text style={styles.statValue}>${earnings.thisMonthEarnings.toFixed(2)}</Text>
            <Text style={styles.statLabel}>This Month</Text>
          </View>
          <View style={styles.earningsStat}>
            <Text style={styles.statValue}>${earnings.pendingEarnings.toFixed(2)}</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
          <View style={styles.earningsStat}>
            <Text style={styles.statValue}>{earnings.activeCampaigns}</Text>
            <Text style={styles.statLabel}>Active</Text>
          </View>
        </View>

        <View style={styles.performanceSection}>
          <Text style={styles.performanceTitle}>Performance Overview</Text>
          <View style={styles.performanceGrid}>
            <View style={styles.performanceItem}>
              <MaterialCommunityIcons name="mouse-variant" size={16} color="#2196F3" />
              <Text style={styles.performanceValue}>{earnings.totalClicks.toLocaleString()}</Text>
              <Text style={styles.performanceLabel}>Total Clicks</Text>
            </View>
            <View style={styles.performanceItem}>
              <MaterialCommunityIcons name="cart-check" size={16} color="#4CAF50" />
              <Text style={styles.performanceValue}>{earnings.totalConversions}</Text>
              <Text style={styles.performanceLabel}>Conversions</Text>
            </View>
            <View style={styles.performanceItem}>
              <MaterialCommunityIcons name="percent" size={16} color="#FF5758" />
              <Text style={styles.performanceValue}>
                {earnings.totalClicks > 0 ? ((earnings.totalConversions / earnings.totalClicks) * 100).toFixed(1) : '0'}%
              </Text>
              <Text style={styles.performanceLabel}>Conversion Rate</Text>
            </View>
          </View>
        </View>
      </Card.Content>
    </Card>
  );

  const CampaignCard = ({ campaign }: { campaign: AppliedCampaign }) => (
    <Card style={styles.campaignCard}>
      <Card.Content>
        <View style={styles.campaignHeader}>
          <View style={styles.campaignInfo}>
            <Text style={styles.campaignTitle}>{campaign.title}</Text>
            <Text style={styles.brandName}>{campaign.brandName}</Text>
          </View>
          <Chip 
            mode="flat" 
            style={[styles.statusChip, { backgroundColor: getStatusColor(campaign.status) + '20' }]}
            textStyle={[styles.statusText, { color: getStatusColor(campaign.status) }]}
          >
            {getStatusText(campaign.status)}
          </Chip>
        </View>

        <View style={styles.campaignDetails}>
          <View style={styles.campaignStat}>
            <MaterialCommunityIcons name="percent" size={16} color="#666" />
            <Text style={styles.statText}>{campaign.affiliatePercentage}% commission</Text>
          </View>
          <View style={styles.campaignStat}>
            <MaterialCommunityIcons name="calendar" size={16} color="#666" />
            <Text style={styles.statText}>Applied {new Date(campaign.appliedDate).toLocaleDateString()}</Text>
          </View>
        </View>

        {campaign.status === 'live' && campaign.earnings !== undefined && (
          <View style={styles.earningsSection}>
            <Text style={styles.earningsSectionTitle}>Campaign Performance</Text>
            <View style={styles.campaignEarningsGrid}>
              <View style={styles.campaignEarningStat}>
                <Text style={styles.campaignEarningValue}>${campaign.earnings.toFixed(2)}</Text>
                <Text style={styles.campaignEarningLabel}>Earned</Text>
              </View>
              <View style={styles.campaignEarningStat}>
                <Text style={styles.campaignEarningValue}>{campaign.clicks}</Text>
                <Text style={styles.campaignEarningLabel}>Clicks</Text>
              </View>
              <View style={styles.campaignEarningStat}>
                <Text style={styles.campaignEarningValue}>{campaign.conversions}</Text>
                <Text style={styles.campaignEarningLabel}>Sales</Text>
              </View>
            </View>
            {campaign.trackingLink && (
              <TouchableOpacity style={styles.trackingLinkButton}>
                <MaterialCommunityIcons name="link-variant" size={16} color="#2196F3" />
                <Text style={styles.trackingLinkText}>View Tracking Link</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {campaign.status === 'approved' && (
          <Button
            mode="contained"
            onPress={() => handleContentSubmission(campaign.id, campaign.title)}
            style={styles.submitButton}
            icon="upload"
          >
            Submit Content
          </Button>
        )}

        {campaign.status === 'content_submitted' && (
          <View style={styles.submissionStatus}>
            <ProgressBar progress={0.7} color="#2196F3" style={styles.progressBar} />
            <Text style={styles.submissionText}>Content under review by brand</Text>
          </View>
        )}
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.userName}>{user?.name || 'Creator'}!</Text>
          </View>
          <Avatar.Text 
            size={48} 
            label={user?.name?.charAt(0) || 'C'} 
            style={styles.avatar}
          />
        </View>

        <EarningsCard />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>My Campaigns</Text>
          <Text style={styles.sectionSubtitle}>{appliedCampaigns.length} campaigns</Text>
        </View>

        {appliedCampaigns.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}

        {appliedCampaigns.length === 0 && (
          <Card style={styles.emptyCard}>
            <Card.Content style={styles.emptyContent}>
              <MaterialCommunityIcons name="briefcase-search-outline" size={64} color="#ccc" />
              <Text style={styles.emptyTitle}>No campaigns yet</Text>
              <Text style={styles.emptyText}>Start by discovering and applying to campaigns!</Text>
            </Card.Content>
          </Card>
        )}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  welcomeText: {
    fontSize: 16,
    color: '#666',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  avatar: {
    backgroundColor: '#FF5758',
  },
  earningsCard: {
    marginHorizontal: 24,
    marginBottom: 24,
    borderRadius: 16,
    elevation: 4,
  },
  earningsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  earningsTitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  earningsAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  withdrawButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  withdrawText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  earningsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  earningsStat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  performanceSection: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 16,
  },
  performanceTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  performanceGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  performanceItem: {
    alignItems: 'center',
    flex: 1,
  },
  performanceValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 4,
  },
  performanceLabel: {
    fontSize: 11,
    color: '#666',
    marginTop: 2,
    textAlign: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  campaignCard: {
    marginHorizontal: 24,
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
  },
  campaignHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  campaignInfo: {
    flex: 1,
    marginRight: 12,
  },
  campaignTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  brandName: {
    fontSize: 14,
    color: '#666',
  },
  statusChip: {
    height: 28,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  campaignDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  campaignStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 13,
    color: '#666',
  },
  earningsSection: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  earningsSectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  campaignEarningsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  campaignEarningStat: {
    alignItems: 'center',
  },
  campaignEarningValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  campaignEarningLabel: {
    fontSize: 11,
    color: '#666',
    marginTop: 2,
  },
  trackingLinkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  trackingLinkText: {
    fontSize: 12,
    color: '#2196F3',
    fontWeight: '500',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    marginTop: 12,
  },
  submissionStatus: {
    marginTop: 12,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
    marginBottom: 8,
  },
  submissionText: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
  },
  emptyCard: {
    marginHorizontal: 24,
    borderRadius: 12,
    elevation: 2,
  },
  emptyContent: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default CreatorDashboardScreen; 