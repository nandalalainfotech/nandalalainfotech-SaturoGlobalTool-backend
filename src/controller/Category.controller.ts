import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CategoryDTO } from "src/dto/Category.dto";
import { Category001mb } from "src/entity/Category001mb";
import { CategoryService } from "src/service/Category.service";

@Controller('/testandreportstudio/api/category')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) { }
	@UseGuards(JwtAuthGuard)
	@Post("save")
	create(@Body() categoryDTO: CategoryDTO): Promise<Category001mb> {
		return this.categoryService.create(categoryDTO);
	}

	@UseGuards(JwtAuthGuard)
	@Put("update")
	update(@Body() categoryDTO: CategoryDTO): Promise<Category001mb> {
		return this.categoryService.update(categoryDTO);
	}
	
	@UseGuards(JwtAuthGuard)
	@Get('findAll')
	findAll(): Promise<Category001mb[]> {
		return this.categoryService.findAll();
	}

	@UseGuards(JwtAuthGuard)
	@Delete('delete/:id')
	remove(@Param('id') id: number): Promise<void> {
		return this.categoryService.remove(id);
	}
    
	@UseGuards(JwtAuthGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Category001mb> {
		return this.categoryService.findOne(id);
	}
}