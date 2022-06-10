import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { TypeDTO } from "src/dto/Type.dto";
import { Type001mb } from "src/entity/Type001mb";
import { TypeService } from "src/service/Type.service";

@Controller('/testandreportstudio/api/types')
export class TypeController {
	constructor(private readonly typeService: TypeService) { }
	@UseGuards(JwtAuthGuard)
	@Post("save")
	create(@Body() typeDTO: TypeDTO): Promise<Type001mb> {
		return this.typeService.create(typeDTO);
	}

	@UseGuards(JwtAuthGuard)
	@Put("update")
	update(@Body() typeDTO: TypeDTO): Promise<Type001mb> {
		return this.typeService.update(typeDTO);
	}
	
	@UseGuards(JwtAuthGuard)
	@Get('findAll')
	findAll(): Promise<Type001mb[]> {
		return this.typeService.findAll();
	}

	@UseGuards(JwtAuthGuard)
	@Delete('delete/:id')
	remove(@Param('id') id: number): Promise<void> {
		return this.typeService.remove(id);
	}
    
	@UseGuards(JwtAuthGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Type001mb> {
		return this.typeService.findOne(id);
	}
}