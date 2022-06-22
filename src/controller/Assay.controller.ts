import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { AssayDTO } from "src/dto/Assay.dto";
import { Assay001wb } from "src/entity/Assay001wb";
import { hasRole } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { RolesGuard } from "src/role/role.guard";
import { AssayService } from "src/service/Assay.service";

@Controller('/testandreportstudio/api/assay')
export class AssayController {
	constructor(private readonly assayService: AssayService) { }

	// @hasRole(Role.Admin,Role.User)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Post("save")
	create(@Body() assayDTO: AssayDTO): Promise<Assay001wb> {
		return this.assayService.create(assayDTO);
	}


	// @hasRole(Role.Admin,Role.User)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Put("update")
	update(@Body() assayDTO: AssayDTO): Promise<Assay001wb> {
		return this.assayService.update(assayDTO);
	}



	// @hasRole(Role.Admin,Role.User)
	// @UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findAll/:username')
	findAll(@Param('username') username: any): Promise<Assay001wb[]> {
		// console.log("findall-controller");
		return this.assayService.findAll(username);
	}

	// @hasRole(Role.Admin,Role.User)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findInprocesStatus/:username')
	findInprocesStatus(@Param('username') username: any): Promise<Assay001wb[]> {
		// console.log("username findAll-->", username);
		return this.assayService.findInprocesStatus(username);
	}

	// @hasRole(Role.Admin,Role.User)
	// @UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findByReviewer/:username')
	findByReviewer(@Param('username') username: any): Promise<Assay001wb[]> {
		// console.log("findall-controller");
		return this.assayService.findByReviewer(username);
	}



	// @Get('findByCuratorTan/:username')
	// findByCuratorTan(@Param('username') username: any): Promise<Assay001wb[]> {
	// 	// console.log("findall-controller");
	// 	return this.assayService.findByCuratorTan(username);
	// }



	// @hasRole(Role.Admin,Role.User)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Delete('delete/:assayId')
	remove(@Param('assayId') assayId: number): Promise<void> {
		return this.assayService.remove(assayId);
	}


	// @hasRole(Role.Admin,Role.User)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Assay001wb> {
		return this.assayService.findOne(id);
	}
}