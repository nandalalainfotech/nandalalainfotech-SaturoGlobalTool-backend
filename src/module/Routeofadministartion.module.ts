import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RouteOfAdministartionController } from "src/controller/Routeofadministartion.controller";
import { Routeofadministration001mb } from "src/entity/Routeofadministration001mb";
import { RouteOfAdministartionService } from "src/service/Routeofsdministartion.service";

@Module({
    imports: [TypeOrmModule.forFeature([Routeofadministration001mb])],
    providers: [RouteOfAdministartionService],
    controllers: [RouteOfAdministartionController],
})
export class RouteOfAdministartionModule { }