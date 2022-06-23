import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LigandController } from "src/controller/Ligand.controller";
import { Assay001wb } from "src/entity/Assay001wb";
import { Ligand001wb } from "src/entity/Ligand001wb";
import { Taskallocation001wb } from "src/entity/Taskallocation001wb";
import { User001mb } from "src/entity/User001mb";
import { RolesGuard } from "src/role/role.guard";
import { LigandService } from "src/service/Ligand.service";

@Module({
    imports: [TypeOrmModule.forFeature([Ligand001wb,User001mb,Taskallocation001wb,Assay001wb])],
    providers: [LigandService,RolesGuard],
    controllers: [LigandController],
})
export class LigandModule { }