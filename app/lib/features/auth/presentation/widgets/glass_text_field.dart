import 'package:flutter/cupertino.dart';
import '../../../../config/theme.dart';
import '../../../../core/constants/app_constants.dart';
import '../../../../widgets/glass_container.dart';

class GlassTextField extends StatefulWidget {
  final String placeholder;
  final TextEditingController controller;
  final TextInputType keyboardType;
  final bool obscureText;
  final String? Function(String?)? validator;
  final IconData? prefixIcon;
  final IconData? suffixIcon;
  final VoidCallback? onSuffixIconTap;
  final int? maxLines;

  const GlassTextField({
    Key? key,
    required this.placeholder,
    required this.controller,
    this.keyboardType = TextInputType.text,
    this.obscureText = false,
    this.validator,
    this.prefixIcon,
    this.suffixIcon,
    this.onSuffixIconTap,
    this.maxLines = 1,
  }) : super(key: key);

  @override
  State<GlassTextField> createState() => _GlassTextFieldState();
}

class _GlassTextFieldState extends State<GlassTextField> {
  late bool _obscureText;
  String? _errorText;

  @override
  void initState() {
    super.initState();
    _obscureText = widget.obscureText;
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        GlassContainer(
          borderRadius: AppConstants.radiusL,
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
          opacity: 0.08,
          border: Border.all(
            color: _errorText != null
                ? AppTheme.accentColor
                : AppTheme.primaryColor.withOpacity(0.3),
            width: 1.5,
          ),
          child: Row(
            children: [
              if (widget.prefixIcon != null) ...[
                Icon(
                  widget.prefixIcon,
                  color: AppTheme.primaryColor,
                ),
                const SizedBox(width: 12),
              ],
              Expanded(
                child: CupertinoTextField(
                  controller: widget.controller,
                  placeholder: widget.placeholder,
                  keyboardType: widget.keyboardType,
                  obscureText: _obscureText,
                  maxLines: widget.maxLines,
                  decoration: BoxDecoration(
                    color: CupertinoColors.transparent,
                    border: Border.all(
                      color: CupertinoColors.transparent,
                    ),
                  ),
                  padding: const EdgeInsets.symmetric(vertical: 12),
                  onChanged: (value) {
                    setState(() {
                      _errorText = widget.validator?.call(value);
                    });
                  },
                ),
              ),
              if (widget.obscureText) ...[
                GestureDetector(
                  onTap: () {
                    setState(() {
                      _obscureText = !_obscureText;
                    });
                  },
                  child: Icon(
                    _obscureText
                        ? CupertinoIcons.eye
                        : CupertinoIcons.eye_slash,
                    color: AppTheme.primaryColor,
                  ),
                ),
              ] else if (widget.suffixIcon != null) ...[
                GestureDetector(
                  onTap: widget.onSuffixIconTap,
                  child: Icon(
                    widget.suffixIcon,
                    color: AppTheme.primaryColor,
                  ),
                ),
              ],
            ],
          ),
        ),
        if (_errorText != null) ...[
          const SizedBox(height: 8),
          Text(
            _errorText!,
            style: const TextStyle(
              color: AppTheme.accentColor,
              fontSize: 12,
            ),
          ),
        ],
      ],
    );
  }
}
