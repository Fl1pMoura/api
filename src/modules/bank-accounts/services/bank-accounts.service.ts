import { Injectable } from "@nestjs/common";
import { CreateBankAccountDto } from "../dto/create-bank-account.dto";
import { UpdateBankAccountDto } from "../dto/update-bank-account.dto";
import { BankAccountsRepository } from "src/shared/database/repositories/bank-accounts.repositories";
import { validateBankAccountOwnershipService } from "./validate-bank-account-ownership.service";

@Injectable()
export class BankAccountsService {
  constructor(
    private readonly BankAccountRepo: BankAccountsRepository,
    private readonly validateBankAccountOwnershipService: validateBankAccountOwnershipService
  ) {}

  create(userId: string, createBankAccountDto: CreateBankAccountDto) {
    const { color, initialBalance, name, type } = createBankAccountDto;
    return this.BankAccountRepo.create({
      data: { userId, color, initialBalance, name, type },
    });
  }

  async findAllByUserId(userId: string) {
    const bankAccounts = await this.BankAccountRepo.findMany({
      where: { userId },
      include: {
        transactions: {
          select: { value: true, type: true },
        },
      },
    });

    return bankAccounts.map(({ transactions, ...bankAccount }) => {
      const totalTransaction = transactions.reduce(
        (acc, transaction) =>
          acc +
          (transaction.type === "INCOME"
            ? transaction.value
            : -transaction.value),
        0
      );

      const currentBalance = bankAccount.initialBalance + totalTransaction;
      return {
        ...bankAccount,
        transactions,
        currentBalance,
      };
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} bankAccount`;
  }

  async update(
    userId: string,
    bankAccountId: string,
    updateBankAccountDto: UpdateBankAccountDto
  ) {
    const { color, initialBalance, name, type } = updateBankAccountDto;
    await this.validateBankAccountOwnershipService.validate(
      userId,
      bankAccountId
    );

    return this.BankAccountRepo.update({
      where: { id: bankAccountId },
      data: { color, initialBalance, name, type },
    });
  }

  async remove(userId: string, bankAccountId: string) {
    await this.validateBankAccountOwnershipService.validate(
      userId,
      bankAccountId
    );

    await this.BankAccountRepo.delete({
      where: { id: bankAccountId },
    });
  }
}
