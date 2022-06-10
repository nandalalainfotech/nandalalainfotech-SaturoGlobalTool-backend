import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryController } from "src/controller/Category.controller";
import { Category001mb } from "src/entity/Category001mb";
import { CategoryService } from "src/service/Category.service";

@Module({
    imports: [TypeOrmModule.forFeature([Category001mb])],
    providers: [CategoryService],
    controllers: [CategoryController],
})
export class CategoryModule { }