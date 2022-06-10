import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { LigandDTO } from "src/dto/Ligand.dto";
import { Ligand001wb } from "src/entity/Ligand001wb";
import { hasRole } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { RolesGuard } from "src/role/role.guard";
import { LigandService } from "src/service/Ligand.service";

@Controller('/testandreportstudio/api/ligand')
export class LigandController {
	constructor(private readonly ligandService: LigandService) { }

	// @hasRole(Role.Admin,Role.User)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Post("save")
	create(@Body() ligandDTO: LigandDTO): Promise<Ligand001wb> {
		return this.ligandService.create(ligandDTO);
	}

	
	// @hasRole(Role.Admin,Role.User)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Put("update")
	update(@Body() ligandDTO: LigandDTO): Promise<Ligand001wb> {
		return this.ligandService.update(ligandDTO);
	}

	
	// @hasRole(Role.Admin,Role.User)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findAll/:username')
	findAll(@Param('username') username: any): Promise<Ligand001wb[]> {
		// console.log("username findAll-->", username);
		return this.ligandService.findAll(username);
	}

	// @UseGuards(JwtAuthGuard)
	// @Get('findAllByUser/:username')
	// findAllByUser(@Param('username') username: any): Promise<Ligand001wb[]> {
	// 	console.log("username findAllByUser-->",username);
	// 	return this.ligandService.findAll();
	// }

	
	// @hasRole(Role.Admin,Role.User)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Delete('delete/:ligandId')
	remove(@Param('ligandId') ligandId: number): Promise<void> {
		return this.ligandService.remove(ligandId);
	}

	
	// @hasRole(Role.Admin,Role.User)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Ligand001wb> {
		return this.ligandService.findOne(id);
	}
}