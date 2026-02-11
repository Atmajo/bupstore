class ConnectionStatus {
  final bool isConnected;
  final ConnectionType type;

  ConnectionStatus({
    required this.isConnected,
    required this.type,
  });

  @override
  String toString() => 'ConnectionStatus(isConnected: $isConnected, type: $type)';
}

enum ConnectionType { wifi, mobile, none }

/// Network connectivity monitoring
class ConnectivityService {
  static final instance = ConnectivityService._internal();

  factory ConnectivityService() {
    return instance;
  }

  ConnectivityService._internal();

  Stream<ConnectionStatus> get connectionStream {
    // Mock implementation - in production, use connectivity_plus
    return Stream.value(
      ConnectionStatus(
        isConnected: true,
        type: ConnectionType.wifi,
      ),
    );
  }

  Future<ConnectionStatus> checkConnectivity() async {
    // Mock implementation - in production, use connectivity_plus
    return ConnectionStatus(
      isConnected: true,
      type: ConnectionType.wifi,
    );
  }
}
