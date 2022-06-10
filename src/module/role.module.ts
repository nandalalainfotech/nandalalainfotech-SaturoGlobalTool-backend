import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoleController } from "src/controller/role.controller";
import { Role001mb } from "src/entity/Role001mb";
import { RoleService } from "src/service/role.service";

@Module({
    imports: [TypeOrmModule.forFeature([Role001mb])],
    providers: [RoleService],
    controllers: [RoleController],
  })
  export class RoleModule {}