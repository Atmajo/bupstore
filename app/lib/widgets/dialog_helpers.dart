import 'package:flutter/cupertino.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../config/theme.dart';
import '../core/constants/app_constants.dart';
import '../widgets/glass_container.dart';

class GlassModalSheet {
  static Future<T?> show<T>({
    required BuildContext context,
    required String title,
    required Widget content,
    Widget? footer,
    Brightness? brightness,
  }) {
    final isDark = brightness == Brightness.dark;

    return showCupertinoModalPopup<T>(
      context: context,
      builder: (context) => CupertinoActionSheetAction(
        child: GlassContainer(
          borderRadius: AppConstants.radiusL,
          padding: const EdgeInsets.all(AppConstants.spacingL),
          opacity: isDark ? 0.2 : 0.1,
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                title,
                style: TextStyle(
                  fontSize: AppConstants.fontL,
                  fontWeight: FontWeight.w700,
                  color: AppTheme.getTextColor(context),
                ),
              ),
              const SizedBox(height: AppConstants.spacingL),
              content,
              if (footer != null) ...[
                const SizedBox(height: AppConstants.spacingL),
                footer,
              ],
            ],
          ),
        ),
        onPressed: () => Navigator.pop(context),
      ),
    );
  }
}

class GlassDialog {
  static Future<bool?> showConfirmDialog({
    required BuildContext context,
    required String title,
    required String message,
    String confirmText = 'Confirm',
    String cancelText = 'Cancel',
    bool isDangerous = false,
  }) {
    return showCupertinoDialog<bool>(
      context: context,
      builder: (context) => CupertinoAlertDialog(
        title: Text(title),
        content: Text(message),
        actions: [
          CupertinoDialogAction(
            child: Text(cancelText),
            onPressed: () => Navigator.pop(context, false),
          ),
          CupertinoDialogAction(
            isDestructiveAction: isDangerous,
            child: Text(confirmText),
            onPressed: () => Navigator.pop(context, true),
          ),
        ],
      ),
    );
  }
}
