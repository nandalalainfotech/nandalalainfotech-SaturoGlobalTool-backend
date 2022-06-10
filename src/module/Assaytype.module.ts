import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AssaytypeController } from "src/controller/Assaytype.controller";
import { Assaytype001mb } from "src/entity/Assaytype001mb";
import { AssaytypeService } from "src/service/Assaytype.service";

@Module({
    imports: [TypeOrmModule.forFeature([Assaytype001mb])],
    providers: [AssaytypeService],
    controllers: [AssaytypeController],
})
export class AssaytypeModule { }