import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryFunctionController } from "src/controller/Categoryfunction.controller";
import { Categoryfunction001mb } from "src/entity/Categoryfunction001mb";
import { CategoryFunctionService } from "src/service/Categoryfunction.service";

@Module({
    imports: [TypeOrmModule.forFeature([Categoryfunction001mb])],
    providers: [CategoryFunctionService],
    controllers: [CategoryFunctionController],
})
export class CategoryfunctionModule { }