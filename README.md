# Inflo App - Two-Sided Marketplace for Creators & Brands

A React Native + Expo app built with SDK 53 that connects content creators with brands for marketing campaigns.

## 🚀 Features

### For Content Creators
- **Discovery**: Swipe through brand campaigns to find the perfect match
- **Application**: Apply to campaigns that align with your content style
- **Content Submission**: Upload and submit campaign content for approval
- **Dashboard**: Track applied campaigns, earnings, and performance
- **Affiliate Marketing**: Earn through affiliate links and commission tracking

### For Brands
- **Creator Discovery**: Swipe through creator profiles to find ideal partners
- **Campaign Creation**: Create detailed marketing campaigns with requirements
- **Management**: Approve/reject creator applications and content submissions
- **Analytics**: Track campaign performance and ROI
- **Payment Processing**: Handle creator payouts and subscription billing

## 🛠 Tech Stack

- **Framework**: React Native 0.79.4 with Expo SDK 53
- **Navigation**: React Navigation v6
- **State Management**: Zustand
- **UI Components**: React Native Paper
- **Animations**: React Native Reanimated 3.17.4
- **Swipe Functionality**: React Native Deck Swiper
- **Payments**: Stripe integration ready
- **Notifications**: Expo Notifications
- **Image Handling**: Expo Image Picker
- **Storage**: AsyncStorage with Zustand persistence

## 📱 App Architecture

```
src/
├── components/          # Reusable UI components
│   └── SwipeCard.tsx   # Campaign/Creator swipe cards
├── navigation/          # Navigation configuration
│   └── AppNavigator.tsx # Main app navigator
├── screens/            # Screen components
│   ├── onboarding/     # Onboarding flow screens
│   ├── creator/        # Creator-specific screens
│   ├── brand/          # Brand-specific screens
│   └── shared/         # Shared screens
├── services/           # API and external services
│   └── api.ts         # Mock API service
├── store/             # Zustand store
│   └── index.ts       # Global state management
└── hooks/             # Custom React hooks
```

## 🎯 User Flows

### Onboarding Flow
1. **Splash Screen**: App branding and introduction
2. **Role Selection**: Choose between Creator or Brand
3. **Phone Verification**: Phone number input and OTP verification
4. **Profile Setup**: Complete profile information based on role
5. **Subscription**: Choose subscription plan (trial, monthly, yearly)

### Creator Flow
1. **Discover Campaigns**: Swipe through available brand campaigns
2. **Apply**: Submit applications to interesting campaigns
3. **Content Creation**: Upload and submit campaign content
4. **Dashboard**: Track applications, earnings, and performance

### Brand Flow
1. **Discover Creators**: Swipe through creator profiles
2. **Create Campaigns**: Set up new marketing campaigns
3. **Manage Applications**: Review and approve/reject creator applications
4. **Track Performance**: Monitor campaign metrics and payouts

## 🔧 Setup & Installation

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd inflo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

4. **Run on device/simulator**
   ```bash
   # iOS
   npx expo start --ios
   
   # Android
   npx expo start --android
   ```

## 🧪 Testing

### Demo Credentials
- **OTP Code**: Use `1234` for testing phone verification
- **All features**: Work with mock data during development

### Test User Flows
1. Select "Creator" role and complete onboarding
2. Swipe through campaigns and apply to one
3. Test the brand flow by selecting "Brand" role
4. Create a campaign and discover creators

## 🎨 Design System

- **Primary Color**: `#FF5758` (Inflo Red)
- **Typography**: System fonts with consistent sizing
- **Spacing**: 8px grid system
- **Components**: Material Design 3 via React Native Paper
- **Animations**: Smooth transitions and micro-interactions

## 📊 State Management

Using Zustand for global state with persistence:

- **User State**: Authentication, profile, role
- **Campaign State**: Available campaigns, applications
- **Creator State**: Profiles, discovery feed
- **UI State**: Loading states, error handling

## 🔌 API Integration

Currently using mock API service. Ready for backend integration:

- **Authentication**: OTP verification
- **User Management**: Profile creation and updates
- **Campaign Operations**: CRUD operations
- **Payment Processing**: Stripe/Razorpay integration
- **File Uploads**: Image and content submission

## 🚀 Deployment

### Development Builds
```bash
# Build for testing
eas build --platform all --profile development
```

### Production Builds
```bash
# Build for app stores
eas build --platform all --profile production
```

### OTA Updates
```bash
# Deploy updates
eas update --branch production
```

## 🔮 Future Enhancements

- **Real-time Chat**: Direct messaging between creators and brands
- **Video Content**: Support for video campaign submissions
- **Advanced Analytics**: Detailed performance metrics
- **Social Features**: Creator networking and collaboration
- **AI Matching**: Intelligent creator-brand matching algorithm
- **Multi-language**: Internationalization support

## 📱 Platform Support

- **iOS**: 13.0+
- **Android**: API level 21+
- **Web**: Progressive Web App ready

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

[Add your license information here]

## 🆘 Support

For support and questions:
- Email: support@inflo.app
- Documentation: [Link to docs]
- Discord: [Community link]

---

Built with ❤️ using React Native + Expo SDK 53 