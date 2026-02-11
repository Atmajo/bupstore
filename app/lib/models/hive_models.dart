import 'package:hive/hive.dart';

@HiveType(typeId: 0)
class LocalUser extends HiveObject {
  @HiveField(0)
  late String id;

  @HiveField(1)
  late String email;

  @HiveField(2)
  String? username;

  @HiveField(3)
  late DateTime createdAt;

  @HiveField(4)
  DateTime? updatedAt;
}

@HiveType(typeId: 1)
class LocalDomain extends HiveObject {
  @HiveField(0)
  late String id;

  @HiveField(1)
  late String name;

  @HiveField(2)
  String? description;

  @HiveField(3)
  int codesCount = 0;

  @HiveField(4)
  late DateTime createdAt;

  @HiveField(5)
  DateTime? updatedAt;
}

@HiveType(typeId: 2)
class LocalCode extends HiveObject {
  @HiveField(0)
  late String id;

  @HiveField(1)
  late String code;

  @HiveField(2)
  late String domainId;

  @HiveField(3)
  late String domain;

  @HiveField(4)
  String? label;

  @HiveField(5)
  late DateTime createdAt;

  @HiveField(6)
  DateTime? updatedAt;
}
