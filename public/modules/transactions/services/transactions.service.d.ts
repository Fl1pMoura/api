import { TransactionsRepository } from "src/shared/database/repositories/transactions.repositories";
import { validateBankAccountOwnershipService } from "../../bank-accounts/services/validate-bank-account-ownership.service";
import { validateCategoryOwnershipService } from "../../categories/services/validate-category-ownership.service";
import { CreateTransactionDto } from "../dto/create-transaction.dto";
import { UpdateTransactionDto } from "../dto/update-transaction.dto";
import { TransactionType } from "../entities/Transaction";
import { validateTransactionOwnershipService } from "./validate-transaction-ownership.service";
export declare class TransactionsService {
    private readonly validateBankAccountOwnershipService;
    private readonly validateCategoryOwnershipService;
    private readonly validateTransactionOwnershipService;
    private readonly transactionsRepo;
    constructor(validateBankAccountOwnershipService: validateBankAccountOwnershipService, validateCategoryOwnershipService: validateCategoryOwnershipService, validateTransactionOwnershipService: validateTransactionOwnershipService, transactionsRepo: TransactionsRepository);
    create(userId: string, createTransactionDto: CreateTransactionDto): Promise<{
        id: string;
        userId: string;
        bankAccountId: string;
        categoryId: string | null;
        name: string;
        value: number;
        date: Date;
        type: import(".prisma/client").$Enums.TransactionType;
    }>;
    findAllByUserId(userId: string, filters: {
        month: number;
        year: number;
        bankAccountId?: string;
        transactionType?: TransactionType;
    }): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        userId: string;
        bankAccountId: string;
        categoryId: string | null;
        name: string;
        value: number;
        date: Date;
        type: import(".prisma/client").$Enums.TransactionType;
    }[]>;
    update(userId: string, transactionId: string, updateTransactionDto: UpdateTransactionDto): Promise<{
        id: string;
        userId: string;
        bankAccountId: string;
        categoryId: string | null;
        name: string;
        value: number;
        date: Date;
        type: import(".prisma/client").$Enums.TransactionType;
    }>;
    remove(userId: string, transactionId: string): Promise<any>;
    private validateEntitiesOwnership;
}
