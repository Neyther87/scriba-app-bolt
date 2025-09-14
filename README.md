# ScribaVerse - Multiplatform Reading & Publishing App

## 🚀 Overview

ScribaVerse is a comprehensive multiplatform application for reading, publishing, and monetizing books, stories, and audiobooks. Built with React Native Web for cross-platform compatibility (iOS, Android, Web/PC).

## 🎨 Brand & Design

### Color Palette
- **Primary Purple**: `#5E2D91`
- **Accent Gold**: `#C69C6D`
- **Deep Blue**: `#0B3A6F`
- **Light Background**: `#F4F6F8`
- **Text Primary**: `#0D1B2A`

### Typography
- **UI Font**: Inter (clean, modern)
- **Brand/Titles**: Merriweather (editorial feel)
- **Reading**: Merriweather/Georgia (readability)
- **Dyslexia-friendly**: OpenDyslexic (accessibility)

## 👥 User Roles & Pricing

### Reader Free
- 7-day full access trial
- After trial: ad-supported, limited content
- Basic features only

### Reader PRO
- **€3.99/month** or **€39.90/year**
- **Special offer**: First month €1.99
- No ads, TTS, unlimited downloads
- Premium AI features (summaries, highlights)

### Creator PRO
- **€49.90/year** for authors
- AI editing tools, marketing tools
- Sponsorship console, monetization
- **Incentive**: Publish content = fee discounts (€2 per published work)

## 🔧 Features Implemented

### ✅ Core Components
- **Logo Component**: Scalable brand logo with text variants
- **Button Component**: Multiple variants (primary, secondary, outline, ghost, gold, danger)
- **Card Component**: Flexible container with elevation and styling options
- **BookCard Component**: Horizontal and vertical book display with progress, badges, actions

### ✅ Screens
- **Splash Screen**: Animated brand introduction with loading
- **Onboarding**: 3-step introduction with swipe navigation
- **Authentication**: Login/Register with social options and GDPR compliance
- **Home Screen**: Personalized feed with categories, recommendations, continue reading

### ✅ Design System
- **Colors**: Complete brand palette with variants and opacity levels
- **Typography**: Font families, sizes, and weights
- **Shadows**: Consistent elevation system
- **Responsive**: Mobile-first with tablet/desktop breakpoints

## 🛠 Technical Stack

- **Frontend**: React Native Web
- **Build Tool**: Vite
- **Styling**: StyleSheet (React Native)
- **State Management**: React Hooks (ready for Redux/Context)
- **Navigation**: Ready for React Navigation
- **Icons**: Unicode emojis (ready for react-native-vector-icons)

## 📱 Platform Support

- **iOS**: Native app via React Native
- **Android**: Native app via React Native
- **Web/PWA**: Responsive web app via React Native Web
- **Desktop**: Electron wrapper (future)

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Development URLs
- **Local**: http://localhost:5173
- **Network**: Available on local network for mobile testing

## 📋 API Endpoints (Backend Scaffold)

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh token
- `POST /api/auth/forgot-password` - Password reset

### Books
- `GET /api/books` - Get books with filters
- `GET /api/books/:id` - Get book details
- `GET /api/books/featured` - Featured books
- `GET /api/books/new-releases` - New releases
- `GET /api/books/trending` - Trending books
- `POST /api/books` - Create book (Creator)
- `PUT /api/books/:id` - Update book (Creator)
- `DELETE /api/books/:id` - Delete book (Creator)

### User Library
- `GET /api/library` - User's library
- `POST /api/library/:bookId` - Add to library
- `DELETE /api/library/:bookId` - Remove from library
- `GET /api/library/progress` - Reading progress
- `PUT /api/library/progress/:bookId` - Update progress

### Subscriptions
- `GET /api/subscriptions/plans` - Available plans
- `POST /api/subscriptions/subscribe` - Create subscription
- `PUT /api/subscriptions/cancel` - Cancel subscription
- `GET /api/subscriptions/status` - Subscription status

### Content Management
- `POST /api/content/upload` - Upload content
- `GET /api/content/moderation` - Moderation queue
- `PUT /api/content/moderate/:id` - Moderate content

## 🔮 Next Steps

### Phase 1 - Core Features
- [ ] Complete navigation system
- [ ] Book reader component (EPUB/TXT)
- [ ] Audio player with TTS
- [ ] User profile and settings
- [ ] Library management

### Phase 2 - Advanced Features
- [ ] Creator dashboard
- [ ] Payment integration (Stripe)
- [ ] Offline reading
- [ ] Social features (reviews, comments)
- [ ] Search and filters

### Phase 3 - AI & Analytics
- [ ] AI writing tools
- [ ] Recommendation engine
- [ ] Analytics dashboard
- [ ] Admin panel

### Phase 4 - Monetization
- [ ] Subscription management
- [ ] Creator payouts
- [ ] Sponsored content
- [ ] Referral system

## 🎯 Key Features to Implement

### Reading Experience
- EPUB/TXT reader with customizable fonts
- TTS with voice selection (Male/Female)
- Offline downloads with DRM
- Progress tracking and sync
- Bookmarks and highlights

### Creator Tools
- WYSIWYG editor
- AI writing assistance
- Cover generation
- Metadata management
- Analytics and payouts

### Social Features
- Reviews and ratings
- Comments and discussions
- Quote sharing with templates
- Wishlist and favorites
- User profiles

### Monetization
- Subscription plans
- Pay-per-book options
- Creator revenue sharing
- Sponsored content
- Referral rewards

## 📊 Analytics & Metrics

### User Metrics
- DAU/MAU tracking
- Trial to paid conversion
- Churn analysis
- Reading time and completion rates

### Content Metrics
- Book performance
- Creator earnings
- Popular genres and categories
- User engagement

### Business Metrics
- Revenue tracking
- Subscription metrics
- Creator payouts
- Customer acquisition cost

## 🔒 Security & Compliance

### Data Protection
- GDPR compliance
- User consent management
- Data portability
- Right to deletion

### Content Security
- Copyright protection
- DMCA takedown process
- Content moderation
- AI-generated content labeling

### Payment Security
- PCI compliance via Stripe
- Secure payment processing
- Fraud prevention
- Subscription management

## 🌍 Localization

### Supported Languages
- Italian (primary)
- English
- Spanish (future)
- French (future)

### Accessibility
- Screen reader support
- High contrast mode
- Dyslexia-friendly fonts
- Large text options
- Voice navigation

## 📞 Support & Documentation

### User Support
- In-app help system
- FAQ and knowledge base
- Contact forms
- Live chat (future)

### Developer Documentation
- API documentation
- Component library
- Style guide
- Deployment guides

---

**ScribaVerse** - *Il tuo universo di lettura digitale* 📚✨