import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { AssayTypeDTO } from "src/dto/Assaytype.dto";
import { Assaytype001mb } from "src/entity/Assaytype001mb";
import { AssaytypeService } from "src/service/Assaytype.service";

@Controller('/testandreportstudio/api/assaytype')
export class AssaytypeController {
	constructor(private readonly assaytypeService: AssaytypeService) { }
	@UseGuards(JwtAuthGuard)
	@Post("save")
	create(@Body() assayTypeDTO: AssayTypeDTO): Promise<Assaytype001mb> {
		return this.assaytypeService.create(assayTypeDTO);
	}

	@UseGuards(JwtAuthGuard)
	@Put("update")
	update(@Body() assayTypeDTO: AssayTypeDTO): Promise<Assaytype001mb> {
		return this.assaytypeService.update(assayTypeDTO);
	}
	
	@UseGuards(JwtAuthGuard)
	@Get('findAll')
	findAll(): Promise<Assaytype001mb[]> {
		return this.assaytypeService.findAll();
	}

	@UseGuards(JwtAuthGuard)
	@Delete('delete/:slNo')
	remove(@Param('slNo') slNo: number): Promise<void> {
		return this.assaytypeService.remove(slNo);
	}
    
	@UseGuards(JwtAuthGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Assaytype001mb> {
		return this.assaytypeService.findOne(id);
	}
}