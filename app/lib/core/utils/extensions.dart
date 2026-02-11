import 'dart:async';

/// Extended string utilities
extension StringExt on String {
  /// Check if string is a valid email
  bool get isValidEmail {
    final emailRegex = RegExp(
      r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$',
    );
    return emailRegex.hasMatch(this);
  }

  /// Check if string is a valid URL
  bool get isValidUrl {
    try {
      Uri.parse(this);
      return this.startsWith('http://') || this.startsWith('https://');
    } catch (e) {
      return false;
    }
  }

  /// Capitalize first letter
  String get capitalize {
    if (isEmpty) return this;
    return '${this[0].toUpperCase()}${substring(1)}';
  }

  /// Check if string is numeric
  bool get isNumeric {
    return RegExp(r'^[0-9]+$').hasMatch(this);
  }

  /// Truncate string with ellipsis
  String truncate(int length) {
    if (this.length <= length) return this;
    return '${substring(0, length)}...';
  }
}

/// Extended date time utilities
extension DateTimeExt on DateTime {
  /// Format as relative time (e.g., "2 hours ago")
  String get timeAgo {
    final duration = DateTime.now().difference(this);

    if (duration.inSeconds < 60) {
      return 'just now';
    } else if (duration.inMinutes < 60) {
      return '${duration.inMinutes} minutes ago';
    } else if (duration.inHours < 24) {
      return '${duration.inHours} hours ago';
    } else if (duration.inDays < 7) {
      return '${duration.inDays} days ago';
    } else {
      return toIso8601String().split('T')[0];
    }
  }

  /// Check if date is today
  bool get isToday {
    final now = DateTime.now();
    return year == now.year && month == now.month && day == now.day;
  }

  /// Check if date is yesterday
  bool get isYesterday {
    final yesterday = DateTime.now().subtract(Duration(days: 1));
    return year == yesterday.year &&
        month == yesterday.month &&
        day == yesterday.day;
  }
}

/// Extended list utilities
extension ListExt<T> on List<T> {
  /// Chunk list into smaller lists
  List<List<T>> chunk(int size) {
    final chunks = <List<T>>[];
    for (var i = 0; i < length; i += size) {
      chunks.add(sublist(i, i + size > length ? length : i + size));
    }
    return chunks;
  }

  /// Remove duplicates while preserving order
  List<T> unique({T Function(T)? by}) {
    final seen = <Object>{};
    final result = <T>[];

    for (final element in this) {
      final identifier = by == null ? element : by(element);
      if (seen.add(identifier)) {
        result.add(element);
      }
    }

    return result;
  }
}

/// Async utilities for streaming
class AsyncUtils {
  /// Debounce a stream
  static Stream<T> debounce<T>(
    Stream<T> source,
    Duration duration,
  ) {
    Timer? timer;
    late StreamController<T> controller;

    StreamSubscription<T>? subscription;

    controller = StreamController<T>(
      onListen: () {
        subscription = source.listen(
          (event) {
            timer?.cancel();
            timer = Timer(duration, () {
              controller.add(event);
            });
          },
          onError: controller.addError,
          onDone: controller.close,
        );
      },
      onCancel: () {
        timer?.cancel();
        subscription?.cancel();
      },
    );

    return controller.stream;
  }

  /// Throttle a stream
  static Stream<T> throttle<T>(
    Stream<T> source,
    Duration duration,
  ) {
    DateTime? lastEvent;
    late StreamController<T> controller;
    StreamSubscription<T>? subscription;

    controller = StreamController<T>(
      onListen: () {
        subscription = source.listen(
          (event) {
            final now = DateTime.now();
            if (lastEvent == null ||
                now.difference(lastEvent!) >= duration) {
              lastEvent = now;
              controller.add(event);
            }
          },
          onError: controller.addError,
          onDone: controller.close,
        );
      },
      onCancel: () {
        subscription?.cancel();
      },
    );

    return controller.stream;
  }
}
