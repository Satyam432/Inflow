import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Onboarding: undefined;
  PhoneVerification: undefined;
  UserDetails: undefined;
  CategorySelection: undefined;
  InstagramConnect: undefined;
  Subscription: undefined;
  MainTabs: NavigatorScreenParams<MainTabParamList>;
};

export type MainTabParamList = {
  Home: undefined;
  Messages: undefined;
  Notifications: undefined;
  Profile: undefined;
}; 