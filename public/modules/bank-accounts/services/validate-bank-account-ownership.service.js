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
exports.validateBankAccountOwnershipService = void 0;
const common_1 = require("@nestjs/common");
const bank_accounts_repositories_1 = require("../../../shared/database/repositories/bank-accounts.repositories");
let validateBankAccountOwnershipService = class validateBankAccountOwnershipService {
    constructor(BankAccountRepo) {
        this.BankAccountRepo = BankAccountRepo;
    }
    async validate(userId, bankAccountId) {
        const isOwner = await this.BankAccountRepo.findFirst({
            where: { userId, id: bankAccountId },
        });
        if (!isOwner) {
            throw new common_1.NotFoundException("Conta bancária não encontrada");
        }
    }
};
exports.validateBankAccountOwnershipService = validateBankAccountOwnershipService;
exports.validateBankAccountOwnershipService = validateBankAccountOwnershipService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [bank_accounts_repositories_1.BankAccountsRepository])
], validateBankAccountOwnershipService);
//# sourceMappingURL=validate-bank-account-ownership.service.js.map