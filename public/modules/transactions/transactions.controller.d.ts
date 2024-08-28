import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { UpdateTransactionDto } from "./dto/update-transaction.dto";
import { TransactionType } from "./entities/Transaction";
import { TransactionsService } from "./services/transactions.service";
export declare class TransactionsController {
    private readonly transactionsService;
    constructor(transactionsService: TransactionsService);
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
    findAll(userId: string, month: number, year: number, bankAccountId?: string, transactionType?: TransactionType): import(".prisma/client").Prisma.PrismaPromise<{
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
}
