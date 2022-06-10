import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OriginalPrefixController } from "src/controller/Originalprefix.controller";
import { Originalprefix001mb } from "src/entity/Originalprefix001mb";
import { OriginalPrefixService } from "src/service/Originalprefix.service";

@Module({
    imports: [TypeOrmModule.forFeature([Originalprefix001mb])],
    providers: [OriginalPrefixService],
    controllers: [OriginalPrefixController],
})
export class OriginalPrefixModule { }