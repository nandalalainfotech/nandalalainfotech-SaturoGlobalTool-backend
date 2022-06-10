import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReportsController } from "src/controller/Report.controller";
import { Assay001wb } from "src/entity/Assay001wb";
import { Ligand001wb } from "src/entity/Ligand001wb";
import { Measurement001wb } from "src/entity/Measurement001wb";
import { User001mb } from "src/entity/User001mb";
import { RolesGuard } from "src/role/role.guard";
import { ReportsService } from "src/service/Report.service";

@Module({
    imports: [TypeOrmModule.forFeature([Ligand001wb,Assay001wb,Measurement001wb,User001mb])],
    providers: [ReportsService,RolesGuard],
    controllers: [ReportsController],
  })
  export class ReportsModule { }