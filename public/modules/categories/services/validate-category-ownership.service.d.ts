import { CategoriesRepository } from 'src/shared/database/repositories/categories.repositories';
export declare class validateCategoryOwnershipService {
    private readonly CategoryRepo;
    constructor(CategoryRepo: CategoriesRepository);
    validate(userId: string, categoryId: string): Promise<void>;
}
