import { Injectable } from "@nestjs/common";
import { CategoriesRepository } from "src/shared/database/repositories/categories.repositories";

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepo: CategoriesRepository) {}
  // create(createCategoryDto: CreateCategoryDto) {
  //   return 'This action adds a new category';
  // }

  findAllByUserId(userId: string) {
    return this.categoriesRepo.findMany({
      where: { userId: userId },
    });
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} category`;
  // }

  // update(id: number, updateCategoryDto: UpdateCategoryDto) {
  //   return `This action updates a #${id} category`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} category`;
  // }
}
