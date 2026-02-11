import 'package:flutter/cupertino.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../config/theme.dart';

/// Mutation Provider for theme switching
final themeSwitchProvider = StateProvider<Brightness>((ref) {
  return Brightness.light;
});

/// Provider for checking if dark mode is enabled
final isDarkModeProvider = Provider<bool>((ref) {
  return ref.watch(themeSwitchProvider) == Brightness.dark;
});

/// Provider for app state management
class AppState {
  final bool isLoading;
  final String? error;
  final bool isAuthenticated;

  AppState({
    this.isLoading = false,
    this.error,
    this.isAuthenticated = false,
  });

  AppState copyWith({
    bool? isLoading,
    String? error,
    bool? isAuthenticated,
  }) {
    return AppState(
      isLoading: isLoading ?? this.isLoading,
      error: error,
      isAuthenticated: isAuthenticated ?? this.isAuthenticated,
    );
  }
}

final appStateProvider = StateNotifierProvider<AppStateNotifier, AppState>(
  (ref) => AppStateNotifier(),
);

class AppStateNotifier extends StateNotifier<AppState> {
  AppStateNotifier() : super(AppState());

  void setLoading(bool isLoading) {
    state = state.copyWith(isLoading: isLoading);
  }

  void setError(String? error) {
    state = state.copyWith(error: error);
  }

  void setAuthenticated(bool isAuthenticated) {
    state = state.copyWith(isAuthenticated: isAuthenticated);
  }
}
