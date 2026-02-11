import 'package:firebase_messaging/firebase_messaging.dart';
import '../core/utils/logger.dart';

class NotificationService {
  static final FirebaseMessaging _firebaseMessaging = FirebaseMessaging.instance;

  static Future<void> initializeNotifications() async {
    try {
      // Request notification permissions
      final settings = await _firebaseMessaging.requestPermission(
        alert: true,
        announcement: false,
        badge: true,
        carPlay: false,
        criticalAlert: false,
        provisional: false,
        sound: true,
      );

      if (settings.authorizationStatus == AuthorizationStatus.authorized) {
        AppLogger.info('Notifications authorized');
        _setupMessageHandlers();
      } else {
        AppLogger.warning('Notifications not authorized');
      }
    } catch (e) {
      AppLogger.error('Failed to initialize notifications: $e');
    }
  }

  static void _setupMessageHandlers() {
    // Handle foreground messages
    FirebaseMessaging.onMessage.listen((RemoteMessage message) {
      AppLogger.info('Message received: ${message.notification?.title}');
      _handleMessage(message);
    });

    // Handle background message
    FirebaseMessaging.onBackgroundMessage(_firebaseMessagingBackgroundHandler);

    // Handle notification taps
    FirebaseMessaging.onMessageOpenedApp.listen((RemoteMessage message) {
      AppLogger.info('Notification tapped: ${message.notification?.title}');
      _handleNotificationTap(message);
    });
  }

  static Future<void> _firebaseMessagingBackgroundHandler(
    RemoteMessage message,
  ) async {
    AppLogger.info('Background message: ${message.notification?.title}');
  }

  static void _handleMessage(RemoteMessage message) {
    final notification = message.notification;
    if (notification != null) {
      // Handle notification
      AppLogger.info('Title: ${notification.title}, Body: ${notification.body}');
    }
  }

  static void _handleNotificationTap(RemoteMessage message) {
    final data = message.data;
    // Navigate based on notification data
    AppLogger.info('Data: $data');
  }

  static Future<String?> getDeviceToken() async {
    return await _firebaseMessaging.getToken();
  }
}
