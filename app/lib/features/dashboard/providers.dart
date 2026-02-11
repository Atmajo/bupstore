import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../services/api_service.dart';

final apiServiceProvider = Provider((ref) {
  return ApiService(ref.watch(authStorageProvider));
});

final authStorageProvider = Provider((ref) {
  throw UnimplementedError();
});

final getDomainsFuture = FutureProvider<List<Map<String, dynamic>>>((ref) async {
  final apiService = ref.watch(apiServiceProvider);
  try {
    final response = await apiService.get<List<dynamic>>('/domains');
    return List<Map<String, dynamic>>.from(
      response.map((e) => e as Map<String, dynamic>),
    );
  } catch (e) {
    throw Exception('Failed to fetch domains: $e');
  }
});

final userProfileProvider = FutureProvider<Map<String, dynamic>>((ref) async {
  final apiService = ref.watch(apiServiceProvider);
  try {
    return await apiService.get<Map<String, dynamic>>('/users/me');
  } catch (e) {
    throw Exception('Failed to fetch user profile: $e');
  }
});
