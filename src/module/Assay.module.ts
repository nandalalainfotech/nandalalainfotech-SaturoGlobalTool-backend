import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AssayController } from "src/controller/Assay.controller";
import { Assay001wb } from "src/entity/Assay001wb";
import { User001mb } from "src/entity/User001mb";
import { RolesGuard } from "src/role/role.guard";
import { AssayService } from "src/service/Assay.service";

@Module({
    imports: [TypeOrmModule.forFeature([Assay001wb,User001mb])],
    providers: [AssayService,RolesGuard],
    controllers: [AssayController],
})
export class AssayModule { }