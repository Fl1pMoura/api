import { Injectable, NotFoundException } from "@nestjs/common";
import { TransactionsRepository } from "src/shared/database/repositories/transactions.repositories";

@Injectable()
export class validateTransactionOwnershipService {
  constructor(private readonly transacitonRepo: TransactionsRepository) {}

  async validate(userId: string, transactionId: string) {
    const isOwner = await this.transacitonRepo.findFirst({
      where: { userId, id: transactionId },
    });

    if (!isOwner) {
      throw new NotFoundException("Transação não encontrada");
    }
  }
}
