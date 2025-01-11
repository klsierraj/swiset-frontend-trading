import type { RegisteringUser } from "../../domain/entities/RegisteringUser";
import type { IBrokerAccount } from "../types/IBrokerAccount";
import type { RegisterResponse } from "../types/UserResponse";

export interface IUserRepository {
    checkUserExists(email?: string, username?: string): Promise<number>;
    registerUser(user: RegisteringUser): Promise<RegisterResponse>;
    validateActivationCode(email: string, key: string): Promise<{ success: boolean; message?: string }>;
    sendActivationCode(email: string): Promise<{ success: boolean; message?: string }>;

    fetchUserBrokers(token: string): Promise<IBrokerAccount[]>;
    addBroker(payload: {
      broker: { id: number };
      user: { id: number };
      type: string;
      identifier: string;
      currency: string;
      token: string;
    }): Promise<{ id: number }>;
  }
  