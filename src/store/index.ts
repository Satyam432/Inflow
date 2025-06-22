import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type UserRole = 'creator' | 'brand';

export interface User {
  id: string;
  role: UserRole;
  phoneNumber?: string;
  email?: string;
  name?: string;
  dateOfBirth?: string;
  category?: string;
  instagramLink?: string;
  address?: string;
  brandName?: string;
  brandLogo?: string;
  isOnboardingComplete: boolean;
  subscriptionPlan?: 'trial' | 'monthly' | 'yearly';
  subscriptionExpiry?: string;
}

export interface Campaign {
  id: string;
  brandId: string;
  title: string;
  description: string;
  imageUrl: string;
  requirements: string;
  minFollowers: number;
  deliverables: string[];
  affiliatePercentage: number;
  budget: number;
  timeline: string;
  status: 'active' | 'paused' | 'completed';
  applicants: string[];
  approvedCreators: string[];
  createdAt: string;
}

export interface CreatorProfile {
  id: string;
  name: string;
  category: string;
  followerCount: number;
  imageUrl: string;
  instagramLink: string;
  rating: number;
  completedCampaigns: number;
}

export interface AppState {
  // User state
  user: User | null;
  isAuthenticated: boolean;
  
  // Campaign state
  campaigns: Campaign[];
  discoveredCampaigns: Campaign[];
  appliedCampaigns: Campaign[];
  
  // Creator state
  creatorProfiles: CreatorProfile[];
  discoveredCreators: CreatorProfile[];
  
  // UI state
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setUser: (user: User) => void;
  updateUser: (updates: Partial<User>) => void;
  setAuthenticated: (isAuthenticated: boolean) => void;
  logout: () => void;
  clearAllData: () => void;
  
  // Campaign actions
  setCampaigns: (campaigns: Campaign[]) => void;
  addCampaign: (campaign: Campaign) => void;
  updateCampaign: (id: string, updates: Partial<Campaign>) => void;
  applyToCampaign: (campaignId: string, creatorId: string) => void;
  
  // Creator actions
  setCreatorProfiles: (profiles: CreatorProfile[]) => void;
  
  // UI actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      campaigns: [],
      discoveredCampaigns: [],
      appliedCampaigns: [],
      creatorProfiles: [],
      discoveredCreators: [],
      isLoading: false,
      error: null,
      
      // User actions
      setUser: (user) => set({ user, isAuthenticated: true }),
      updateUser: (updates) => {
        const currentUser = get().user;
        if (currentUser) {
          const updatedUser = { ...currentUser, ...updates };
          set({ user: updatedUser });
          console.log('📱 User updated:', updatedUser);
        }
      },
      setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      logout: () => set({ 
        user: null, 
        isAuthenticated: false,
        campaigns: [],
        discoveredCampaigns: [],
        appliedCampaigns: [],
        creatorProfiles: [],
        discoveredCreators: []
      }),
      clearAllData: () => {
        set({ 
          user: null, 
          isAuthenticated: false,
          campaigns: [],
          discoveredCampaigns: [],
          appliedCampaigns: [],
          creatorProfiles: [],
          discoveredCreators: [],
          isLoading: false,
          error: null
        });
        // Also clear AsyncStorage
        AsyncStorage.removeItem('inflo-storage');
      },
      
      // Campaign actions
      setCampaigns: (campaigns) => set({ campaigns }),
      addCampaign: (campaign) => {
        const currentCampaigns = get().campaigns;
        set({ campaigns: [...currentCampaigns, campaign] });
      },
      updateCampaign: (id, updates) => {
        const campaigns = get().campaigns.map(campaign =>
          campaign.id === id ? { ...campaign, ...updates } : campaign
        );
        set({ campaigns });
      },
      applyToCampaign: (campaignId, creatorId) => {
        const campaigns = get().campaigns.map(campaign =>
          campaign.id === campaignId 
            ? { ...campaign, applicants: [...campaign.applicants, creatorId] }
            : campaign
        );
        set({ campaigns });
      },
      
      // Creator actions
      setCreatorProfiles: (profiles) => set({ creatorProfiles: profiles }),
      
      // UI actions
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
    }),
    {
      name: 'inflo-storage',
      getStorage: () => AsyncStorage,
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        campaigns: state.campaigns,
        appliedCampaigns: state.appliedCampaigns,
      }),
      onRehydrateStorage: () => (state) => {
        console.log('💾 Store rehydrated:', state ? {
          hasUser: !!state.user,
          isAuthenticated: state.isAuthenticated,
          userRole: state.user?.role,
          isOnboardingComplete: state.user?.isOnboardingComplete
        } : 'no state');
      },
    }
  )
); 