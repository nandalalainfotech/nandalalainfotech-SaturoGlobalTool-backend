import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserDTO } from 'src/dto/User.dto';
import { User001mb } from 'src/entity/User001mb';
import { hasRole } from 'src/role/role.decorator';
import { Role } from 'src/role/role.enum';
import { RolesGuard } from 'src/role/role.guard';
import { UserService } from 'src/service/user.service';


@Controller('/testandreportstudio/api/user')
export class UserController {
	constructor(private readonly userService: UserService) { }
	// --------------------------user registration-------------
	@Post("Registersave")
	create1(@Body() userDTO: UserDTO): Promise<User001mb> {
		return this.userService.create(userDTO);
	}

	@Get('registerfindAll')
	findAll1(): Promise<User001mb[]> {
		return this.userService.findAll();
	}
	// --------------------------user registration end-------------
	@hasRole(Role.Admin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Post("save")
	create(@Body() userDTO: UserDTO): Promise<User001mb> {
		return this.userService.create(userDTO);
	}

	@hasRole(Role.Admin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Put("update")
	update(@Body() userDTO: UserDTO): Promise<User001mb> {
		
		return this.userService.update(userDTO);
	}

	@hasRole(Role.Admin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Put("updateRole")
	updateRole(@Body() roleid: any): Promise<User001mb> {
		return this.userService.updateRole(roleid);
	}

	@UseGuards(JwtAuthGuard)
	@Post("updateUserTheme")
	updateUserTheme(@Body() updateTheme: any): Promise<User001mb> {
		return this.userService.update1(updateTheme);
	}

	@hasRole(Role.Admin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Post('updateUserName')
	updateUserName(@Body() userName: any): Promise<User001mb> {
		return this.userService.updateUserName(userName);
	}

	@hasRole(Role.Admin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Post('updatePassword')
	updatePassword(@Body() userDTO: UserDTO): Promise<User001mb> {
		return this.userService.updatePassword(userDTO);
	}

	@hasRole(Role.Admin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findAll')
	findAll(): Promise<User001mb[]> {
		return this.userService.findAll();
	}

	@hasRole(Role.Admin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findCuratorAll')
	findCuratorAll(): Promise<User001mb[]> {
		return this.userService.findCuratorAll();
	}

	@hasRole(Role.Admin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findAllReviewer')
	findAllReviewer(): Promise<User001mb[]> {
		return this.userService.findAllReviewer();
	}

	@hasRole(Role.Admin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<User001mb> {
		return this.userService.findOne(id);
	}

	@hasRole(Role.Admin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Delete('delete/:id')
	remove(@Param('id') id: number): Promise<void> {
		return this.userService.remove(id);
	}
}

