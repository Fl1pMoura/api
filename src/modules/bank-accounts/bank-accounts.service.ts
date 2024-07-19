import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repositories';

@Injectable()
export class BankAccountsService {
  constructor(private readonly BankAccountRepo: BankAccountsRepository){}
  
  create(userId: string,createBankAccountDto: CreateBankAccountDto) {
    const { color, initialBalance, name, type } = createBankAccountDto
    return this.BankAccountRepo.create(
      {data: {userId ,color, initialBalance, name, type}}
    );
  }

  findAllByUserId(userId: string) {
    return this.BankAccountRepo.findMany({
      where: {userId}
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} bankAccount`;
  }

  async update(userId: string, bankAccountId: string, updateBankAccountDto: UpdateBankAccountDto) {
    const { color, initialBalance, name, type } = updateBankAccountDto;
    await this.validateBankAccountOwnership(userId, bankAccountId)

    return this.BankAccountRepo.update({
      where: { id: bankAccountId },
      data:{ color, initialBalance, name, type }
    });
  }

  async remove(userId: string, bankAccountId: string) {
    await this.validateBankAccountOwnership(userId, bankAccountId)

    await this.BankAccountRepo.delete({
      where: { id: bankAccountId }});
  }

  private async validateBankAccountOwnership(userId: string, bankAccountId: string){
    const isOwner = await this.BankAccountRepo.findFirst({where: {userId, id: bankAccountId}})

    if(!isOwner){
      throw new NotFoundException('Conta bancária não encontrada')
    }
  }
}
