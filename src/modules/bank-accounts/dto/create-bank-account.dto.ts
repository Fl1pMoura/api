import {
  IsEnum,
  IsHexColor,
  isNotEmpty,
  IsNotEmpty,
  IsNumber,
  IsString,
} from "class-validator";
import { BankAccountType } from "../entities/BankAccount";

export class CreateBankAccountDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  initialBalance: number;

  @IsNotEmpty()
  @IsEnum(BankAccountType)
  type: BankAccountType;

  @IsString()
  @IsHexColor()
  @IsNotEmpty()
  color: string;
}
