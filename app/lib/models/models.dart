class User {
  final String id;
  final String email;
  final String? username;
  final DateTime createdAt;
  final DateTime? updatedAt;

  User({
    required this.id,
    required this.email,
    this.username,
    required this.createdAt,
    this.updatedAt,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'] as String,
      email: json['email'] as String,
      username: json['username'] as String?,
      createdAt: DateTime.parse(json['createdAt'] as String),
      updatedAt: json['updatedAt'] != null
          ? DateTime.parse(json['updatedAt'] as String)
          : null,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'email': email,
      'username': username,
      'createdAt': createdAt.toIso8601String(),
      'updatedAt': updatedAt?.toIso8601String(),
    };
  }
}

class Domain {
  final String id;
  final String name;
  final String? description;
  final int codesCount;
  final DateTime createdAt;
  final DateTime? updatedAt;

  Domain({
    required this.id,
    required this.name,
    this.description,
    required this.codesCount,
    required this.createdAt,
    this.updatedAt,
  });

  factory Domain.fromJson(Map<String, dynamic> json) {
    return Domain(
      id: json['id'] as String,
      name: json['name'] as String,
      description: json['description'] as String?,
      codesCount: json['codesCount'] as int? ?? 0,
      createdAt: DateTime.parse(json['createdAt'] as String),
      updatedAt: json['updatedAt'] != null
          ? DateTime.parse(json['updatedAt'] as String)
          : null,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'description': description,
      'codesCount': codesCount,
      'createdAt': createdAt.toIso8601String(),
      'updatedAt': updatedAt?.toIso8601String(),
    };
  }
}

class Code {
  final String id;
  final String code;
  final String domainId;
  final String domain;
  final String? label;
  final DateTime createdAt;
  final DateTime? updatedAt;

  Code({
    required this.id,
    required this.code,
    required this.domainId,
    required this.domain,
    this.label,
    required this.createdAt,
    this.updatedAt,
  });

  factory Code.fromJson(Map<String, dynamic> json) {
    return Code(
      id: json['id'] as String,
      code: json['code'] as String,
      domainId: json['domainId'] as String,
      domain: json['domain'] as String,
      label: json['label'] as String?,
      createdAt: DateTime.parse(json['createdAt'] as String),
      updatedAt: json['updatedAt'] != null
          ? DateTime.parse(json['updatedAt'] as String)
          : null,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'code': code,
      'domainId': domainId,
      'domain': domain,
      'label': label,
      'createdAt': createdAt.toIso8601String(),
      'updatedAt': updatedAt?.toIso8601String(),
    };
  }
}
