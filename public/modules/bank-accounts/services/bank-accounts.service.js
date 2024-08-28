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
exports.BankAccountsService = void 0;
const common_1 = require("@nestjs/common");
const bank_accounts_repositories_1 = require("../../../shared/database/repositories/bank-accounts.repositories");
const validate_bank_account_ownership_service_1 = require("./validate-bank-account-ownership.service");
let BankAccountsService = class BankAccountsService {
    constructor(BankAccountRepo, validateBankAccountOwnershipService) {
        this.BankAccountRepo = BankAccountRepo;
        this.validateBankAccountOwnershipService = validateBankAccountOwnershipService;
    }
    create(userId, createBankAccountDto) {
        const { color, initialBalance, name, type } = createBankAccountDto;
        return this.BankAccountRepo.create({ data: { userId, color, initialBalance, name, type } });
    }
    async findAllByUserId(userId) {
        const bankAccounts = await this.BankAccountRepo.findMany({
            where: { userId },
            include: {
                transactions: {
                    select: { value: true, type: true }
                },
            }
        });
        return bankAccounts.map(({ transactions, ...bankAccount }) => {
            const totalTransaction = transactions.reduce((acc, transaction) => acc + (transaction.type === "INCOME" ? transaction.value : -transaction.value), 0);
            const currentBalance = bankAccount.initialBalance + totalTransaction;
            return {
                ...bankAccount,
                transactions,
                currentBalance,
            };
        });
    }
    findOne(id) {
        return `This action returns a #${id} bankAccount`;
    }
    async update(userId, bankAccountId, updateBankAccountDto) {
        const { color, initialBalance, name, type } = updateBankAccountDto;
        await this.validateBankAccountOwnershipService.validate(userId, bankAccountId);
        return this.BankAccountRepo.update({
            where: { id: bankAccountId },
            data: { color, initialBalance, name, type }
        });
    }
    async remove(userId, bankAccountId) {
        await this.validateBankAccountOwnershipService.validate(userId, bankAccountId);
        await this.BankAccountRepo.delete({
            where: { id: bankAccountId }
        });
    }
};
exports.BankAccountsService = BankAccountsService;
exports.BankAccountsService = BankAccountsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [bank_accounts_repositories_1.BankAccountsRepository,
        validate_bank_account_ownership_service_1.validateBankAccountOwnershipService])
], BankAccountsService);
//# sourceMappingURL=bank-accounts.service.js.map