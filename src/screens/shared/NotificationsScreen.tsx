import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Avatar, Chip, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppStore } from '../../store';

interface Notification {
  id: string;
  type: 'campaign_approval' | 'campaign_rejection' | 'content_approval' | 'content_rejection' | 
        'affiliate_performance' | 'payout_status' | 'new_application' | 'content_submission' | 
        'conversion_alert' | 'campaign_completed';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  actionRequired?: boolean;
  relatedId?: string;
  relatedType?: 'campaign' | 'creator' | 'application';
  metadata?: {
    campaignTitle?: string;
    creatorName?: string;
    amount?: number;
    conversionCount?: number;
  };
}

const NotificationsScreen: React.FC = () => {
  const { user } = useAppStore();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadNotifications();
  }, [user?.role]);

  const loadNotifications = async () => {
    setIsLoading(true);
    try {
      // Mock notifications based on user role
      const mockNotifications: Notification[] = user?.role === 'creator' ? [
        {
          id: '1',
          type: 'campaign_approval',
          title: 'Campaign Application Approved! 🎉',
          message: 'Your application for "Summer Fashion Collection" has been approved. You can now submit your content.',
          timestamp: '2024-01-23T10:30:00Z',
          isRead: false,
          actionRequired: true,
          relatedId: '1',
          relatedType: 'campaign',
          metadata: {
            campaignTitle: 'Summer Fashion Collection',
          },
        },
        {
          id: '2',
          type: 'content_approval',
          title: 'Content Approved & Live! ✨',
          message: 'Your content for "Tech Gadget Review" has been approved and is now live. Affiliate tracking is active.',
          timestamp: '2024-01-22T15:45:00Z',
          isRead: false,
          relatedId: '2',
          relatedType: 'campaign',
          metadata: {
            campaignTitle: 'Tech Gadget Review',
          },
        },
        {
          id: '3',
          type: 'affiliate_performance',
          title: 'Great Performance! 📈',
          message: 'Your affiliate link for "Summer Fashion Collection" generated 15 new conversions this week. Keep it up!',
          timestamp: '2024-01-21T09:15:00Z',
          isRead: true,
          metadata: {
            campaignTitle: 'Summer Fashion Collection',
            conversionCount: 15,
          },
        },
        {
          id: '4',
          type: 'payout_status',
          title: 'Payout Processed 💰',
          message: 'Your earnings of $245.50 have been transferred to your account. Check your bank for confirmation.',
          timestamp: '2024-01-20T14:20:00Z',
          isRead: true,
          metadata: {
            amount: 245.50,
          },
        },
        {
          id: '5',
          type: 'campaign_rejection',
          title: 'Application Update',
          message: 'Unfortunately, your application for "Luxury Watch Campaign" was not selected. Keep exploring other opportunities!',
          timestamp: '2024-01-19T11:30:00Z',
          isRead: true,
          metadata: {
            campaignTitle: 'Luxury Watch Campaign',
          },
        },
        {
          id: '6',
          type: 'content_rejection',
          title: 'Content Revision Needed',
          message: 'Your submitted content for "Fitness Challenge" needs revision. Please check the feedback and resubmit.',
          timestamp: '2024-01-18T16:45:00Z',
          isRead: true,
          actionRequired: true,
          relatedId: '3',
          relatedType: 'campaign',
          metadata: {
            campaignTitle: 'Fitness Challenge',
          },
        },
      ] : [
        // Brand notifications
        {
          id: '1',
          type: 'new_application',
          title: 'New Creator Application! 👥',
          message: 'Sarah Fashion (25K followers) applied to your "Summer Fashion Collection" campaign.',
          timestamp: '2024-01-23T11:15:00Z',
          isRead: false,
          actionRequired: true,
          relatedId: '1',
          relatedType: 'application',
          metadata: {
            creatorName: 'Sarah Fashion',
            campaignTitle: 'Summer Fashion Collection',
          },
        },
        {
          id: '2',
          type: 'content_submission',
          title: 'Content Submitted for Review 📝',
          message: 'Emma Style submitted content for "Summer Fashion Collection". Review and approve to go live.',
          timestamp: '2024-01-22T14:30:00Z',
          isRead: false,
          actionRequired: true,
          relatedId: '2',
          relatedType: 'application',
          metadata: {
            creatorName: 'Emma Style',
            campaignTitle: 'Summer Fashion Collection',
          },
        },
        {
          id: '3',
          type: 'conversion_alert',
          title: 'High Conversion Alert! 🚀',
          message: 'Your "Tech Gadget Launch" campaign generated 25 conversions today. Total revenue: $2,500.',
          timestamp: '2024-01-21T18:45:00Z',
          isRead: true,
          metadata: {
            campaignTitle: 'Tech Gadget Launch',
            conversionCount: 25,
            amount: 2500,
          },
        },
        {
          id: '4',
          type: 'campaign_completed',
          title: 'Campaign Completed Successfully! ✅',
          message: 'Your "Fitness Equipment Review" campaign has ended. Final stats: 245 conversions, $18,750 revenue.',
          timestamp: '2024-01-20T10:00:00Z',
          isRead: true,
          metadata: {
            campaignTitle: 'Fitness Equipment Review',
            conversionCount: 245,
            amount: 18750,
          },
        },
        {
          id: '5',
          type: 'new_application',
          title: 'Multiple New Applications',
          message: '3 new creators applied to your campaigns today. Review applications to expand your reach.',
          timestamp: '2024-01-19T09:30:00Z',
          isRead: true,
          actionRequired: true,
        },
        {
          id: '6',
          type: 'payout_status',
          title: 'Creator Payout Processed',
          message: 'Affiliate payouts totaling $1,240 have been processed for your active campaigns.',
          timestamp: '2024-01-18T15:20:00Z',
          isRead: true,
          metadata: {
            amount: 1240,
          },
        },
      ];

      setNotifications(mockNotifications);
    } catch (error) {
      console.error('Error loading notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const handleNotificationAction = (notification: Notification) => {
    // This would navigate to the relevant screen or perform the action
    console.log('Handling notification action:', notification);
    handleMarkAsRead(notification.id);
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'campaign_approval': return { name: 'check-circle', color: '#4CAF50' };
      case 'campaign_rejection': return { name: 'close-circle', color: '#FF5722' };
      case 'content_approval': return { name: 'thumb-up', color: '#4CAF50' };
      case 'content_rejection': return { name: 'thumb-down', color: '#FF5722' };
      case 'affiliate_performance': return { name: 'trending-up', color: '#2196F3' };
      case 'payout_status': return { name: 'cash', color: '#4CAF50' };
      case 'new_application': return { name: 'account-plus', color: '#FF5758' };
      case 'content_submission': return { name: 'file-upload', color: '#2196F3' };
      case 'conversion_alert': return { name: 'chart-line', color: '#FF5758' };
      case 'campaign_completed': return { name: 'flag-checkered', color: '#4CAF50' };
      default: return { name: 'bell', color: '#666' };
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString();
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const NotificationCard = ({ notification }: { notification: Notification }) => {
    const icon = getNotificationIcon(notification.type);
    
    return (
      <TouchableOpacity
        onPress={() => !notification.isRead && handleMarkAsRead(notification.id)}
        activeOpacity={0.7}
      >
        <Card style={[
          styles.notificationCard,
          !notification.isRead && styles.unreadCard
        ]}>
          <Card.Content>
            <View style={styles.notificationHeader}>
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons 
                  name={icon.name as any} 
                  size={24} 
                  color={icon.color} 
                />
                {!notification.isRead && <View style={styles.unreadDot} />}
              </View>
              <View style={styles.notificationContent}>
                <Text style={[
                  styles.notificationTitle,
                  !notification.isRead && styles.unreadTitle
                ]}>
                  {notification.title}
                </Text>
                <Text style={styles.notificationMessage}>
                  {notification.message}
                </Text>
                <Text style={styles.timestamp}>
                  {formatTimestamp(notification.timestamp)}
                </Text>
              </View>
            </View>

            {notification.actionRequired && (
              <Button
                mode="contained"
                onPress={() => handleNotificationAction(notification)}
                style={styles.actionButton}
                compact
              >
                {user?.role === 'creator' ? 'View Details' : 'Review'}
              </Button>
            )}
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Notifications</Text>
          <Text style={styles.headerSubtitle}>
            {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up!'}
          </Text>
        </View>
        {unreadCount > 0 && (
          <Button
            mode="text"
            onPress={handleMarkAllAsRead}
            style={styles.markAllButton}
          >
            Mark all read
          </Button>
        )}
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <NotificationCard key={notification.id} notification={notification} />
          ))
        ) : (
          <Card style={styles.emptyCard}>
            <Card.Content style={styles.emptyContent}>
              <MaterialCommunityIcons name="bell-outline" size={64} color="#ccc" />
              <Text style={styles.emptyTitle}>No notifications yet</Text>
              <Text style={styles.emptyText}>
                {user?.role === 'creator' 
                  ? 'Apply to campaigns to start receiving updates!'
                  : 'Create campaigns to start receiving applications!'
                }
              </Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: 'white',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  markAllButton: {
    paddingHorizontal: 0,
  },
  scrollView: {
    flex: 1,
    paddingTop: 16,
  },
  notificationCard: {
    marginHorizontal: 24,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 2,
    backgroundColor: 'white',
  },
  unreadCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#FF5758',
    backgroundColor: '#FFFBF5',
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  iconContainer: {
    position: 'relative',
    padding: 8,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  unreadDot: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF5758',
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  unreadTitle: {
    fontWeight: 'bold',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
  },
  actionButton: {
    backgroundColor: '#FF5758',
    marginTop: 12,
    alignSelf: 'flex-start',
  },
  emptyCard: {
    marginHorizontal: 24,
    borderRadius: 12,
    elevation: 2,
  },
  emptyContent: {
    alignItems: 'center',
    paddingVertical: 48,
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
    paddingHorizontal: 32,
  },
});

export default NotificationsScreen; 