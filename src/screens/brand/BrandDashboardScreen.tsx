import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Button, Chip, Avatar, FAB, ProgressBar } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppStore } from '../../store';
import { apiService } from '../../services/api';

interface BrandCampaign {
  id: string;
  title: string;
  status: 'draft' | 'active' | 'paused' | 'completed';
  createdDate: string;
  budget: number;
  applicants: number;
  approvedCreators: number;
  conversions: number;
  revenue: number;
  spend: number;
}

interface CreatorApplication {
  id: string;
  campaignId: string;
  campaignTitle: string;
  creatorName: string;
  creatorAvatar: string;
  followerCount: number;
  category: string;
  instagramLink: string;
  appliedDate: string;
  status: 'pending' | 'approved' | 'rejected';
  contentSubmitted?: boolean;
  contentApproved?: boolean;
}

interface DashboardStats {
  totalCampaigns: number;
  activeCampaigns: number;
  totalSpend: number;
  totalRevenue: number;
  totalCreators: number;
  pendingApplications: number;
}

const BrandDashboardScreen: React.FC = () => {
  const { user } = useAppStore();
  const [campaigns, setCampaigns] = useState<BrandCampaign[]>([]);
  const [applications, setApplications] = useState<CreatorApplication[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalCampaigns: 0,
    activeCampaigns: 0,
    totalSpend: 0,
    totalRevenue: 0,
    totalCreators: 0,
    pendingApplications: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      // Mock brand campaigns data
      const mockCampaigns: BrandCampaign[] = [
        {
          id: '1',
          title: 'Summer Fashion Collection',
          status: 'active',
          createdDate: '2024-01-10',
          budget: 5000,
          applicants: 24,
          approvedCreators: 8,
          conversions: 156,
          revenue: 12450,
          spend: 1200,
        },
        {
          id: '2',
          title: 'Tech Gadget Launch',
          status: 'active',
          createdDate: '2024-01-15',
          budget: 3000,
          applicants: 18,
          approvedCreators: 5,
          conversions: 89,
          revenue: 8900,
          spend: 800,
        },
        {
          id: '3',
          title: 'Fitness Equipment Review',
          status: 'completed',
          createdDate: '2023-12-20',
          budget: 8000,
          applicants: 35,
          approvedCreators: 12,
          conversions: 245,
          revenue: 18750,
          spend: 2400,
        },
        {
          id: '4',
          title: 'Sustainable Products',
          status: 'draft',
          createdDate: '2024-01-22',
          budget: 4500,
          applicants: 0,
          approvedCreators: 0,
          conversions: 0,
          revenue: 0,
          spend: 0,
        },
      ];

      // Mock creator applications
      const mockApplications: CreatorApplication[] = [
        {
          id: '1',
          campaignId: '1',
          campaignTitle: 'Summer Fashion Collection',
          creatorName: 'Sarah Fashion',
          creatorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b9c0bbc8?w=200&h=200&fit=crop',
          followerCount: 25000,
          category: 'Fashion',
          instagramLink: '@sarahfashion',
          appliedDate: '2024-01-16',
          status: 'pending',
        },
        {
          id: '2',
          campaignId: '1',
          campaignTitle: 'Summer Fashion Collection',
          creatorName: 'Emma Style',
          creatorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop',
          followerCount: 18000,
          category: 'Fashion',
          instagramLink: '@emmastyle',
          appliedDate: '2024-01-17',
          status: 'approved',
          contentSubmitted: true,
          contentApproved: false,
        },
        {
          id: '3',
          campaignId: '2',
          campaignTitle: 'Tech Gadget Launch',
          creatorName: 'Tech Mike',
          creatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
          followerCount: 15000,
          category: 'Technology',
          instagramLink: '@techmike',
          appliedDate: '2024-01-18',
          status: 'approved',
          contentSubmitted: true,
          contentApproved: true,
        },
      ];

      // Mock dashboard stats
      const mockStats: DashboardStats = {
        totalCampaigns: 4,
        activeCampaigns: 2,
        totalSpend: 4400,
        totalRevenue: 40100,
        totalCreators: 25,
        pendingApplications: 8,
      };

      setCampaigns(mockCampaigns);
      setApplications(mockApplications);
      setStats(mockStats);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateCampaign = () => {
    Alert.alert(
      'Create New Campaign',
      'Campaign creation wizard coming soon! You\'ll be able to set up campaigns with budgets, requirements, and deliverables.',
      [{ text: 'Got it!', style: 'default' }]
    );
  };

  const handleApproveApplication = (applicationId: string, creatorName: string) => {
    Alert.alert(
      'Approve Application',
      `Approve ${creatorName} for this campaign?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Approve',
          onPress: () => {
            setApplications(prev => 
              prev.map(app => 
                app.id === applicationId 
                  ? { ...app, status: 'approved' as const }
                  : app
              )
            );
            Alert.alert('Approved!', `${creatorName} has been approved for the campaign.`);
          },
        },
      ]
    );
  };

  const handleRejectApplication = (applicationId: string, creatorName: string) => {
    Alert.alert(
      'Reject Application',
      `Reject ${creatorName}'s application?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reject',
          style: 'destructive',
          onPress: () => {
            setApplications(prev => 
              prev.map(app => 
                app.id === applicationId 
                  ? { ...app, status: 'rejected' as const }
                  : app
              )
            );
            Alert.alert('Rejected', `${creatorName}'s application has been rejected.`);
          },
        },
      ]
    );
  };

  const handleContentApproval = (applicationId: string, creatorName: string, approve: boolean) => {
    const action = approve ? 'approve' : 'reject';
    Alert.alert(
      `${approve ? 'Approve' : 'Reject'} Content`,
      `${approve ? 'Approve' : 'Reject'} ${creatorName}'s submitted content?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: approve ? 'Approve' : 'Reject',
          style: approve ? 'default' : 'destructive',
          onPress: () => {
            setApplications(prev => 
              prev.map(app => 
                app.id === applicationId 
                  ? { ...app, contentApproved: approve }
                  : app
              )
            );
            Alert.alert(
              approve ? 'Content Approved!' : 'Content Rejected',
              approve 
                ? `${creatorName}'s content is now live. Affiliate tracking has been activated.`
                : `${creatorName} has been notified to resubmit content.`
            );
          },
        },
      ]
    );
  };

  const getStatusColor = (status: BrandCampaign['status']) => {
    switch (status) {
      case 'draft': return '#9E9E9E';
      case 'active': return '#4CAF50';
      case 'paused': return '#FFA726';
      case 'completed': return '#2196F3';
      default: return '#9E9E9E';
    }
  };

  const getStatusText = (status: BrandCampaign['status']) => {
    switch (status) {
      case 'draft': return 'Draft';
      case 'active': return 'Active';
      case 'paused': return 'Paused';
      case 'completed': return 'Completed';
      default: return 'Unknown';
    }
  };

  const StatsCard = () => (
    <Card style={styles.statsCard}>
      <Card.Content>
        <Text style={styles.statsTitle}>Campaign Overview</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <MaterialCommunityIcons name="bullhorn" size={20} color="#FF5758" />
            <Text style={styles.statValue}>{stats.totalCampaigns}</Text>
            <Text style={styles.statLabel}>Total Campaigns</Text>
          </View>
          <View style={styles.statItem}>
            <MaterialCommunityIcons name="play-circle" size={20} color="#4CAF50" />
            <Text style={styles.statValue}>{stats.activeCampaigns}</Text>
            <Text style={styles.statLabel}>Active</Text>
          </View>
          <View style={styles.statItem}>
            <MaterialCommunityIcons name="account-group" size={20} color="#2196F3" />
            <Text style={styles.statValue}>{stats.totalCreators}</Text>
            <Text style={styles.statLabel}>Creators</Text>
          </View>
        </View>

        <View style={styles.performanceSection}>
          <Text style={styles.performanceTitle}>Performance</Text>
          <View style={styles.performanceGrid}>
            <View style={styles.performanceItem}>
              <Text style={styles.performanceValue}>${stats.totalRevenue.toLocaleString()}</Text>
              <Text style={styles.performanceLabel}>Revenue</Text>
            </View>
            <View style={styles.performanceItem}>
              <Text style={styles.performanceValue}>${stats.totalSpend.toLocaleString()}</Text>
              <Text style={styles.performanceLabel}>Spend</Text>
            </View>
            <View style={styles.performanceItem}>
              <Text style={styles.performanceValue}>
                {stats.totalSpend > 0 ? ((stats.totalRevenue / stats.totalSpend) * 100).toFixed(0) : '0'}%
              </Text>
              <Text style={styles.performanceLabel}>ROI</Text>
            </View>
          </View>
        </View>
      </Card.Content>
    </Card>
  );

  const CampaignCard = ({ campaign }: { campaign: BrandCampaign }) => (
    <Card style={styles.campaignCard}>
      <Card.Content>
        <View style={styles.campaignHeader}>
          <View style={styles.campaignInfo}>
            <Text style={styles.campaignTitle}>{campaign.title}</Text>
            <Text style={styles.campaignDate}>Created {new Date(campaign.createdDate).toLocaleDateString()}</Text>
          </View>
          <Chip 
            mode="flat" 
            style={[styles.statusChip, { backgroundColor: getStatusColor(campaign.status) + '20' }]}
            textStyle={[styles.statusText, { color: getStatusColor(campaign.status) }]}
          >
            {getStatusText(campaign.status)}
          </Chip>
        </View>

        <View style={styles.campaignMetrics}>
          <View style={styles.metricItem}>
            <Text style={styles.metricValue}>{campaign.applicants}</Text>
            <Text style={styles.metricLabel}>Applicants</Text>
          </View>
          <View style={styles.metricItem}>
            <Text style={styles.metricValue}>{campaign.approvedCreators}</Text>
            <Text style={styles.metricLabel}>Approved</Text>
          </View>
          <View style={styles.metricItem}>
            <Text style={styles.metricValue}>{campaign.conversions}</Text>
            <Text style={styles.metricLabel}>Conversions</Text>
          </View>
          <View style={styles.metricItem}>
            <Text style={styles.metricValue}>${campaign.revenue.toLocaleString()}</Text>
            <Text style={styles.metricLabel}>Revenue</Text>
          </View>
        </View>

        {campaign.status === 'active' && (
          <View style={styles.progressSection}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>Budget Used</Text>
              <Text style={styles.progressValue}>
                ${campaign.spend.toLocaleString()} / ${campaign.budget.toLocaleString()}
              </Text>
            </View>
            <ProgressBar 
              progress={campaign.spend / campaign.budget} 
              color="#FF5758" 
              style={styles.progressBar} 
            />
          </View>
        )}
      </Card.Content>
    </Card>
  );

  const ApplicationCard = ({ application }: { application: CreatorApplication }) => (
    <Card style={styles.applicationCard}>
      <Card.Content>
        <View style={styles.applicationHeader}>
          <Avatar.Image 
            source={{ uri: application.creatorAvatar }} 
            size={48} 
            style={styles.creatorAvatar}
          />
          <View style={styles.creatorInfo}>
            <Text style={styles.creatorName}>{application.creatorName}</Text>
            <Text style={styles.creatorCategory}>{application.category}</Text>
            <View style={styles.creatorStats}>
              <MaterialCommunityIcons name="account-heart" size={14} color="#666" />
              <Text style={styles.followerCount}>{application.followerCount.toLocaleString()}</Text>
              <MaterialCommunityIcons name="instagram" size={14} color="#E4405F" style={{ marginLeft: 8 }} />
              <Text style={styles.instagramLink}>{application.instagramLink}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.campaignTitle}>Applied to: {application.campaignTitle}</Text>
        <Text style={styles.appliedDate}>Applied {new Date(application.appliedDate).toLocaleDateString()}</Text>

        {application.status === 'pending' && (
          <View style={styles.actionButtons}>
            <Button
              mode="outlined"
              onPress={() => handleRejectApplication(application.id, application.creatorName)}
              style={styles.rejectButton}
              labelStyle={styles.rejectButtonText}
            >
              Reject
            </Button>
            <Button
              mode="contained"
              onPress={() => handleApproveApplication(application.id, application.creatorName)}
              style={styles.approveButton}
            >
              Approve
            </Button>
          </View>
        )}

        {application.status === 'approved' && application.contentSubmitted && (
          <View style={styles.contentSection}>
            <Text style={styles.contentTitle}>Content Submitted</Text>
            {application.contentApproved === undefined ? (
              <View style={styles.contentActions}>
                <Button
                  mode="outlined"
                  onPress={() => handleContentApproval(application.id, application.creatorName, false)}
                  style={styles.rejectContentButton}
                  labelStyle={styles.rejectButtonText}
                >
                  Reject Content
                </Button>
                <Button
                  mode="contained"
                  onPress={() => handleContentApproval(application.id, application.creatorName, true)}
                  style={styles.approveContentButton}
                >
                  Approve Content
                </Button>
              </View>
            ) : (
              <Chip 
                mode="flat" 
                style={[
                  styles.contentStatusChip, 
                  { backgroundColor: application.contentApproved ? '#4CAF50' : '#FF5722' + '20' }
                ]}
                textStyle={[
                  styles.contentStatusText, 
                  { color: application.contentApproved ? '#4CAF50' : '#FF5722' }
                ]}
              >
                {application.contentApproved ? 'Content Approved' : 'Content Rejected'}
              </Chip>
            )}
          </View>
        )}

        {application.status === 'approved' && !application.contentSubmitted && (
          <Chip 
            mode="flat" 
            style={styles.waitingChip}
            textStyle={styles.waitingText}
          >
            Waiting for content submission
          </Chip>
        )}
      </Card.Content>
    </Card>
  );

  const pendingApplications = applications.filter(app => app.status === 'pending');
  const contentReviews = applications.filter(app => 
    app.status === 'approved' && app.contentSubmitted && app.contentApproved === undefined
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>Brand Dashboard</Text>
            <Text style={styles.brandName}>{user?.brandName || 'Your Brand'}</Text>
          </View>
          <Avatar.Text 
            size={48} 
            label={user?.brandName?.charAt(0) || 'B'} 
            style={styles.avatar}
          />
        </View>

        <StatsCard />

        {stats.pendingApplications > 0 && (
          <Card style={styles.alertCard}>
            <Card.Content style={styles.alertContent}>
              <MaterialCommunityIcons name="bell" size={24} color="#FF5758" />
              <View style={styles.alertText}>
                <Text style={styles.alertTitle}>Pending Reviews</Text>
                <Text style={styles.alertSubtitle}>
                  {pendingApplications.length} applications and {contentReviews.length} content submissions need review
                </Text>
              </View>
            </Card.Content>
          </Card>
        )}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>My Campaigns</Text>
          <Text style={styles.sectionSubtitle}>{campaigns.length} campaigns</Text>
        </View>

        {campaigns.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Applications</Text>
          <Text style={styles.sectionSubtitle}>{applications.length} applications</Text>
        </View>

        {applications.map((application) => (
          <ApplicationCard key={application.id} application={application} />
        ))}

        {applications.length === 0 && (
          <Card style={styles.emptyCard}>
            <Card.Content style={styles.emptyContent}>
              <MaterialCommunityIcons name="account-search-outline" size={64} color="#ccc" />
              <Text style={styles.emptyTitle}>No applications yet</Text>
              <Text style={styles.emptyText}>Create campaigns to start receiving creator applications!</Text>
            </Card.Content>
          </Card>
        )}
      </ScrollView>

      <FAB
        icon="plus"
        label="Create Campaign"
        style={styles.fab}
        onPress={handleCreateCampaign}
      />
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
  brandName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  avatar: {
    backgroundColor: '#FF5758',
  },
  statsCard: {
    marginHorizontal: 24,
    marginBottom: 24,
    borderRadius: 16,
    elevation: 4,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
    textAlign: 'center',
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  performanceLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  alertCard: {
    marginHorizontal: 24,
    marginBottom: 24,
    borderRadius: 12,
    elevation: 2,
    backgroundColor: '#FFF3E0',
  },
  alertContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  alertText: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  alertSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
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
    marginBottom: 16,
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
  campaignDate: {
    fontSize: 13,
    color: '#666',
  },
  statusChip: {
    height: 28,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  campaignMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  metricItem: {
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  metricLabel: {
    fontSize: 11,
    color: '#666',
    marginTop: 2,
  },
  progressSection: {
    marginTop: 8,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 13,
    color: '#666',
  },
  progressValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
  },
  applicationCard: {
    marginHorizontal: 24,
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
  },
  applicationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  creatorAvatar: {
    backgroundColor: '#f0f0f0',
  },
  creatorInfo: {
    flex: 1,
  },
  creatorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  creatorCategory: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  creatorStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 4,
  },
  followerCount: {
    fontSize: 12,
    color: '#666',
  },
  instagramLink: {
    fontSize: 12,
    color: '#E4405F',
    fontWeight: '500',
  },
  appliedDate: {
    fontSize: 12,
    color: '#666',
    marginBottom: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  rejectButton: {
    flex: 1,
    borderColor: '#FF5722',
  },
  rejectButtonText: {
    color: '#FF5722',
  },
  approveButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
  },
  contentSection: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  contentTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  contentActions: {
    flexDirection: 'row',
    gap: 12,
  },
  rejectContentButton: {
    flex: 1,
    borderColor: '#FF5722',
  },
  approveContentButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
  },
  contentStatusChip: {
    alignSelf: 'flex-start',
  },
  contentStatusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  waitingChip: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFA726' + '20',
    marginTop: 8,
  },
  waitingText: {
    color: '#FFA726',
    fontSize: 12,
    fontWeight: '600',
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
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#FF5758',
  },
});

export default BrandDashboardScreen; 