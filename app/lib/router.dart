import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'features/auth/presentation/pages/login_page.dart';
import 'features/auth/presentation/pages/signup_page.dart';
import 'features/dashboard/presentation/pages/dashboard_page.dart';
import 'features/vault/presentation/pages/vault_list_page.dart';
import 'features/vault/presentation/pages/vault_detail_page.dart';
import 'services/auth_storage.dart';

final authStorageProvider = Provider((ref) => AuthStorage());

final authStateProvider = StreamProvider<bool>((ref) async* {
  final storage = ref.watch(authStorageProvider);
  while (true) {
    yield await storage.getToken() != null;
    await Future.delayed(const Duration(seconds: 1));
  }
});

final goRouterProvider = Provider<GoRouter>((ref) {
  final authState = ref.watch(authStateProvider);

  return GoRouter(
    initialLocation: '/login',
    redirect: (context, state) async {
      final isLoggedIn = authState.whenData((value) => value).value ?? false;
      final isLoggingIn = state.matchedLocation == '/login' ||
          state.matchedLocation == '/signup';

      if (!isLoggedIn && !isLoggingIn) {
        return '/login';
      }

      if (isLoggedIn && isLoggingIn) {
        return '/dashboard';
      }

      return null;
    },
    routes: [
      GoRoute(
        path: '/login',
        builder: (context, state) => const LoginPage(),
      ),
      GoRoute(
        path: '/signup',
        builder: (context, state) => const SignupPage(),
      ),
      GoRoute(
        path: '/dashboard',
        builder: (context, state) => const DashboardPage(),
      ),
      GoRoute(
        path: '/vault',
        builder: (context, state) => const VaultListPage(),
        routes: [
          GoRoute(
            path: ':domainId',
            builder: (context, state) => VaultDetailPage(
              domainId: state.pathParameters['domainId']!,
            ),
          ),
        ],
      ),
    ],
  );
});
