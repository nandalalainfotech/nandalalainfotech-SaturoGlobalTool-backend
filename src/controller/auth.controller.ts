import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthService } from 'src/auth/services/auth.service';


@Controller('/testandreportstudio/api/auth')
export class AuthController {
	constructor(private AuthService: AuthService) { }

	@Get('getUserAuthentication/:username/:password')
	getUserAuthentication(@Param('username') username: string, @Param('password') password: string): Promise<any> {
		return this.AuthService.getUserAuthentication(username, password);
	}

	@UseGuards(JwtAuthGuard)
	@Get('test')
	async test() {
		return 'Success!';
	}
}
