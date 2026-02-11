import 'package:flutter/cupertino.dart';
import 'package:go_router/go_router.dart';
import '../../../../config/theme.dart';
import '../../../../core/constants/app_constants.dart';
import '../../../../widgets/glass_button.dart';

class VaultListPage extends StatefulWidget {
  const VaultListPage({Key? key}) : super(key: key);

  @override
  State<VaultListPage> createState() => _VaultListPageState();
}

class _VaultListPageState extends State<VaultListPage> {
  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
      backgroundColor: AppTheme.getBackgroundColor(context),
      navigationBar: CupertinoNavigationBar(
        middle: Text(
          'Vault',
          style: TextStyle(
            color: AppTheme.getTextColor(context),
          ),
        ),
      ),
      child: SafeArea(
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(
                CupertinoIcons.lock,
                size: 64,
                color: AppTheme.textSecondary,
              ),
              const SizedBox(height: 16),
              Text(
                'Vault',
                style: TextStyle(
                  fontSize: AppConstants.font2XL,
                  fontWeight: FontWeight.w700,
                  color: AppTheme.getTextColor(context),
                ),
              ),
              const SizedBox(height: 8),
              Text(
                'Select a domain from dashboard',
                style: TextStyle(
                  fontSize: AppConstants.fontM,
                  color: AppTheme.textSecondary,
                ),
              ),
              const SizedBox(height: 24),
              GlassButton(
                label: 'Go to Dashboard',
                onPressed: () => context.go('/dashboard'),
                minimumSize: const Size(200, 48),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
