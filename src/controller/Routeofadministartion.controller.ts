import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { RouteOfAdministartionDTO } from "src/dto/Routeofadministration.dto";
import { Routeofadministration001mb } from "src/entity/Routeofadministration001mb";
import { RouteOfAdministartionService } from "src/service/Routeofsdministartion.service";

@Controller('/testandreportstudio/api/routeofadmin')
export class RouteOfAdministartionController {
	constructor(private readonly routeOfAdministartionService: RouteOfAdministartionService) { }
	@UseGuards(JwtAuthGuard)
	@Post("save")
	create(@Body() routeOfAdministartionDTO: RouteOfAdministartionDTO): Promise<Routeofadministration001mb> {
		return this.routeOfAdministartionService.create(routeOfAdministartionDTO);
	}

	@UseGuards(JwtAuthGuard)
	@Put("update")
	update(@Body() routeOfAdministartionDTO: RouteOfAdministartionDTO): Promise<Routeofadministration001mb> {
		return this.routeOfAdministartionService.update(routeOfAdministartionDTO);
	}
	
	@UseGuards(JwtAuthGuard)
	@Get('findAll')
	findAll(): Promise<Routeofadministration001mb[]> {
		return this.routeOfAdministartionService.findAll();
	}

	@UseGuards(JwtAuthGuard)
	@Delete('delete/:id')
	remove(@Param('id') id: number): Promise<void> {
		return this.routeOfAdministartionService.remove(id);
	}
    
	@UseGuards(JwtAuthGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Routeofadministration001mb> {
		return this.routeOfAdministartionService.findOne(id);
	}
}