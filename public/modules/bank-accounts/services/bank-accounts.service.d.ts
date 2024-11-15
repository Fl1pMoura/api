import { CreateBankAccountDto } from "../dto/create-bank-account.dto";
import { UpdateBankAccountDto } from "../dto/update-bank-account.dto";
import { BankAccountsRepository } from "src/shared/database/repositories/bank-accounts.repositories";
import { validateBankAccountOwnershipService } from "./validate-bank-account-ownership.service";
export declare class BankAccountsService {
    private readonly BankAccountRepo;
    private readonly validateBankAccountOwnershipService;
    constructor(BankAccountRepo: BankAccountsRepository, validateBankAccountOwnershipService: validateBankAccountOwnershipService);
    create(userId: string, createBankAccountDto: CreateBankAccountDto): import(".prisma/client").Prisma.Prisma__BankAccountClient<{
        id: string;
        userId: string;
        name: string;
        initialBalance: number;
        type: import(".prisma/client").$Enums.BankAccountType;
        color: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAllByUserId(userId: string): Promise<{
        transactions: {
            type: import(".prisma/client").$Enums.TransactionType;
            value: number;
        }[];
        currentBalance: number;
        id: string;
        userId: string;
        name: string;
        initialBalance: number;
        type: import(".prisma/client").$Enums.BankAccountType;
        color: string;
    }[]>;
    findOne(id: number): string;
    update(userId: string, bankAccountId: string, updateBankAccountDto: UpdateBankAccountDto): Promise<{
        id: string;
        userId: string;
        name: string;
        initialBalance: number;
        type: import(".prisma/client").$Enums.BankAccountType;
        color: string;
    }>;
    remove(userId: string, bankAccountId: string): Promise<void>;
}
