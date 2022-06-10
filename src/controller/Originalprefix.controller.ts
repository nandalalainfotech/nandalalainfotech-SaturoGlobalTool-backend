import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { OriginalPrefixDTO } from "src/dto/Originalprefix.dto";
import { Originalprefix001mb } from "src/entity/Originalprefix001mb";
import { OriginalPrefixService } from "src/service/Originalprefix.service";

@Controller('/testandreportstudio/api/originalprefix')
export class OriginalPrefixController {
	constructor(private readonly originalPrefixService: OriginalPrefixService) { }
	@UseGuards(JwtAuthGuard)
	@Post("save")
	create(@Body() originalPrefixDTO: OriginalPrefixDTO): Promise<Originalprefix001mb> {
		return this.originalPrefixService.create(originalPrefixDTO);
	}

	@UseGuards(JwtAuthGuard)
	@Put("update")
	update(@Body() originalPrefixDTO: OriginalPrefixDTO): Promise<Originalprefix001mb> {
		return this.originalPrefixService.update(originalPrefixDTO);
	}
	
	@UseGuards(JwtAuthGuard)
	@Get('findAll')
	findAll(): Promise<Originalprefix001mb[]> {
		return this.originalPrefixService.findAll();
	}

	@UseGuards(JwtAuthGuard)
	@Delete('delete/:id')
	remove(@Param('id') id: number): Promise<void> {
		return this.originalPrefixService.remove(id);
	}
    
	@UseGuards(JwtAuthGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Originalprefix001mb> {
		return this.originalPrefixService.findOne(id);
	}
}