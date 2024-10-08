import { Module } from '@nestjs/common';
import { TransactionsService } from './services/transactions.service';
import { TransactionsController } from './transactions.controller';
import { BankAccountsModule } from '../bank-accounts/bank-accounts.module';
import { CategoriesModule } from '../categories/categories.module';
import { validateTransactionOwnershipService } from './services/validate-transaction-ownership.service';

@Module({
  imports:[BankAccountsModule, CategoriesModule],
  controllers: [TransactionsController],
  providers: [TransactionsService, validateTransactionOwnershipService],
})
export class TransactionsModule {}
