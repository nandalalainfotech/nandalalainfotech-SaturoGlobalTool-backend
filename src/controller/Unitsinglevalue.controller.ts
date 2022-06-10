import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { UnitSingleValueDTO } from "src/dto/Unitsinglevalue.dto";
import { Unitsinglevalue001mb } from "src/entity/Unitsinglevalue001mb";
import { UnitSingleValueService } from "src/service/Unitsinglevalue.service";

@Controller('/testandreportstudio/api/unitSingleValue')
export class UnitSingleValueController {
	constructor(private readonly unitSingleValueService: UnitSingleValueService) { }
	@UseGuards(JwtAuthGuard)
	@Post("save")
	create(@Body() unitSingleValueDTO: UnitSingleValueDTO): Promise<Unitsinglevalue001mb> {
		return this.unitSingleValueService.create(unitSingleValueDTO);
	}

	@UseGuards(JwtAuthGuard)
	@Put("update")
	update(@Body() unitSingleValueDTO: UnitSingleValueDTO): Promise<Unitsinglevalue001mb> {
		return this.unitSingleValueService.update(unitSingleValueDTO);
	}
	
	@UseGuards(JwtAuthGuard)
	@Get('findAll')
	findAll(): Promise<Unitsinglevalue001mb[]> {
		return this.unitSingleValueService.findAll();
	}

	@UseGuards(JwtAuthGuard)
	@Delete('delete/:slNo')
	remove(@Param('slNo') slNo: number): Promise<void> {
		return this.unitSingleValueService.remove(slNo);
	}
    
	@UseGuards(JwtAuthGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Unitsinglevalue001mb> {
		return this.unitSingleValueService.findOne(id);
	}
}