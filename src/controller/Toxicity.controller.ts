import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { ToxicityDTO } from "src/dto/Toxicity.dto";
import { Toxicity001mb } from "src/entity/Toxicity001mb";
import { ToxicityService } from "src/service/Toxicity.service";

@Controller('/testandreportstudio/api/toxicity')
export class ToxicityController {
	constructor(private readonly toxicityService: ToxicityService) { }
	@UseGuards(JwtAuthGuard)
	@Post("save")
	create(@Body() toxicityDTO: ToxicityDTO): Promise<Toxicity001mb> {
		return this.toxicityService.create(toxicityDTO);
	}

	@UseGuards(JwtAuthGuard)
	@Put("update")
	update(@Body() toxicityDTO: ToxicityDTO): Promise<Toxicity001mb> {
		return this.toxicityService.update(toxicityDTO);
	}
	
	@UseGuards(JwtAuthGuard)
	@Get('findAll')
	findAll(): Promise<Toxicity001mb[]> {
		return this.toxicityService.findAll();
	}

	@UseGuards(JwtAuthGuard)
	@Delete('delete/:id')
	remove(@Param('id') id: number): Promise<void> {
		return this.toxicityService.remove(id);
	}
    
	@UseGuards(JwtAuthGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Toxicity001mb> {
		return this.toxicityService.findOne(id);
	}
}