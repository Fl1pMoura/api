import { TransactionsRepository } from "src/shared/database/repositories/transactions.repositories";
export declare class validateTransactionOwnershipService {
    private readonly transacitonRepo;
    constructor(transacitonRepo: TransactionsRepository);
    validate(userId: string, transactionId: string): Promise<void>;
}
