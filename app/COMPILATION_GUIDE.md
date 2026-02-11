# BupStore Flutter App - Compilation Guide

## Pre-Build Requirements Checklist

### 1. Dart & Flutter Version
- [ ] Flutter 3.6.0 or higher installed
- [ ] Dart 3.0 or higher
- [ ] Run `flutter doctor` - all items checked

### 2. iOS Setup
- [ ] Xcode 14.0 or higher
- [ ] iOS deployment target: 12.0 or higher
- [ ] CocoaPods installed (`sudo gem install cocoapods`)

### 3. Project Dependencies
- [ ] Run `flutter pub get`
- [ ] Run `cd ios && pod install && cd ..`

## Build Compilation Steps

### Step 1: Clean Build
```bash
flutter clean
rm -rf ios/Pods ios/Podfile.lock
cd ios && pod install && cd ..
```

### Step 2: Get Dependencies
```bash
flutter pub get
flutter pub upgrade  # Optional: update dependencies
```

### Step 3: Run Analyzer
```bash
flutter analyze
# Should show no errors, only warnings if any
```

### Step 4: Generate Build Files
```bash
flutter pub run build_runner build
# For Riverpod code generation (if needed)
```

### Step 5: Debug Build
```bash
flutter run
```

### Step 6: Release Build
```bash
flutter build ios --release
```

## Expected Output

### Successful Compilation
```
✓ Compiling dart to native code
✓ Building Flutter app for iOS
✓ iOS app successfully built
```

### Common Warnings (Non-Critical)
- Deprecated API warnings
- Swift compiler notes
- CocoaPods warnings

## Troubleshooting Failed Builds

### Issue: Pod Install Fails
```bash
# Solution:
cd ios
rm -rf Pods Podfile.lock Flutter/Flutter.podspec
pod repo update
pod install
cd ..
```

### Issue: Swift Compilation Error
```bash
# Solution:
flutter clean
rm -rf ios/Pods ios/Podfile.lock
cd ios && pod install && cd ..
flutter run
```

### Issue: Code Generation Not Running
```bash
# Solution:
flutter pub run build_runner build --delete-conflicting-outputs
```

### Issue: Memory Issues During Build
```bash
# Solution:
flutter run --release  # Use release build
# Or increase build memory in Xcode
```

## Testing Build Without Running

```bash
# Build without running on device
flutter build ios --debug
flutter build ios --release

# Build output location:
# ios/build/ios/iphoneos/Runner.app
```

## Verification Checklist

After successful compilation, verify:

- [ ] App launches without crashes
- [ ] Login page appears
- [ ] API calls work (if backend running)
- [ ] Navigation works
- [ ] No console errors
- [ ] Theme switching works
- [ ] Dark/light mode renders correctly

## Build Configuration Files

### pubspec.yaml
- Contains all dependencies
- Version numbers pinned
- All required dev_dependencies included

### ios/Podfile
- Configured for Flutter
- iOS 12.0+ deployment target
- Firebase messaging setup

### lib/main.dart
- Initializes Hive
- Initializes ProviderScope
- No compile-time errors

## Optimization Tips

### Faster Builds
```bash
# Disable analytics
flutter config --no-analytics

# Use --no-fast-start
flutter run --no-fast-start
```

### Reduced Build Size
```bash
# Remove unused dependencies
flutter pub outdated

# Build with optimization
flutter build ios --release --split-debug-info
```

## Final Verification

Run this to ensure complete compilation:

```bash
# Complete build check
flutter clean && \
flutter pub get && \
cd ios && pod install && cd .. && \
flutter analyze && \
flutter build ios --release

# Should complete without errors
```

## Production Build Steps

1. Ensure all constants are correct
2. Update version in pubspec.yaml
3. Update build number
4. Run full clean build
5. Test on physical device
6. Archive in Xcode
7. Upload to TestFlight
8. Submit to App Store

## Code Quality Checks

```bash
# Run analyzer
flutter analyze

# Check formatting
dart format --dry-run .

# Fix formatting
dart format .
```

All files compile successfully with no critical errors.
