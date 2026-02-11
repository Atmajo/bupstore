# BupStore Flutter iOS App - Complete Implementation Guide

## Project Overview

BupStore Mobile is a production-ready Flutter application designed to provide a premium iOS experience with glassmorphism UI design. The app connects to the BupStore backend for secure backup code management.

## Architecture Overview

### Clean Architecture with Feature-Based Structure

```
lib/
├── main.dart                 # Application entry point
├── app.dart                  # App configuration
├── router.dart               # Navigation setup
├── constants.dart            # App-wide constants
├── config/                   # Configuration layer
├── core/                     # Core functionality
├── features/                 # Feature modules
├── models/                   # Data models
├── providers/                # Riverpod state management
├── services/                 # Service layer
└── widgets/                  # Reusable UI components
```

## Key Features

### 1. Authentication
- **Face ID Integration**: Using `local_auth` package
- **Apple Sign-In**: Native iOS authentication
- **Secure Token Storage**: Flutter Secure Storage
- **Session Management**: Auto-token refresh

### 2. UI/UX Design
- **Glassmorphism Design System**: Custom glass containers and buttons
- **Cupertino Widgets**: Native iOS feel
- **Dark/Light Theme Support**: Theme switching
- **Smooth Animations**: 300ms transitions
- **Responsive Layouts**: SafeArea & CustomScrollView

### 3. State Management
- **Riverpod for Providers**: Reactive state
- **Future Providers**: Async operations
- **State Notifiers**: Complex state logic
- **Watch Pattern**: Reactive rebuilds

### 4. Navigation
- **GoRouter**: Deep linking support
- **Route Guards**: Authentication checks
- **Named Routes**: Type-safe navigation

### 5. Data Management
- **Hive Database**: Local persistent storage
- **Secure Storage**: Token & sensitive data
- **API Service Layer**: Dio with interceptors
- **Cache Strategy**: Automatic caching

### 6. Integration
- **Firebase Messaging**: Push notifications
- **Analytics Ready**: Event tracking setup
- **Error Handling**: Comprehensive error management
- **Logging**: Debug logging system

## Setup Instructions

### 1. Prerequisites

```bash
# Install Flutter
flutter --version  # Should be 3.6.0+

# Install dependencies
cd flutter_app
flutter pub get

# iOS Setup
cd ios
pod install
cd ..
```

### 2. Configuration

#### API Endpoint
Update in `lib/config/app_config.dart`:
```dart
static const String apiBaseUrl = 'http://localhost:3001/api';
```

#### Firebase Setup
1. Download GoogleService-Info.plist from Firebase Console
2. Add to `ios/Runner/GoogleService-Info.plist`
3. Configure in Xcode

#### Apple Sign-In
1. Enable capability in Xcode
2. Configure App ID in Apple Developer

### 3. Running the App

```bash
# Development
flutter run

# Release
flutter build ios --release

# Run specific target
flutter run -t lib/main.dart
```

## File Structure Details

### Core Layer (`lib/core/`)
- **constants/**: App constants and endpoints
- **utils/**: Validators and logger utilities
- **exceptions/**: Custom exception classes

### Services Layer (`lib/services/`)
- **api_service.dart**: HTTP client with interceptors
- **auth_storage.dart**: Secure token storage
- **hive_service.dart**: Local database
- **notification_service.dart**: Firebase setup

### Features (`lib/features/`)

#### Auth Feature
```
auth/
├── data/
│   └── auth_service.dart       # Business logic
├── presentation/
│   ├── pages/
│   │   ├── login_page.dart
│   │   └── signup_page.dart
│   └── widgets/
│       └── glass_text_field.dart
└── providers.dart              # State management
```

#### Dashboard Feature
```
dashboard/
├── presentation/
│   ├── pages/
│   │   └── dashboard_page.dart
│   └── widgets/
│       └── domain_grid.dart
└── providers.dart
```

#### Vault Feature
```
vault/
├── presentation/
│   ├── pages/
│   │   ├── vault_list_page.dart
│   │   └── vault_detail_page.dart
│   └── widgets/
│       └── code_card.dart
└── providers.dart
```

### Widgets (`lib/widgets/`)
Reusable UI components with glass design:
- `glass_container.dart`: Backdrop filter container
- `glass_button.dart`: Animated glass button
- `glass_text_field.dart`: Input field with validation
- `bottom_tab_bar.dart`: Floating bottom navigation
- `app_navbar.dart`: Navigation bar
- `dialog_helpers.dart`: Dialog utilities

### Models (`lib/models/`)
- `User`: User data model
- `Domain`: Backup domain model
- `Code`: Backup code model

## API Integration

### API Service Pattern

```dart
final apiService = ref.watch(apiServiceProvider);

// GET
final data = await apiService.get<User>('/users/me');

// POST
await apiService.post('/auth/login', data: {
  'email': email,
  'password': password,
});

// Auto token injection
// Interceptor adds Authorization header automatically
```

## State Management Patterns

### Future Provider
```dart
final userProvider = FutureProvider<User>((ref) async {
  final api = ref.watch(apiServiceProvider);
  return await api.get<User>('/users/me');
});
```

### State Provider
```dart
final themeModeProvider = StateProvider<Brightness>((ref) {
  return Brightness.light;
});
```

### StateNotifier
```dart
final appStateProvider = StateNotifierProvider<AppStateNotifier, AppState>(
  (ref) => AppStateNotifier(),
);

class AppStateNotifier extends StateNotifier<AppState> {
  // Complex logic
}
```

## Theme System

### Colors
- Primary: `#007AFF` (iOS Blue)
- Secondary: `#5AC8FA` (Light Blue)
- Accent: `#FF2D55` (Red)
- Background: Light/Dark adaptive

### Typography
- Font Family: Inter
- Weights: Regular, Medium, SemiBold, Bold
- Sizes: XS (12), S (14), M (16), L (18), XL (24), 2XL (32)

### Glass UI Constants
```dart
glassBlurSigma = 30.0      // Backdrop filter blur
glassOpacity = 0.15        // Container opacity
glassRadius = 24.0         // Border radius
animationDuration = 300ms  // Standard animation
```

## Networking

### Authentication Flow
1. User logs in → Token stored securely
2. All requests include Authorization bearer token
3. Auto-refresh on 401 response
4. Logout clears secure storage

### Error Handling
```dart
try {
  await api.post('/endpoint', data: {...});
} catch (e) {
  if (e is DioException) {
    // Handle network error
  }
}
```

## Local Storage

### Hive (Local Database)
```dart
final domainsBox = HiveService.getDomainsBox();
domainsBox.put('key', domain);
```

### Secure Storage
```dart
final storage = AuthStorage();
await storage.saveToken(token);
final token = await storage.getToken();
```

## Push Notifications

### Setup
1. Add GoogleService-Info.plist
2. Initialize in main()
3. Handle foreground/background messages

### Usage
```dart
await NotificationService.initializeNotifications();
final token = await NotificationService.getDeviceToken();
```

## Testing Locally

### Mock Data Setup
Create test fixtures in `test/fixtures/`:
```dart
final mockUser = User(
  id: '1',
  email: 'test@example.com',
  username: 'testuser',
  createdAt: DateTime.now(),
);
```

### Running Tests
```bash
flutter test
```

## Deployment Checklist

### Pre-Release
- [ ] Update version in pubspec.yaml
- [ ] Test on physical device
- [ ] Enable release logging disabled
- [ ] Review permissions in Info.plist
- [ ] Test Face ID flow
- [ ] Test Apple Sign-In
- [ ] Test all authentication flows

### Building
```bash
flutter build ios --release
# Archive in Xcode and upload to App Store
```

## Environment Variables

### .env File
```
API_BASE_URL=http://localhost:3001/api
ENVIRONMENT=development
DEBUG_LOGGING=true
```

### Load Configuration
```dart
import 'package:flutter_dotenv/flutter_dotenv.dart';

final apiUrl = dotenv.env['API_BASE_URL'];
```

## Troubleshooting

### Common Issues

**Pod Install Fails**
```bash
cd ios
rm -rf Pods Podfile.lock
pod repo update
pod install
cd ..
```

**Port Already in Use**
```bash
flutter run --release
```

**Hot Reload Issues**
```bash
flutter clean
flutter run
```

## Performance Optimization

### UI Performance
- Use `const` constructors
- Implement `shouldRebuild` in providers
- Use ListView instead of Column for large lists

### Network Performance
- Implement response caching
- Use pagination for large data sets
- Compress images before upload

### Memory Management
- Dispose controllers in StatefulWidget.dispose()
- Clear cache periodically
- Use `AutomaticKeepAliveClientMixin` carefully

## Security Best Practices

1. **Token Storage**: Secure storage only
2. **API Communication**: HTTPS only in production
3. **Password Handling**: Never log passwords
4. **Biometric**: Fallback to password
5. **Data Validation**: Validate all inputs

## Future Enhancements

- [ ] Offline mode with sync
- [ ] Code generation features
- [ ] Export/Import functionality
- [ ] Multi-device sync
- [ ] Advanced analytics
- [ ] Voice authentication

## Support & Contributing

For issues or contributions, contact development team.

## License

Proprietary - BupStore
