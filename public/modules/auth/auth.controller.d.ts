import { AuthService } from "./auth.service";
import { SigninDto } from "./dto/signin";
import { SignupDto } from "./dto/signup";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    authenticate(signinDto: SigninDto): Promise<{
        accessToken: string;
    }>;
    signup(signupDto: SignupDto): Promise<{
        accessToken: string;
    }>;
}
