import 'package:flutter/cupertino.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../config/theme.dart';
import '../core/constants/app_constants.dart';
import 'glass_container.dart';

class SnackBarHelper {
  static void showError(
    BuildContext context,
    String message, {
    Duration duration = const Duration(seconds: 3),
  }) {
    _showSnackBar(context, message, AppTheme.accentColor, duration);
  }

  static void showSuccess(
    BuildContext context,
    String message, {
    Duration duration = const Duration(seconds: 3),
  }) {
    _showSnackBar(context, message, AppTheme.primaryColor, duration);
  }

  static void showInfo(
    BuildContext context,
    String message, {
    Duration duration = const Duration(seconds: 3),
  }) {
    _showSnackBar(context, message, AppTheme.secondaryColor, duration);
  }

  static void _showSnackBar(
    BuildContext context,
    String message,
    Color color, [
    Duration duration = const Duration(seconds: 3),
  ]) {
    showCupertinoDialog(
      context: context,
      builder: (_) => _SnackBarWidget(
        message: message,
        color: color,
        duration: duration,
      ),
    );
  }
}

class _SnackBarWidget extends StatefulWidget {
  final String message;
  final Color color;
  final Duration duration;

  const _SnackBarWidget({
    required this.message,
    required this.color,
    required this.duration,
  });

  @override
  State<_SnackBarWidget> createState() => __SnackBarWidgetState();
}

class __SnackBarWidgetState extends State<_SnackBarWidget> {
  late Future<void> _dismissFuture;

  @override
  void initState() {
    super.initState();
    _dismissFuture = Future.delayed(widget.duration).then((_) {
      if (mounted) {
        Navigator.pop(context);
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return WillPopScope(
      onWillPop: () async => true,
      child: Center(
        child: GlassContainer(
          backgroundColor: widget.color.withOpacity(0.9),
          padding: const EdgeInsets.symmetric(
            horizontal: AppConstants.spacingL,
            vertical: AppConstants.spacingM,
          ),
          borderRadius: AppConstants.radiusL,
          opacity: 0.9,
          child: Text(
            widget.message,
            style: const TextStyle(
              color: CupertinoColors.white,
              fontWeight: FontWeight.w500,
            ),
            textAlign: TextAlign.center,
          ),
        ),
      ),
    );
  }
}
