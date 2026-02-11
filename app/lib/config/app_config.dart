class AppConfig {
  static const String apiBaseUrl = 'http://localhost:3001/api';
  static const String appVersion = '1.0.0';
  static const String appName = 'BupStore';
  
  static const Duration apiTimeout = Duration(seconds: 30);
  static const Duration cacheExpiration = Duration(hours: 1);
  
  static const bool enableLogging = true;
  static const bool enableAnalytics = true;
}
