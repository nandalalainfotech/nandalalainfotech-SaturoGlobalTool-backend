import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { TaskallocationDTO } from "src/dto/Taskallocation001wb.dto";
import { Taskallocation001wb } from "src/entity/Taskallocation001wb";
import { RolesGuard } from "src/role/role.guard";
import { TaskallocationService } from "src/service/Taskallocation.service";
import { Response } from "express";
import { Request } from "supertest";
 
@Controller('/testandreportstudio/api/taskallocation')		
export class TaskAllocationController {
	constructor(private readonly taskallocationService: TaskallocationService) { }

	@UseGuards(JwtAuthGuard, RolesGuard)
    @Get('excel')
    @Header("Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    @Header("Content-Disposition",
        "attachment; filename=" + "Attendace Report" + ".xlsx")
    
    async downloadExcel( @Req() request: Request, @Res() response: Response) {
        return await this.taskallocationService.downloadExcel( request, response);
    }

	@Post('save')
	@UseInterceptors(FileInterceptor('file'))
	uploadFile(@UploadedFile() file: Express.Multer.File, @Body() taskallocationDTO: TaskallocationDTO) {
		return this.taskallocationService.create(file, taskallocationDTO);
	}

	@UseGuards(JwtAuthGuard)
	@Put("update")
	update(@Body() taskallocationDTO: TaskallocationDTO): Promise<Taskallocation001wb> {
		return this.taskallocationService.update(taskallocationDTO);
	}
	
	@UseGuards(JwtAuthGuard)
	@Get('findAll/:username')
	findAll(@Param('username') username: any): Promise<Taskallocation001wb[]> {
		return this.taskallocationService.findAll(username);
	}

	@UseGuards(JwtAuthGuard)
	@Get('findCuratorTanNumber/:username')
	findCuratorTanNumber(@Param('username') username: any): Promise<Taskallocation001wb[]> {
		return this.taskallocationService.findCuratorTanNumber(username);
	}

	@UseGuards(JwtAuthGuard)
    @Get('findByTanNo/:username')
    findByTanNo(@Param('username') username: any): Promise<Taskallocation001wb[]> {
        return this.taskallocationService.findByTanNo(username);
    }

	@UseGuards(JwtAuthGuard)
    @Get('findByReviewerTanNo/:username')
    findByReviewerTanNo(@Param('username') username: any): Promise<Taskallocation001wb[]> {
        return this.taskallocationService.findByReviewerTanNo(username);
    }

	@UseGuards(JwtAuthGuard)
    @Get('findByCuratorStartEndDate/:username/:startDate/:endDate')
    findByCuratorStartEndDate(@Param('username') username: any,@Param('startDate') startDate: any,@Param('endDate') endDate: any): Promise<Taskallocation001wb[]> {
		return this.taskallocationService.findByCuratorStartEndDate(username,startDate,endDate);
    }

	@UseGuards(JwtAuthGuard)
    @Get('findByStartEndDate/:username/:startDate/:endDate')
    findByStartEndDate(@Param('username') username: any,@Param('startDate') startDate: any,@Param('endDate') endDate: any): Promise<Taskallocation001wb[]> {
        return this.taskallocationService.findByStartEndDate(username,startDate,endDate);
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