import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeController } from "src/controller/Type.controller";
import { Type001mb } from "src/entity/Type001mb";
import { TypeService } from "src/service/Type.service";

@Module({
    imports: [TypeOrmModule.forFeature([Type001mb])],
    providers: [TypeService],
    controllers: [TypeController],
})
export class TypeModule { }