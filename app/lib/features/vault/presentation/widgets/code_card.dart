import 'package:flutter/cupertino.dart';
import 'package:flutter/services.dart';
import '../../../../config/theme.dart';
import '../../../../core/constants/app_constants.dart';
import '../../../../widgets/glass_container.dart';

class CodeCard extends StatefulWidget {
  final String code;
  final String domain;
  final String label;
  final VoidCallback? onDelete;
  final bool isLoading;

  const CodeCard({
    Key? key,
    required this.code,
    required this.domain,
    required this.label,
    this.onDelete,
    this.isLoading = false,
  }) : super(key: key);

  @override
  State<CodeCard> createState() => _CodeCardState();
}

class _CodeCardState extends State<CodeCard> {
  bool _isCopied = false;

  void _copyToClipboard() {
    Clipboard.setData(ClipboardData(text: widget.code));
    setState(() {
      _isCopied = true;
    });
    Future.delayed(const Duration(seconds: 2), () {
      if (mounted) {
        setState(() {
          _isCopied = false;
        });
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return GlassContainer(
      borderRadius: AppConstants.radiusL,
      padding: const EdgeInsets.all(AppConstants.spacingM),
      opacity: 0.1,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      widget.label,
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: TextStyle(
                        fontSize: AppConstants.fontM,
                        fontWeight: FontWeight.w600,
                        color: AppTheme.getTextColor(context),
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      widget.domain,
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: TextStyle(
                        fontSize: AppConstants.fontXS,
                        color: AppTheme.textSecondary,
                      ),
                    ),
                  ],
                ),
              ),
              if (widget.onDelete != null)
                GestureDetector(
                  onTap: widget.isLoading ? null : widget.onDelete,
                  child: Icon(
                    CupertinoIcons.trash,
                    color: widget.isLoading
                        ? AppTheme.textSecondary
                        : AppTheme.accentColor,
                  ),
                ),
            ],
          ),
          const SizedBox(height: 12),
          GestureDetector(
            onTap: _copyToClipboard,
            child: GlassContainer(
              borderRadius: AppConstants.radiusM,
              padding: const EdgeInsets.symmetric(
                horizontal: AppConstants.spacingM,
                vertical: AppConstants.spacingS,
              ),
              opacity: 0.05,
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Expanded(
                    child: Text(
                      _isCopied ? 'Copied!' : widget.code,
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: TextStyle(
                        fontSize: AppConstants.fontM,
                        fontWeight: FontWeight.w500,
                        color: _isCopied
                            ? AppTheme.primaryColor
                            : AppTheme.getTextColor(context),
                        letterSpacing: 2,
                      ),
                    ),
                  ),
                  const SizedBox(width: 8),
                  Icon(
                    CupertinoIcons.doc_on_doc,
                    size: 16,
                    color: _isCopied
                        ? AppTheme.primaryColor
                        : AppTheme.textSecondary,
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
