import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TaskallocationDTO } from "src/dto/Taskallocation001wb.dto";
import { Taskallocation001wb } from "src/entity/Taskallocation001wb";
import { User001mb } from "src/entity/User001mb";
import { Repository } from "typeorm";


const Excel = require('exceljs');
const reader = require('xlsx');
var fs = require('fs');


@Injectable()
export class TaskallocationService {

    constructor(
        @InjectRepository(User001mb) private readonly userRepository: Repository<User001mb>,
        @InjectRepository(Taskallocation001wb) private readonly taskAllocateRepository: Repository<Taskallocation001wb>) {

    }
    async create(file: any, taskallocationDTO: TaskallocationDTO): Promise<Taskallocation001wb[]> {
        // taskallocation001wb.setProperties(taskallocationDTO);
        // console.log("file----------->>>>", file);

        this.taskAllocateRepository.clear();

      

        const file2 = await reader.readFile("helloworld.xlsx")
        // console.log("file2", file2);

        const sheet1 = reader.utils.sheet_to_json(file2.Sheets[file2.SheetNames[0]]);
        // console.log("sheet1", sheet1);


        let sheet = JSON.parse(JSON.stringify(sheet1).replace(/\s(?=\w+":)/g, ""));

        // console.log("sheet", sheet);

        fs.writeFile('helloworld.xlsx', file.buffer, function (err: any) {
            if (err) return console.log(err);

        });

        let taskallocation001wbs: Taskallocation001wb[] = [];
        let reviewers: User001mb[] = [];
        reviewers = await this.userRepository.find({ relations: ["person", "role"], where: { roleid: 3 } });
        for (let i = 0; i < sheet.length; i++) {
            const taskallocation001wb = new Taskallocation001wb();
            taskallocation001wb.curatorId = i + 1;
            taskallocation001wb.curatorName = sheet[i].CURATORNAME;
            taskallocation001wb.cbatchNo = "B1";
            taskallocation001wb.curatorTanNo = sheet[i].TANNUMBER;
            taskallocation001wb.curatorAllocateDate = new Date();
            taskallocation001wb.insertUser = taskallocationDTO.insertUser;
            taskallocation001wb.insertDatetime = taskallocationDTO.insertDatetime;


            let random = Math.floor(Math.random() * reviewers.length);
            taskallocation001wb.reviewerName = reviewers[random].username;
            taskallocation001wb.reviewerTanNo = sheet[i].TANNUMBER;
            this.taskAllocateRepository.save(taskallocation001wb);
            taskallocation001wbs.push(taskallocation001wb);
        }

        return taskallocation001wbs;

    }





    async update(taskallocationDTO: TaskallocationDTO): Promise<Taskallocation001wb> {
        const taskallocation001wb = new Taskallocation001wb();
        taskallocation001wb.setProperties(taskallocationDTO);
        await this.taskAllocateRepository.update({ curatorId: taskallocation001wb.curatorId }, taskallocation001wb);
        return taskallocation001wb;
    }

    async findAll(username: any): Promise<Taskallocation001wb[]> {
        return await this.taskAllocateRepository.find();
    }

    async findByTanNo(username: any): Promise<Taskallocation001wb[]> {
        return await this.taskAllocateRepository.find({ where: { curatorName: username } });
    }

    findOne(curatorId: number): Promise<Taskallocation001wb> {
        return this.taskAllocateRepository.findOne(curatorId);
    }
    async remove(curatorId: number): Promise<void> {
        await this.taskAllocateRepository.delete(curatorId);
    }
}