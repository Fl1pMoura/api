"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTransactionOwnershipService = void 0;
const common_1 = require("@nestjs/common");
const transactions_repositories_1 = require("../../../shared/database/repositories/transactions.repositories");
let validateTransactionOwnershipService = class validateTransactionOwnershipService {
    constructor(transacitonRepo) {
        this.transacitonRepo = transacitonRepo;
    }
    async validate(userId, transactionId) {
        const isOwner = await this.transacitonRepo.findFirst({
            where: { userId, id: transactionId },
        });
        if (!isOwner) {
            throw new common_1.NotFoundException("Transação não encontrada");
        }
    }
};
exports.validateTransactionOwnershipService = validateTransactionOwnershipService;
exports.validateTransactionOwnershipService = validateTransactionOwnershipService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [transactions_repositories_1.TransactionsRepository])
], validateTransactionOwnershipService);
//# sourceMappingURL=validate-transaction-ownership.service.js.map