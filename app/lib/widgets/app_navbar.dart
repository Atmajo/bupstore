import 'package:flutter/cupertino.dart';
import '../config/theme.dart';
import '../core/constants/app_constants.dart';
import 'glass_container.dart';

class AppNavBar extends StatelessWidget {
  final String title;
  final VoidCallback? onBackPressed;
  final List<Widget>? trailingActions;
  final bool showBackButton;

  const AppNavBar({
    Key? key,
    required this.title,
    this.onBackPressed,
    this.trailingActions,
    this.showBackButton = true,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GlassContainer(
      borderRadius: 0,
      padding: const EdgeInsets.fromLTRB(16, 12, 16, 12),
      margin: const EdgeInsets.only(bottom: 8),
      opacity: 0.1,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          if (showBackButton)
            GestureDetector(
              onTap: onBackPressed,
              child: Icon(
                CupertinoIcons.back,
                color: AppTheme.primaryColor,
              ),
            )
          else
            const SizedBox(width: 40),
          Text(
            title,
            style: const TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.w600,
            ),
          ),
          if (trailingActions != null && trailingActions!.isNotEmpty)
            Row(
              mainAxisSize: MainAxisSize.min,
              children: trailingActions!,
            )
          else
            const SizedBox(width: 40),
        ],
      ),
    );
  }
}
