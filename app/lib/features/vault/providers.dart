import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../services/api_service.dart';

final apiServiceProvider = Provider((ref) {
  return ApiService(ref.watch(authStorageProvider));
});

final authStorageProvider = Provider((ref) {
  throw UnimplementedError();
});

final getVaultCodesFuture =
    FutureProvider.family<List<Map<String, dynamic>>, String>(
  (ref, domainId) async {
    final apiService = ref.watch(apiServiceProvider);
    try {
      final endpoint = '/domains/$domainId/codes';
      final response = await apiService.get<List<dynamic>>(endpoint);
      return List<Map<String, dynamic>>.from(
        response.map((e) => e as Map<String, dynamic>),
      );
    } catch (e) {
      throw Exception('Failed to fetch codes: $e');
    }
  },
);

final deleteCodes = FutureProvider.family<void, String>((ref, codeId) async {
  final apiService = ref.watch(apiServiceProvider);
  try {
    await apiService.delete('/codes/$codeId');
  } catch (e) {
    throw Exception('Failed to delete code: $e');
  }
});
