import 'package:flutter/cupertino.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../../../core/constants/app_constants.dart';
import '../../../../core/utils/validators.dart';
import '../../../../widgets/glass_button.dart';
import '../../../../config/theme.dart';
import '../widgets/glass_text_field.dart';
import '../providers.dart';

class SignupPage extends ConsumerStatefulWidget {
  const SignupPage({Key? key}) : super(key: key);

  @override
  ConsumerState<SignupPage> createState() => _SignupPageState();
}

class _SignupPageState extends ConsumerState<SignupPage> {
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _usernameController = TextEditingController();
  bool _isLoading = false;
  String? _errorMessage;
  bool _agreeToTerms = false;

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    _usernameController.dispose();
    super.dispose();
  }

  Future<void> _handleSignup() async {
    setState(() {
      _errorMessage = null;
    });

    if (!_agreeToTerms) {
      setState(() {
        _errorMessage = 'You must agree to terms and conditions';
      });
      return;
    }

    final emailError = Validators.validateEmail(_emailController.text);
    final passwordError = Validators.validatePassword(_passwordController.text);
    final usernameError = Validators.validateUsername(_usernameController.text);

    if (emailError != null || passwordError != null || usernameError != null) {
      setState(() {
        _errorMessage = emailError ?? passwordError ?? usernameError;
      });
      return;
    }

    setState(() {
      _isLoading = true;
    });

    try {
      await ref.read(signupProvider((
        _emailController.text,
        _passwordController.text,
        _usernameController.text,
      )).future);

      if (mounted) {
        context.go('/dashboard');
      }
    } catch (e) {
      setState(() {
        _errorMessage = 'Signup failed. Please try again.';
      });
    } finally {
      if (mounted) {
        setState(() {
          _isLoading = false;
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
      backgroundColor: AppTheme.getBackgroundColor(context),
      child: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(AppConstants.spacingL),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const SizedBox(height: 40),
              Text(
                'Create Account',
                style: TextStyle(
                  fontSize: AppConstants.font2XL,
                  fontWeight: FontWeight.w700,
                  color: AppTheme.getTextColor(context),
                ),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 12),
              Text(
                'Get started with BupStore',
                style: TextStyle(
                  fontSize: AppConstants.fontM,
                  color: AppTheme.textSecondary,
                ),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 48),
              GlassTextField(
                placeholder: 'Username',
                controller: _usernameController,
                prefixIcon: CupertinoIcons.person,
                validator: Validators.validateUsername,
              ),
              const SizedBox(height: 16),
              GlassTextField(
                placeholder: 'Email',
                controller: _emailController,
                keyboardType: TextInputType.emailAddress,
                prefixIcon: CupertinoIcons.mail,
                validator: Validators.validateEmail,
              ),
              const SizedBox(height: 16),
              GlassTextField(
                placeholder: 'Password',
                controller: _passwordController,
                obscureText: true,
                prefixIcon: CupertinoIcons.lock,
                validator: Validators.validatePassword,
              ),
              const SizedBox(height: 24),
              Row(
                children: [
                  CupertinoCheckbox(
                    value: _agreeToTerms,
                    onChanged: (value) {
                      setState(() {
                        _agreeToTerms = value ?? false;
                      });
                    },
                  ),
                  Expanded(
                    child: Text(
                      'I agree to terms and conditions',
                      style: TextStyle(
                        color: AppTheme.getTextColor(context),
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 24),
              if (_errorMessage != null)
                Padding(
                  padding: const EdgeInsets.only(bottom: 16),
                  child: Text(
                    _errorMessage!,
                    style: const TextStyle(
                      color: AppTheme.accentColor,
                      fontSize: AppConstants.fontS,
                    ),
                    textAlign: TextAlign.center,
                  ),
                ),
              GlassButton(
                label: 'Create Account',
                onPressed: _handleSignup,
                isLoading: _isLoading,
                minimumSize: const Size(double.infinity, 54),
              ),
              const SizedBox(height: 24),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    'Already have an account? ',
                    style: TextStyle(
                      color: AppTheme.getTextColor(context),
                    ),
                  ),
                  GestureDetector(
                    onTap: () => context.go('/login'),
                    child: Text(
                      'Sign in',
                      style: TextStyle(
                        color: AppTheme.primaryColor,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
