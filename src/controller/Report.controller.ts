import { Controller, Header, Get, Param, Req, Res, UseGuards } from "@nestjs/common";
var path = require('path');
const fs = require('fs');
import { Response } from "express";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { hasRole } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { RolesGuard } from "src/role/role.guard";
import { ReportsService } from "src/service/Report.service";
import { Request } from "supertest";


@Controller('/testandreportstudio/api/machineReports')
export class ReportsController {

    constructor(private readonly reportsService: ReportsService) { }


    // @hasRole(Role.Reviewer,Role.Admin)
	@UseGuards(JwtAuthGuard, RolesGuard)
    @Get('excel/:username')
    // @Header("Content-Type",
    //     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    // @Header("Content-Disposition",
    //     "attachment; filename=" + "Attendace Report" + ".xlsx")
    
    async downloadExcel( @Param('username') username: any, @Req() request: Request, @Res() response: Response) {
        return await this.reportsService.downloadExcel( username,request, response);
    }

    // @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('Tanexcel/:reviewerTan')
    async downloadTanExcel(@Param('reviewerTan') reviewerTan: any, @Req() request: Request, @Res() response: Response) {
        return await this.reportsService.downloadTanExcel(reviewerTan, request, response);
    }
}