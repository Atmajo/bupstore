import 'package:flutter/cupertino.dart';
import 'configuration_model.dart';

class AppConfiguration {
  static final AppConfiguration _instance = AppConfiguration._internal();

  factory AppConfiguration() {
    return _instance;
  }

  AppConfiguration._internal();

  late ConfigurationModel _config;

  Future<void> initialize() async {
    _config = ConfigurationModel(
      apiBaseUrl: 'http://localhost:3001/api',
      appVersion: '1.0.0',
      appName: 'BupStore',
      enableDebugLogging: true,
      enableAnalytics: true,
      enableFaceID: true,
      enableAppleSignIn: true,
      apiTimeout: const Duration(seconds: 30),
    );
  }

  String get apiBaseUrl => _config.apiBaseUrl;
  String get appVersion => _config.appVersion;
  String get appName => _config.appName;
  bool get enableDebugLogging => _config.enableDebugLogging;
  bool get enableAnalytics => _config.enableAnalytics;
  bool get enableFaceID => _config.enableFaceID;
  bool get enableAppleSignIn => _config.enableAppleSignIn;
  Duration get apiTimeout => _config.apiTimeout;
}

final appConfigProvider = AppConfiguration();
