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

  findAllByUserId(userId: string) {
    return this.transactionsRepo.findMany({where:{userId: userId}});
  }

  async update(userId: string,transactionId: string, updateTransactionDto: UpdateTransactionDto) {
    const { bankAccountId, categoryId } = updateTransactionDto;

    await this.validateEntitiesOwnership({userId, bankAccountId, categoryId, transactionId})

    return `This action updates a #${transactionId} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }

  private async validateEntitiesOwnership({userId, bankAccountId, categoryId, transactionId}: { userId: string, bankAccountId: string, categoryId: string, transactionId?: string }){
    await Promise.all([  
      transactionId && this.validateTransactionOwnershipService.validate(userId, transactionId),
      this.validateBankAccountOwnershipService.validate(userId, bankAccountId),
      this.validateCategoryOwnershipService.validate(userId, categoryId)])
  }
}
