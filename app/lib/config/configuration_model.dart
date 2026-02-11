class ConfigurationModel {
  final String apiBaseUrl;
  final String appVersion;
  final String appName;
  final bool enableDebugLogging;
  final bool enableAnalytics;
  final bool enableFaceID;
  final bool enableAppleSignIn;
  final Duration apiTimeout;

  ConfigurationModel({
    required this.apiBaseUrl,
    required this.appVersion,
    required this.appName,
    required this.enableDebugLogging,
    required this.enableAnalytics,
    required this.enableFaceID,
    required this.enableAppleSignIn,
    required this.apiTimeout,
  });
}
