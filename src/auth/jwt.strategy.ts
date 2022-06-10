import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private configService: ConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configService.get('JWT_SECRET'),
		});
	}

	async validate(payload: { username: any, status: any, securityquestion: any, securityanswer: any , role: any}) {
		return {
			username: payload.username,
			status: payload.status,
			securityquestion: payload.securityquestion,
			securityanswer: payload.securityanswer,
			role: payload.role
		};
	}
}