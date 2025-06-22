// Mock API service - replace with actual backend calls
import { Campaign, CreatorProfile, User } from '../store';

const API_BASE_URL = __DEV__ ? 'http://localhost:3000/api' : 'https://api.inflo.app';

// Mock data for development
const mockCampaigns: Campaign[] = [
  {
    id: '1',
    brandId: 'brand1',
    title: 'Summer Fashion Collection',
    description: 'Promote our latest summer fashion collection with trendy outfits',
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400',
    requirements: 'Fashion-focused content creators with minimum 10K followers',
    minFollowers: 10000,
    deliverables: ['Instagram Post', 'Instagram Story', 'Reel'],
    affiliatePercentage: 15,
    budget: 5000,
    timeline: '2 weeks',
    status: 'active',
    applicants: [],
    approvedCreators: [],
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    brandId: 'brand2',
    title: 'Tech Gadget Review',
    description: 'Review our latest smart home gadgets',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    requirements: 'Tech reviewers with authentic engagement',
    minFollowers: 5000,
    deliverables: ['YouTube Video', 'Instagram Post'],
    affiliatePercentage: 20,
    budget: 3000,
    timeline: '1 week',
    status: 'active',
    applicants: [],
    approvedCreators: [],
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    brandId: 'brand3',
    title: 'Fitness Challenge',
    description: 'Join our 30-day fitness challenge and inspire others',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
    requirements: 'Fitness influencers with motivational content',
    minFollowers: 15000,
    deliverables: ['Instagram Posts', 'Stories', 'Live Session'],
    affiliatePercentage: 12,
    budget: 8000,
    timeline: '1 month',
    status: 'active',
    applicants: [],
    approvedCreators: [],
    createdAt: new Date().toISOString(),
  },
];

const mockCreators: CreatorProfile[] = [
  {
    id: 'creator1',
    name: 'Sarah Fashion',
    category: 'Fashion',
    followerCount: 25000,
    imageUrl: 'https://images.unsplash.com/photo-1494790108755-2616b9c0bbc8?w=200',
    instagramLink: '@sarahfashion',
    rating: 4.8,
    completedCampaigns: 12,
  },
  {
    id: 'creator2',
    name: 'Tech Mike',
    category: 'Technology',
    followerCount: 15000,
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    instagramLink: '@techmike',
    rating: 4.9,
    completedCampaigns: 8,
  },
  {
    id: 'creator3',
    name: 'Fitness Anna',
    category: 'Fitness',
    followerCount: 30000,
    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
    instagramLink: '@fitnessanna',
    rating: 4.7,
    completedCampaigns: 20,
  },
];

export const apiService = {
  // Authentication
  async verifyOTP(phoneNumber: string, otp: string): Promise<{ success: boolean; token?: string; error?: string }> {
    // Mock OTP verification
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (otp === '1234') {
      return {
        success: true,
        token: 'mock-jwt-token-' + Date.now(),
      };
    } else {
      return {
        success: false,
        error: 'Invalid OTP',
      };
    }
  },

  async sendOTP(phoneNumber: string): Promise<{ success: boolean; error?: string }> {
    // Mock OTP sending
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`Mock OTP sent to ${phoneNumber}: 1234`);
    return { success: true };
  },

  // User management
  async createUser(userData: Partial<User>): Promise<{ success: boolean; user?: User; error?: string }> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user: User = {
      id: 'user-' + Date.now(),
      role: userData.role!,
      phoneNumber: userData.phoneNumber,
      email: userData.email,
      name: userData.name,
      dateOfBirth: userData.dateOfBirth,
      category: userData.category,
      instagramLink: userData.instagramLink,
      address: userData.address,
      brandName: userData.brandName,
      brandLogo: userData.brandLogo,
      isOnboardingComplete: true,
      subscriptionPlan: 'trial',
      subscriptionExpiry: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days trial
    };

    return { success: true, user };
  },

  async updateUser(userId: string, updates: Partial<User>): Promise<{ success: boolean; user?: User; error?: string }> {
    await new Promise(resolve => setTimeout(resolve, 500));
    // Mock user update
    return { success: true };
  },

  // Campaigns
  async getCampaigns(filters?: { category?: string; minBudget?: number }): Promise<Campaign[]> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    let campaigns = [...mockCampaigns];
    
    if (filters?.category) {
      campaigns = campaigns.filter(c => c.title.toLowerCase().includes(filters.category!.toLowerCase()));
    }
    
    if (filters?.minBudget) {
      campaigns = campaigns.filter(c => c.budget >= filters.minBudget!);
    }
    
    return campaigns;
  },

  async createCampaign(campaignData: Omit<Campaign, 'id' | 'createdAt' | 'applicants' | 'approvedCreators'>): Promise<{ success: boolean; campaign?: Campaign; error?: string }> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const campaign: Campaign = {
      ...campaignData,
      id: 'campaign-' + Date.now(),
      createdAt: new Date().toISOString(),
      applicants: [],
      approvedCreators: [],
    };
    
    mockCampaigns.push(campaign);
    return { success: true, campaign };
  },

  async applyCampaign(campaignId: string, creatorId: string): Promise<{ success: boolean; error?: string }> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const campaign = mockCampaigns.find(c => c.id === campaignId);
    if (campaign && !campaign.applicants.includes(creatorId)) {
      campaign.applicants.push(creatorId);
    }
    
    return { success: true };
  },

  async approveCampaignApplication(campaignId: string, creatorId: string): Promise<{ success: boolean; affiliateLink?: string; error?: string }> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const campaign = mockCampaigns.find(c => c.id === campaignId);
    if (campaign) {
      campaign.approvedCreators.push(creatorId);
      const affiliateLink = `https://inflo.app/ref/${campaignId}/${creatorId}`;
      return { success: true, affiliateLink };
    }
    
    return { success: false, error: 'Campaign not found' };
  },

  // Creator profiles
  async getCreatorProfiles(filters?: { category?: string; minFollowers?: number }): Promise<CreatorProfile[]> {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    let creators = [...mockCreators];
    
    if (filters?.category) {
      creators = creators.filter(c => c.category.toLowerCase() === filters.category!.toLowerCase());
    }
    
    if (filters?.minFollowers) {
      creators = creators.filter(c => c.followerCount >= filters.minFollowers!);
    }
    
    return creators;
  },

  // Payments & Subscriptions
  async purchaseSubscription(plan: 'monthly' | 'yearly', paymentMethodId: string): Promise<{ success: boolean; subscriptionId?: string; error?: string }> {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock payment processing
    return {
      success: true,
      subscriptionId: 'sub-' + Date.now(),
    };
  },

  async getPaymentHistory(userId: string): Promise<any[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock payment history
    return [
      {
        id: 'payment-1',
        amount: 29.99,
        description: 'Monthly Subscription',
        date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'completed',
      },
    ];
  },

  // Content & Media
  async uploadImage(imageUri: string): Promise<{ success: boolean; url?: string; error?: string }> {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock image upload
    return {
      success: true,
      url: 'https://mock-cdn.inflo.app/uploads/' + Date.now() + '.jpg',
    };
  },

  async submitContent(campaignId: string, creatorId: string, contentData: { imageUrl: string; description: string }): Promise<{ success: boolean; error?: string }> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock content submission
    return { success: true };
  },
}; 