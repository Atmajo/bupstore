class AppException implements Exception {
  final String message;
  final String? code;
  final dynamic originalError;

  AppException({
    required this.message,
    this.code,
    this.originalError,
  });

  @override
  String toString() => message;
}

class NetworkException extends AppException {
  NetworkException({
    required String message,
    String? code,
    dynamic originalError,
  }) : super(
    message: message,
    code: code ?? 'network_error',
    originalError: originalError,
  );
}

class AuthenticationException extends AppException {
  AuthenticationException({
    required String message,
    String? code,
    dynamic originalError,
  }) : super(
    message: message,
    code: code ?? 'auth_error',
    originalError: originalError,
  );
}

class ValidationException extends AppException {
  ValidationException({
    required String message,
    String? code,
    dynamic originalError,
  }) : super(
    message: message,
    code: code ?? 'validation_error',
    originalError: originalError,
  );
}

class ServerException extends AppException {
  ServerException({
    required String message,
    String? code,
    dynamic originalError,
  }) : super(
    message: message,
    code: code ?? 'server_error',
    originalError: originalError,
  );
}

class CacheException extends AppException {
  CacheException({
    required String message,
    String? code,
    dynamic originalError,
  }) : super(
    message: message,
    code: code ?? 'cache_error',
    originalError: originalError,
  );
}
