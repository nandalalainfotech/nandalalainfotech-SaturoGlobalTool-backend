import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CategoryFunctionDTO } from "src/dto/Categoryfunction.dto";
import { Categoryfunction001mb } from "src/entity/Categoryfunction001mb";
import { CategoryFunctionService } from "src/service/Categoryfunction.service";

@Controller('/testandreportstudio/api/categoryfunction')
export class CategoryFunctionController {
	constructor(private readonly categoryFunctionService: CategoryFunctionService) { }
	@UseGuards(JwtAuthGuard)
	@Post("save")
	create(@Body() categoryFunctionDTO: CategoryFunctionDTO): Promise<Categoryfunction001mb> {
		return this.categoryFunctionService.create(categoryFunctionDTO);
	}

	@UseGuards(JwtAuthGuard)
	@Put("update")
	update(@Body() categoryFunctionDTO: CategoryFunctionDTO): Promise<Categoryfunction001mb> {
		return this.categoryFunctionService.update(categoryFunctionDTO);
	}
	
	@UseGuards(JwtAuthGuard)
	@Get('findAll')
	findAll(): Promise<Categoryfunction001mb[]> {
		return this.categoryFunctionService.findAll();
	}

	@UseGuards(JwtAuthGuard)
	@Delete('delete/:id')
	remove(@Param('id') id: number): Promise<void> {
		return this.categoryFunctionService.remove(id);
	}
    
	@UseGuards(JwtAuthGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Categoryfunction001mb> {
		return this.categoryFunctionService.findOne(id);
	}
}