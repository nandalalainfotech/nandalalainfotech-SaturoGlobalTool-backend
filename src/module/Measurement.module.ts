import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MeasurementController } from "src/controller/Measurement.controller";
import { Measurement001wb } from "src/entity/Measurement001wb";
import { User001mb } from "src/entity/User001mb";
import { RolesGuard } from "src/role/role.guard";
import { MeasurementService } from "src/service/Measurement.service";

@Module({
    imports: [TypeOrmModule.forFeature([Measurement001wb,User001mb])],
    providers: [MeasurementService,RolesGuard],
    controllers: [MeasurementController],
})
export class MeasurementModule { }