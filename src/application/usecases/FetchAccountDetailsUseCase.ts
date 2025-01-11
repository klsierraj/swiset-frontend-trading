import { UserRepository } from '../../infrastructure/repositories/UserRepository';
import { AuthenticatedUser } from '../../domain/entities/AuthenticatedUser';

export class FetchAccountDetailsUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(token: string): Promise<AuthenticatedUser> {
    const data = await this.userRepository.fetchAccountDetails(token);
    return new AuthenticatedUser(
      data.id,
      data.login,
      data.firstName,
      data.lastName,
      data.email,
      data.imageUrl,
      data.activated
    );
  }
}
