# Flutter iOS App - BupStore

A premium glassmorphism iOS-first Flutter application that syncs with the BupStore backend for secure backup code management.

## Features

- 🔐 Face ID & Apple Sign-In Authentication
- 🎨 Premium Glassmorphism UI Design
- 📱 iOS-first Cupertino Widgets
- 🔔 Push Notifications with Firebase
- 💾 Secure Local Storage
- 🌓 Dark/Light Theme Support
- 🚀 Riverpod State Management
- 🧭 GoRouter Navigation
- 💨 Smooth Animations

## Getting Started

### Prerequisites

- Flutter 3.6.0+
- Xcode 14.0+
- CocoaPods
- iOS 12.0+

### Installation

1. Navigate to the project directory:
```bash
cd flutter_app
```

2. Install dependencies:
```bash
flutter pub get
```

3. iOS Setup:
```bash
cd ios
pod install
cd ..
```

4. Run the app:
```bash
flutter run
```

## Project Structure

```
lib/
├── main.dart                 # Entry point
├── app.dart                  # App configuration
├── router.dart               # GoRouter setup
├── constants.dart            # App constants
├── config/                   # Configuration files
│   ├── theme.dart            # Theme definitions
│   └── app_config.dart       # API config
├── core/
│   ├── constants/            # App constants
│   │   ├── endpoints.dart
│   │   └── app_constants.dart
│   └── utils/                # Utilities
│       ├── validators.dart
│       └── logger.dart
├── services/                 # Services layer
│   ├── api_service.dart
│   ├── auth_storage.dart
│   ├── hive_service.dart
│   └── notification_service.dart
├── widgets/                  # Reusable widgets
│   ├── glass_container.dart
│   ├── glass_button.dart
│   ├── bottom_tab_bar.dart
│   ├── app_navbar.dart
│   └── loading_overlay.dart
└── features/                 # Feature modules
    ├── auth/                 # Authentication
    │   ├── presentation/
    │   │   ├── pages/
    │   │   │   ├── login_page.dart
    │   │   │   └── signup_page.dart
    │   │   └── widgets/
    │   │       └── glass_text_field.dart
    │   ├── data/
    │   │   └── auth_service.dart
    │   └── providers.dart
    ├── dashboard/            # Dashboard
    │   ├── presentation/
    │   │   ├── pages/
    │   │   │   └── dashboard_page.dart
    │   │   └── widgets/
    │   │       └── domain_grid.dart
    │   └── providers.dart
    └── vault/                # Vault management
        ├── presentation/
        │   ├── pages/
        │   │   ├── vault_list_page.dart
        │   │   └── vault_detail_page.dart
        │   └── widgets/
        │       └── code_card.dart
        └── providers.dart
```

## Configuration

### API Endpoint
Update the API endpoint in `lib/config/app_config.dart`:

```dart
static const String apiBaseUrl = 'http://localhost:3001/api';
```

### Firebase Setup
1. Add GoogleService-Info.plist to ios/Runner/
2. Ensure Firebase dependencies are in pubspec.yaml

### Face ID Setup
Ensure NSFaceIDUsageDescription is in Info.plist (already configured)

## Building

### Debug
```bash
flutter run
```

### Production
```bash
flutter build ios --release
```

## Testing

```bash
flutter test
```

## Contributing

Follow the existing code structure and style conventions.

## License

Proprietary - BupStore
