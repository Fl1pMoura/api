import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repositories';
export declare class validateBankAccountOwnershipService {
    private readonly BankAccountRepo;
    constructor(BankAccountRepo: BankAccountsRepository);
    validate(userId: string, bankAccountId: string): Promise<void>;
}
