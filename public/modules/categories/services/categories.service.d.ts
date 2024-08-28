import { CategoriesRepository } from "src/shared/database/repositories/categories.repositories";
export declare class CategoriesService {
    private readonly categoriesRepo;
    constructor(categoriesRepo: CategoriesRepository);
    findAllByUserId(userId: string): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        userId: string;
        name: string;
        icon: string;
        type: import(".prisma/client").$Enums.TransactionType;
    }[]>;
}
