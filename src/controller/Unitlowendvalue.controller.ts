import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { UnitlowendvalueDTO } from "src/dto/Unitlowendvalue.dto";
import { Unitlowendvalue001mb } from "src/entity/Unitlowendvalue001mb";
import { UnitlowendvalueService } from "src/service/Unitlowendvalue.service";

@Controller('/testandreportstudio/api/unitlowendvalue')
export class UnitlowendvalueController {
	constructor(private readonly unitlowendvalueService: UnitlowendvalueService) { }
	@UseGuards(JwtAuthGuard)
	@Post("save")
	create(@Body() unitlowendvalueDTO: UnitlowendvalueDTO): Promise<Unitlowendvalue001mb> {
		return this.unitlowendvalueService.create(unitlowendvalueDTO);
	}

	@UseGuards(JwtAuthGuard)
	@Put("update")
	update(@Body() unitlowendvalueDTO: UnitlowendvalueDTO): Promise<Unitlowendvalue001mb> {
		return this.unitlowendvalueService.update(unitlowendvalueDTO);
	}
	
	@UseGuards(JwtAuthGuard)
	@Get('findAll')
	findAll(): Promise<Unitlowendvalue001mb[]> {
		return this.unitlowendvalueService.findAll();
	}

	@UseGuards(JwtAuthGuard)
	@Delete('delete/:slNo')
	remove(@Param('slNo') slNo: number): Promise<void> {
		return this.unitlowendvalueService.remove(slNo);
	}
    
	@UseGuards(JwtAuthGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Unitlowendvalue001mb> {
		return this.unitlowendvalueService.findOne(id);
	}
}