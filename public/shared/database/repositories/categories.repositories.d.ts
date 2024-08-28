import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/shared/database/prisma.service';
export declare class CategoriesRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    findMany(findManyDto: Prisma.CategoryFindManyArgs): Prisma.PrismaPromise<{
        id: string;
        userId: string;
        name: string;
        icon: string;
        type: import(".prisma/client").$Enums.TransactionType;
    }[]>;
    findFirst(findFirstDto: Prisma.CategoryFindFirstArgs): Prisma.Prisma__CategoryClient<{
        id: string;
        userId: string;
        name: string;
        icon: string;
        type: import(".prisma/client").$Enums.TransactionType;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
}
