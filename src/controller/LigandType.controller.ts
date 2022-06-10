import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { LigandTypeDTO } from "src/dto/Ligandtype.dto";
import { Ligandtype001mb } from "src/entity/Ligandtype001mb";
import { LigandTypeService } from "src/service/LigandType.service";

@Controller('/testandreportstudio/api/type')
export class LigandTypeController {
	constructor(private readonly ligandtypeService: LigandTypeService) { }
	@UseGuards(JwtAuthGuard)
	@Post("save")
	create(@Body() ligandTypeDTO: LigandTypeDTO): Promise<Ligandtype001mb> {
		return this.ligandtypeService.create(ligandTypeDTO);
	}

	@UseGuards(JwtAuthGuard)
	@Put("update")
	update(@Body() ligandTypeDTO: LigandTypeDTO): Promise<Ligandtype001mb> {
		return this.ligandtypeService.update(ligandTypeDTO);
	}
	
	@UseGuards(JwtAuthGuard)
	@Get('findAll')
	findAll(): Promise<Ligandtype001mb[]> {
		return this.ligandtypeService.findAll();
	}

	@UseGuards(JwtAuthGuard)
	@Delete('delete/:id')
	remove(@Param('id') id: number): Promise<void> {
		return this.ligandtypeService.remove(id);
	}
    
	@UseGuards(JwtAuthGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Ligandtype001mb> {
		return this.ligandtypeService.findOne(id);
	}
}