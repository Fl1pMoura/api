import { Body, Controller, Post, SetMetadata } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup';
import { SigninDto } from './dto/signin';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @SetMetadata('IsPublic', true)
  authenticate(@Body() signinDto: SigninDto){
    return this.authService.sigin(signinDto)
  }

  @Post('signup')
  @SetMetadata('IsPublic', true)
  signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }
}
