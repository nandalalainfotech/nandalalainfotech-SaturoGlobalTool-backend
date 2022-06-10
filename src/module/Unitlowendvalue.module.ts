import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UnitlowendvalueController } from "src/controller/Unitlowendvalue.controller";
import { Unitlowendvalue001mb } from "src/entity/Unitlowendvalue001mb";
import { UnitlowendvalueService } from "src/service/Unitlowendvalue.service";

@Module({
    imports: [TypeOrmModule.forFeature([Unitlowendvalue001mb])],
    providers: [UnitlowendvalueService],
    controllers: [UnitlowendvalueController],
})
export class UnitlowendvalueModule { }