import 'package:flutter/cupertino.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'services/auth_storage.dart';

const String appName = 'BupStore';
const String appVersion = '1.0.0';

// Feature flags
const bool enableFaceID = true;
const bool enableAppleSignIn = true;
const bool enablePushNotifications = true;

// API Configuration
class ApiConfig {
  static const String baseUrl = 'http://localhost:3001/api';
  static const Duration timeout = Duration(seconds: 30);
}

// Analytics & Logging
class AnalyticsConfig {
  static const bool enabled = true;
  static const bool debugLogging = true;
}
