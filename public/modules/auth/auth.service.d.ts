import { JwtService } from "@nestjs/jwt";
import { UsersRepository } from "src/shared/database/repositories/users.repositories";
import { SigninDto } from "./dto/signin";
import { SignupDto } from "./dto/signup";
export declare class AuthService {
    private readonly userRepo;
    private readonly jwtService;
    constructor(userRepo: UsersRepository, jwtService: JwtService);
    sigin(signinDto: SigninDto): Promise<{
        accessToken: string;
    }>;
    signup(signupDto: SignupDto): Promise<{
        accessToken: string;
    }>;
    private generateAccessToken;
}
