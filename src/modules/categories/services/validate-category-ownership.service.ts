import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoriesRepository } from 'src/shared/database/repositories/categories.repositories';


@Injectable()
export class validateCategoryOwnershipService {
  constructor(private readonly CategoryRepo: CategoriesRepository){}

  async validate(userId: string, categoryId: string){
    const isOwner = await this.CategoryRepo.findFirst({where: {userId, id: categoryId}})

    if(!isOwner){
      throw new NotFoundException('Categoria não encontrada')
    }
  }
}
