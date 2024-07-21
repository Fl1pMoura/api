import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repositories';
import { validateBankAccountOwnershipService } from '../../bank-accounts/services/validate-bank-account-ownership.service';
import { validateCategoryOwnershipService } from '../../categories/services/validate-category-ownership.service';
import { validateTransactionOwnershipService } from './validate-transaction-ownership.service';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly validateBankAccountOwnershipService: validateBankAccountOwnershipService,
    private readonly validateCategoryOwnershipService: validateCategoryOwnershipService,
    private readonly validateTransactionOwnershipService: validateTransactionOwnershipService,
    private readonly transactionsRepo: TransactionsRepository){}

  async create(userId:string, createTransactionDto: CreateTransactionDto) {
    const { bankAccountId, categoryId, date, name, type, value } = createTransactionDto

    await this.validateEntitiesOwnership({userId, bankAccountId, categoryId})

    return this.transactionsRepo.create({
      data: {userId, bankAccountId, categoryId, date, name, type, value} 
    });
  }

  findAllByUserId(userId: string, filters: {month, year}) {
    console.log(filters)
    return this.transactionsRepo.findMany({
      where:{
        userId: userId, 
        date: { gte: new Date(Date.UTC(filters.year, filters.month)), lt: new Date(Date.UTC(filters.year, filters.month + 1)) }
      }
    });
  }

  async update(userId: string,transactionId: string, updateTransactionDto: UpdateTransactionDto) {
    const { bankAccountId, categoryId, date, name, type, value } = updateTransactionDto;

    await this.validateEntitiesOwnership({userId, bankAccountId, categoryId, transactionId})

    return this.transactionsRepo.update({
      where: {id: transactionId}, 
      data: { bankAccountId, categoryId, date, name, type, value}
    });
  }

  async remove(userId: string, transactionId: string) {
    await this.validateEntitiesOwnership({userId, transactionId})
   
    await this.transactionsRepo.delete({
      where: {id: transactionId},
    })

    return null;
  }

  private async validateEntitiesOwnership({userId, bankAccountId, categoryId, transactionId}: { userId: string, bankAccountId?: string, categoryId?: string, transactionId?: string }){
    await Promise.all([  
      transactionId && this.validateTransactionOwnershipService.validate(userId, transactionId),
      bankAccountId && this.validateBankAccountOwnershipService.validate(userId, bankAccountId),
      categoryId &&this.validateCategoryOwnershipService.validate(userId, categoryId)])
  }
}
