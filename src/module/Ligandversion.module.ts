import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LigandVersionController } from "src/controller/Ligandversion.controller";
import { Ligandversion001mb } from "src/entity/Ligandversion001mb";
import { LigandVersionService } from "src/service/Ligandversion.service";

@Module({
    imports: [TypeOrmModule.forFeature([Ligandversion001mb])],
    providers: [LigandVersionService],
    controllers: [LigandVersionController],
})
export class LigandVersionModule { }