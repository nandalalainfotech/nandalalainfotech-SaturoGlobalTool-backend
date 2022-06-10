import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UnitSingleValueController } from "src/controller/Unitsinglevalue.controller";
import { Unitsinglevalue001mb } from "src/entity/Unitsinglevalue001mb";
import { UnitSingleValueService } from "src/service/Unitsinglevalue.service";

@Module({
    imports: [TypeOrmModule.forFeature([Unitsinglevalue001mb])],
    providers: [UnitSingleValueService],
    controllers: [UnitSingleValueController],
})
export class UnitSingleValueModule { }