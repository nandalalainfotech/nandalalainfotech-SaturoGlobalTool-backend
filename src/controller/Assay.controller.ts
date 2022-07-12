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
		return this.assayService.findAll(username);
	}

	@Get('allAssayReviewer/:username')
	allAssayReviewer(@Param('username') username: any): Promise<Assay001wb[]> {
		return this.assayService.allAssayReviewer(username);
	}

	@Get('findAllByLigandIdAndAssayId/:assayId')
	findAllByLigandIdAndAssayId(@Param('assayId') assayId: any): Promise<Assay001wb[]> {
		
		return this.assayService.findAllByLigandIdAndAssayId(assayId);
	}

	// @hasRole(Role.Admin,Role.User)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findInprocesStatus/:username')
	findInprocesStatus(@Param('username') username: any): Promise<Assay001wb[]> {
		return this.assayService.findInprocesStatus(username);
	}

	// @hasRole(Role.Admin,Role.User)
	// @UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findByReviewer/:username')
	findByReviewer(@Param('username') username: any): Promise<Assay001wb[]> {
		return this.assayService.findByReviewer(username);
	}



	// @Get('findByCuratorTan/:username')
	// findByCuratorTan(@Param('username') username: any): Promise<Assay001wb[]> {
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
	findOne(@Param('id') id: number | any): Promise<Assay001wb> {
		return this.assayService.findOne(id);
	}

	@Get('findAllByTanligandID/:ligandSlno')
	findAllByTanligandID(@Param('ligandSlno') ligandSlno: any): Promise<Assay001wb[]> {
		return this.assayService.findAllByTanligandID(ligandSlno);
	}

	@Get('findAllAssayTan/:username/:tannumber')
	findAllAssayTan(@Param('username') username: any, @Param('tannumber') tannumber: any): Promise<Assay001wb[]> {
		return this.assayService.findAllAssayTan(username, tannumber);
	}
}