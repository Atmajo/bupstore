import 'package:local_auth/error_codes.dart' as auth_error;
import 'package:local_auth/local_auth.dart';
import 'package:sign_in_with_apple/sign_in_with_apple.dart';
import '../../../core/utils/logger.dart';
import '../../../services/api_service.dart';
import '../../../services/auth_storage.dart';
import '../../../config/app_config.dart';

class AuthService {
  late ApiService _apiService;
  late AuthStorage _authStorage;
  final LocalAuthentication _localAuth = LocalAuthentication();

  AuthService() {
    _apiService = ApiService(AuthStorage());
    _authStorage = AuthStorage();
  }

  Future<void> login(String email, String password) async {
    try {
      final response = await _apiService.post<Map<String, dynamic>>(
        '/auth/login',
        data: {
          'email': email,
          'password': password,
        },
      );

      final token = response['token'] as String;
      final userId = response['userId'] as String;

      await _authStorage.saveToken(token);
      await _authStorage.saveUserInfo(userId, email);

      AppLogger.info('Login successful');
    } catch (e) {
      AppLogger.error('Login failed: $e');
      rethrow;
    }
  }

  Future<void> signup(String email, String password, String username) async {
    try {
      final response = await _apiService.post<Map<String, dynamic>>(
        '/auth/signup',
        data: {
          'email': email,
          'password': password,
          'username': username,
        },
      );

      final token = response['token'] as String;
      final userId = response['userId'] as String;

      await _authStorage.saveToken(token);
      await _authStorage.saveUserInfo(userId, email);

      AppLogger.info('Signup successful');
    } catch (e) {
      AppLogger.error('Signup failed: $e');
      rethrow;
    }
  }

  Future<void> signInWithApple() async {
    try {
      final credential = await SignInWithApple.getAppleIDCredential(
        scopes: [
          AppleIDAuthorizationScopes.email,
          AppleIDAuthorizationScopes.fullName,
        ],
      );

      final response = await _apiService.post<Map<String, dynamic>>(
        '/auth/apple-signin',
        data: {
          'identityToken': credential.identityToken,
          'userIdentifier': credential.userIdentifier,
          'email': credential.email,
        },
      );

      final token = response['token'] as String;
      final userId = response['userId'] as String;
      final email = response['email'] as String? ?? credential.email ?? '';

      await _authStorage.saveToken(token);
      await _authStorage.saveUserInfo(userId, email);

      AppLogger.info('Apple Sign-In successful');
    } catch (e) {
      AppLogger.error('Apple Sign-In failed: $e');
      rethrow;
    }
  }

  Future<void> signInWithGoogle() async {
    try {
      final googleUser = await _googleSignIn.signIn();
      if (googleUser == null) return;

      final googleAuth = await googleUser.authentication;

      final response = await _apiService.post<Map<String, dynamic>>(
        '/auth/google-signin',
        data: {
          'idToken': googleAuth.idToken,
          'accessToken': googleAuth.accessToken,
          'email': googleUser.email,
        },
      );

      final token = response['token'] as String;
      final userId = response['userId'] as String;

      await _authStorage.saveToken(token);
      await _authStorage.saveUserInfo(userId, googleUser.email);

      AppLogger.info('Google Sign-In successful');
    } catch (e) {
      AppLogger.error('Google Sign-In failed: $e');
      rethrow;
    }
  }

  Future<bool> authenticateWithBiometric() async {
    try {
      final canAuthenticateWithBiometrics =
          await _localAuth.canCheckBiometrics;
      final canAuthenticate =
          canAuthenticateWithBiometrics ||
          await _localAuth.deviceSupportsPassword;

      if (!canAuthenticate) {
        AppLogger.warning('Device does not support biometric authentication');
        return false;
      }

      final isAuthenticated = await _localAuth.authenticate(
        localizedReason: 'Authenticate to access your vault',
        options: const AuthenticationOptions(
          stickyAuth: true,
          biometricOnly: true,
        ),
      );

      return isAuthenticated;
    } on auth_error.NotAvailableException {
      AppLogger.error('Biometric authentication not available');
      return false;
    } on Exception catch (e) {
      AppLogger.error('Biometric authentication failed: $e');
      return false;
    }
  }

  Future<void> logout() async {
    try {
      await _apiService.post('/auth/logout');
      await _authStorage.clearAll();
      await _googleSignIn.signOut();
      AppLogger.info('Logout successful');
    } catch (e) {
      AppLogger.error('Logout failed: $e');
      await _authStorage.clearAll();
    }
  }

  Future<bool> isAuthenticated() async {
    return await _authStorage.isTokenAvailable();
  }
}
