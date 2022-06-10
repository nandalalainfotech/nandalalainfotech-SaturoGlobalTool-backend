import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LigandTypeController } from "src/controller/LigandType.controller";
import { Ligandtype001mb } from "src/entity/Ligandtype001mb";
import { LigandTypeService } from "src/service/LigandType.service";

@Module({
    imports: [TypeOrmModule.forFeature([Ligandtype001mb])],
    providers: [LigandTypeService],
    controllers: [LigandTypeController],
})
export class LigandTypeModule { }