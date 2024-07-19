import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';
import { compare, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup';
import { SigninDto } from './dto/signin';


@Injectable()
export class AuthService {
  constructor(private readonly userRepo: UsersRepository, private readonly jwtService: JwtService){}

  async sigin(signinDto: SigninDto){
    const { email, password } = signinDto;
    const user = await this.userRepo.findUnique({
      where: { email } 
    })

    if(!user){
      throw new UnauthorizedException('Email ou senha inválido')
    }

    const isPasswordValid = await compare(password, user.password)
    if(!isPasswordValid){
      throw new UnauthorizedException('Email ou senha inválido')
    }
    const accessToken = await this.generateAccessToken(user.id)
    return {accessToken}
  }

  async signup(signupDto: SignupDto) {
    const {name, email, password} = signupDto
    const emailTaken = await this.userRepo.findUnique({
      where: {email}
    });

    if(emailTaken){
      throw new ConflictException('Email já cadastrado!')
    }

    const hashedPassword = await hash(password, 12)

    const user =  await this.userRepo.create({
      data: { 
        name, 
        email, 
        password: hashedPassword,
        categories: {
          createMany: {
            data: [
              // Income
              { name: 'Salário', icon: 'salary', type: 'INCOME' },
              { name: 'Freelance', icon: 'freelance', type: 'INCOME' },
              { name: 'Outro', icon: 'other', type: 'INCOME' },
              // Expense
              { name: 'Casa', icon: 'home', type: 'EXPENSE' },
              { name: 'Alimentação', icon: 'food', type: 'EXPENSE' },
              { name: 'Educação', icon: 'education', type: 'EXPENSE' },
              { name: 'Lazer', icon: 'fun', type: 'EXPENSE' },
              { name: 'Mercado', icon: 'grocery', type: 'EXPENSE' },
              { name: 'Roupas', icon: 'clothes', type: 'EXPENSE' },
              { name: 'Transporte', icon: 'transport', type: 'EXPENSE' },
              { name: 'Viagem', icon: 'travel', type: 'EXPENSE' },
              { name: 'Outro', icon: 'other', type: 'EXPENSE' },
            ]
          }
        }
      }
    });

    const accessToken = await this.generateAccessToken(user.id)
    return {accessToken}
  }

  private generateAccessToken(userId){
    return this.jwtService.signAsync({sub: userId})
  }
}