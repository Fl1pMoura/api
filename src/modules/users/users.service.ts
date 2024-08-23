import { Injectable } from "@nestjs/common";
import { UsersRepository } from "src/shared/database/repositories/users.repositories";

@Injectable()
export class UsersService {
  constructor(private readonly userRepo: UsersRepository) {}
  async getUserById(userId: string) {
    return this.userRepo.findUnique({
      where: { id: userId },
      select: {
        name: true,
        email: true,
      },
    });
  }
  // findAll() {
  //   return `This action returns all users`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
