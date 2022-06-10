import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TaskAllocationController } from "src/controller/Taskallocation.controller";
import { Taskallocation001wb } from "src/entity/Taskallocation001wb";
import { User001mb } from "src/entity/User001mb";
import { TaskallocationService } from "src/service/Taskallocation.service";
import { UserService } from "src/service/user.service";

@Module({
    imports: [TypeOrmModule.forFeature([Taskallocation001wb,User001mb])],
    providers: [TaskallocationService],
    controllers: [TaskAllocationController],
    exports: [TaskallocationService,]
})
export class TaskallocationModule { }