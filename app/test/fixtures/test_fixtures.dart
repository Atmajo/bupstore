// Test utilities and fixtures
import '../models/models.dart';

class TestFixtures {
  static const mockUserId = 'user-123';
  static const mockUserEmail = 'test@bupstore.app';
  static const mockUserUsername = 'testuser';

  static User getMockUser({
    String id = mockUserId,
    String email = mockUserEmail,
    String? username = mockUserUsername,
  }) {
    return User(
      id: id,
      email: email,
      username: username,
      createdAt: DateTime.now(),
      updatedAt: null,
    );
  }

  static Domain getMockDomain({
    String id = 'domain-123',
    String name = 'Example Domain',
    String? description,
    int codesCount = 5,
  }) {
    return Domain(
      id: id,
      name: name,
      description: description,
      codesCount: codesCount,
      createdAt: DateTime.now(),
      updatedAt: null,
    );
  }

  static List<Domain> getMockDomains({int count = 3}) {
    return List.generate(
      count,
      (i) => getMockDomain(
        id: 'domain-$i',
        name: 'Domain $i',
        codesCount: (i + 1) * 2,
      ),
    );
  }

  static Code getMockCode({
    String id = 'code-123',
    String code = '123456',
    String domainId = 'domain-123',
    String domain = 'example.com',
    String? label = 'Backup Code',
  }) {
    return Code(
      id: id,
      code: code,
      domainId: domainId,
      domain: domain,
      label: label,
      createdAt: DateTime.now(),
      updatedAt: null,
    );
  }

  static List<Code> getMockCodes({int count = 5}) {
    return List.generate(
      count,
      (i) => getMockCode(
        id: 'code-$i',
        code: (100000 + i).toString(),
        label: 'Code ${i + 1}',
      ),
    );
  }
}
