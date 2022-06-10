import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { TaskallocationDTO } from "src/dto/Taskallocation001wb.dto";
import { Taskallocation001wb } from "src/entity/Taskallocation001wb";
import { TaskallocationService } from "src/service/Taskallocation.service";
 
@Controller('/testandreportstudio/api/taskallocation')
export class TaskAllocationController {
	constructor(private readonly taskallocationService: TaskallocationService) { }

	@Post('save')
	@UseInterceptors(FileInterceptor('file'))
	uploadFile(@UploadedFile() file: Express.Multer.File, @Body() taskallocationDTO: TaskallocationDTO) {
		// console.log("taskallocationDTOtaskallocationDTO", taskallocationDTO);
		return this.taskallocationService.create(file, taskallocationDTO);
	}

	@UseGuards(JwtAuthGuard)
	@Put("update")
	update(@Body() taskallocationDTO: TaskallocationDTO): Promise<Taskallocation001wb> {
		return this.taskallocationService.update(taskallocationDTO);
	}
	
	@UseGuards(JwtAuthGuard)
	@Get('findAll')
	findAll(): Promise<Taskallocation001wb[]> {
		return this.taskallocationService.findAll();
	}

	@UseGuards(JwtAuthGuard)
	@Delete('delete/:id')
	remove(@Param('id') id: number): Promise<void> {
		return this.taskallocationService.remove(id);
	}
    
	@UseGuards(JwtAuthGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Taskallocation001wb> {
		return this.taskallocationService.findOne(id);
	}
}