import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ToxicityController } from "src/controller/Toxicity.controller";
import { Toxicity001mb } from "src/entity/Toxicity001mb";
import { ToxicityService } from "src/service/Toxicity.service";

@Module({
    imports: [TypeOrmModule.forFeature([Toxicity001mb])],
    providers: [ToxicityService],
    controllers: [ToxicityController],
})
export class ToxicityModule { }