class Endpoints {
  // Auth
  static const String login = '/auth/login';
  static const String signup = '/auth/signup';
  static const String logout = '/auth/logout';
  static const String refresh = '/auth/refresh';
  static const String appleSignIn = '/auth/apple-signin';
  
  // User
  static const String getUser = '/users/me';
  static const String updateUser = '/users/me';
  
  // Domains
  static const String getDomains = '/domains';
  static const String getDomain = '/domains/:id';
  static const String createDomain = '/domains';
  static const String updateDomain = '/domains/:id';
  static const String deleteDomain = '/domains/:id';
  
  // Codes
  static const String getCodes = '/domains/:domainId/codes';
  static const String getCode = '/codes/:id';
  static const String addCodes = '/codes';
  static const String deleteCode = '/codes/:id';
  
  // Backup
  static const String backupVault = '/backup/vault';
}
