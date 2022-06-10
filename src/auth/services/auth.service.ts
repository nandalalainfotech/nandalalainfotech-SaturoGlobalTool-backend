import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';

import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { map } from 'rxjs/operators';
import { User001mb } from 'src/entity/User001mb';
import { UserDTO } from 'src/dto/User.dto';

@Injectable()
export class AuthService {

	constructor(@InjectRepository(User001mb) private readonly loginRepository: Repository<User001mb>, private readonly jwtService: JwtService) { }

	generateJwt(username, status, securityquestion, securityanswer, role): Observable<string> {
		const payload = {
			username: username, status: status, securityquestion: securityquestion, securityanswer: securityanswer,  role: role
		};
		return from(this.jwtService.signAsync(payload));
	}

	async getUserAuthentication(username: string, password: string) {
		const user001mb: User001mb = await this.loginRepository.findOne({relations: ["person",  'role'], where: { username: username } });
		let userDTO = new UserDTO();
		if (user001mb) {
			const isMatch = await bcrypt.compare(password, user001mb.password);
			if (isMatch) {
				userDTO.setProperties(user001mb);
				userDTO.password = null;
				return this.generateJwt(user001mb.username, user001mb.status, user001mb.securityquestion, user001mb.securityanswer, user001mb.role.rolename).pipe(map((jwt: string) => {
					return { userDTO, access_token: jwt };
				})
				)
			} else {
				throw new UnauthorizedException("Invalid Password");
			}
		} else {
			throw new UnauthorizedException("Invalid Username");
		}
	}

}