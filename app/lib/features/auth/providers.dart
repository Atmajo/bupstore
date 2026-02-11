import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'data/auth_service.dart';

final authServiceProvider = Provider((ref) {
  return AuthService();
});

final loginProvider = FutureProvider.family<void, (String, String)>((ref, args) async {
  final authService = ref.watch(authServiceProvider);
  await authService.login(args.$1, args.$2);
});

final signupProvider = FutureProvider.family<void, (String, String, String)>(
  (ref, args) async {
    final authService = ref.watch(authServiceProvider);
    await authService.signup(args.$1, args.$2, args.$3);
  },
);

final appleSignInProvider = FutureProvider<void>((ref) async {
  final authService = ref.watch(authServiceProvider);
  await authService.signInWithApple();
});

final faceIdAuthProvider = FutureProvider<bool>((ref) async {
  final authService = ref.watch(authServiceProvider);
  return await authService.authenticateWithFaceId();
});

final logoutProvider = FutureProvider<void>((ref) async {
  final authService = ref.watch(authServiceProvider);
  await authService.logout();
});
