import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { MeasurementDTO } from "src/dto/Measurement.dto";
import { Measurement001wb } from "src/entity/Measurement001wb";
import { hasRole } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { RolesGuard } from "src/role/role.guard";
import { MeasurementService } from "src/service/Measurement.service";

@Controller('/testandreportstudio/api/measurement')
export class MeasurementController {
	constructor(private readonly measurementService: MeasurementService) { }
	// @hasRole(Role.Admin,Role.User)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Post("save")
	create(@Body() measurementDTO: MeasurementDTO): Promise<Measurement001wb> {
		return this.measurementService.create(measurementDTO);
	}

	// @hasRole(Role.Admin,Role.User)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Put("update")
	update(@Body() measurementDTO: MeasurementDTO): Promise<Measurement001wb> {
		return this.measurementService.update(measurementDTO);
	}
	
	// @hasRole(Role.Admin,Role.User)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findAll/:username')
	findAll(@Param('username') username: any): Promise<Measurement001wb[]> {
		return this.measurementService.findAll(username);
	}

	// @hasRole(Role.Admin,Role.User)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Delete('delete/:measurementId')
	remove(@Param('measurementId') measurementId: number): Promise<void> {
		return this.measurementService.remove(measurementId);
	}
    
	// @hasRole(Role.Admin,Role.User)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Measurement001wb> {
		return this.measurementService.findOne(id);
	}
}