import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../services/auth_storage.dart';
import '../core/utils/logger.dart';

final authStorageProvider = Provider((ref) => AuthStorage());

final userSessionProvider = FutureProvider<Map<String, String>>((ref) async {
  final storage = ref.watch(authStorageProvider);
  final userId = await storage.getUserId();
  final userEmail = await storage.getUserEmail();

  if (userId == null || userEmail == null) {
    throw Exception('No user session found');
  }

  return {
    'userId': userId,
    'email': userEmail,
  };
});

final isAuthenticatedProvider = FutureProvider<bool>((ref) async {
  final storage = ref.watch(authStorageProvider);
  return await storage.isTokenAvailable();
});
