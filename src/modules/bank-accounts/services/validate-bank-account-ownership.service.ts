import { Injectable, NotFoundException } from "@nestjs/common";
import { BankAccountsRepository } from "src/shared/database/repositories/bank-accounts.repositories";

@Injectable()
export class validateBankAccountOwnershipService {
  constructor(private readonly BankAccountRepo: BankAccountsRepository) {}
  async validate(userId: string, bankAccountId: string) {
    const isOwner = await this.BankAccountRepo.findFirst({
      where: { userId, id: bankAccountId },
    });

    if (!isOwner) {
      throw new NotFoundException("Conta bancária não encontrada");
    }
  }
}
