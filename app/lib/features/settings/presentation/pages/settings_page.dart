import 'package:flutter/cupertino.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../../../config/theme.dart';
import '../../../../core/constants/app_constants.dart';
import '../../../../widgets/glass_button.dart';
import '../features/auth/providers.dart';

class SettingsPage extends ConsumerStatefulWidget {
  const SettingsPage({Key? key}) : super(key: key);

  @override
  ConsumerState<SettingsPage> createState() => _SettingsPageState();
}

class _SettingsPageState extends ConsumerState<SettingsPage> {
  bool _notificationsEnabled = true;
  bool _biometricEnabled = true;

  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
      backgroundColor: AppTheme.getBackgroundColor(context),
      navigationBar: CupertinoNavigationBar(
        middle: Text(
          'Settings',
          style: TextStyle(
            color: AppTheme.getTextColor(context),
          ),
        ),
      ),
      child: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(AppConstants.spacingL),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Notifications Section
              Text(
                'Notifications',
                style: TextStyle(
                  fontSize: AppConstants.fontM,
                  fontWeight: FontWeight.w600,
                  color: AppTheme.getTextColor(context),
                ),
              ),
              const SizedBox(height: 12),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    'Enable Notifications',
                    style: TextStyle(
                      color: AppTheme.getTextColor(context),
                    ),
                  ),
                  CupertinoSwitch(
                    value: _notificationsEnabled,
                    onChanged: (value) {
                      setState(() {
                        _notificationsEnabled = value;
                      });
                    },
                    activeColor: AppTheme.primaryColor,
                  ),
                ],
              ),
              const SizedBox(height: 24),

              // Security Section
              Text(
                'Security',
                style: TextStyle(
                  fontSize: AppConstants.fontM,
                  fontWeight: FontWeight.w600,
                  color: AppTheme.getTextColor(context),
                ),
              ),
              const SizedBox(height: 12),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    'Biometric Authentication',
                    style: TextStyle(
                      color: AppTheme.getTextColor(context),
                    ),
                  ),
                  CupertinoSwitch(
                    value: _biometricEnabled,
                    onChanged: (value) {
                      setState(() {
                        _biometricEnabled = value;
                      });
                    },
                    activeColor: AppTheme.primaryColor,
                  ),
                ],
              ),
              const SizedBox(height: 24),

              // About Section
              Text(
                'About',
                style: TextStyle(
                  fontSize: AppConstants.fontM,
                  fontWeight: FontWeight.w600,
                  color: AppTheme.getTextColor(context),
                ),
              ),
              const SizedBox(height: 12),
              Text(
                'App Version: 1.0.0',
                style: TextStyle(
                  color: AppTheme.textSecondary,
                ),
              ),
              const SizedBox(height: 24),

              // Logout Section
              GlassButton(
                label: 'Sign Out',
                onPressed: () async {
                  await ref.read(logoutProvider.future);
                  if (mounted) {
                    context.go('/login');
                  }
                },
                backgroundColor: AppTheme.accentColor,
                minimumSize: const Size(double.infinity, 54),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
