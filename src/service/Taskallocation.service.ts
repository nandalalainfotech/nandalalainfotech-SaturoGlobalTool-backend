import { Injectable, Req, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TaskallocationDTO } from "src/dto/Taskallocation001wb.dto";
import { Taskallocation001wb } from "src/entity/Taskallocation001wb";
import { User001mb } from "src/entity/User001mb";
import { Repository, Between } from "typeorm";
import { Response } from "express";
import { Request } from "supertest";

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
        // this.taskAllocateRepository.clear();
        await fs.promises.writeFile('./uploads/helloworld.xlsx', file.buffer, function (err: any) {
            if (err) return console.log(err);
        });
        return this.createTaskAllocation(taskallocationDTO);
    }

    async createTaskAllocation(taskallocationDTO: TaskallocationDTO): Promise<Taskallocation001wb[]> {
        const file2 = await reader.readFile("./uploads/helloworld.xlsx", { cellDates: true });
        const sheet1 = reader.utils.sheet_to_json(file2.Sheets[file2.SheetNames[0]]);

        let sheet = JSON.parse(JSON.stringify(sheet1).replace(/\s(?=\w+":)/g, ""));

        for (let i = 0; i < sheet.length; i++) {
            const taskallocation001wb = new Taskallocation001wb();
            // taskallocation001wb.taskallocationSlno = i + 1;
            taskallocation001wb.curatorName = sheet[i].CURATORNAME;
            taskallocation001wb.cbatchNo = sheet[i].CBATCHNUMBER;
            taskallocation001wb.curatorTanNo = sheet[i].TANNUMBER;
            const date1 = new Date(sheet[i].DATEALLOCATED);
            date1.setDate(date1.getDate() + 1);
            taskallocation001wb.curatorAllocateDate = date1;
            taskallocation001wb.insertUser = taskallocationDTO.insertUser;
            taskallocation001wb.insertDatetime = taskallocationDTO.insertDatetime;

            // let random = Math.floor(Math.random() * reviewers.length);
            // taskallocation001wb.reviewerName = reviewers[random].username;
            taskallocation001wb.reviewerName = sheet[i].REVIEWERNAME;
            taskallocation001wb.reviewerTanNo = sheet[i].TANNUMBER_1;
            taskallocation001wb.reviewerTanNo = sheet[i].TANNUMBER;
            taskallocation001wb.rbatchNo = sheet[i].RBATCHNUMBER;
            const date2 = new Date(sheet[i].DATEALLOCATED_1);
            date2.setDate(date2.getDate() + 1);
            taskallocation001wb.reviewerAllocateDate = date2;
            this.taskAllocateRepository.save(taskallocation001wb);

        }

        let taskAllocation = await this.taskAllocateRepository.find();
        return taskAllocation;
    }



    async update(taskallocationDTO: TaskallocationDTO): Promise<Taskallocation001wb> {
        const taskallocation001wb = new Taskallocation001wb();
        taskallocation001wb.setProperties(taskallocationDTO);
        await this.taskAllocateRepository.update({ taskallocationSlno: taskallocation001wb.taskallocationSlno }, taskallocation001wb);
        return taskallocation001wb;
    }

    async findAll(username: any): Promise<Taskallocation001wb[]> {
        return await this.taskAllocateRepository.find();
    }

    async findCuratorTanNumber(username: any): Promise<Taskallocation001wb[]> {
        return await this.taskAllocateRepository.find({ where: { curatorName: username } });
    }

    async findByTanNo(username: any): Promise<Taskallocation001wb[]> {
        return await this.taskAllocateRepository.find({ where: { curatorName: username } });
    }

    async findByReviewerTanNo(username: any): Promise<Taskallocation001wb[]> {
        return await this.taskAllocateRepository.find({ where: { reviewerName: username } });
    }

    async findByCuratorStartEndDate(username: any, startDate: any, endDate: any): Promise<Taskallocation001wb[]> {
            let sDate = new Date(startDate);
            // sDate.setDate(sDate.getDate() - 1);
            let eDate = new Date(endDate);
            eDate.setDate(eDate.getDate() + 1);
           
            let sekar= await this.taskAllocateRepository.find({ where: { curatorName: username, updatedDatetime: Between(sDate, eDate), status: "Submitted to QC" } });
            return sekar;
    }

    async findByStartEndDate(username: any, startDate: any, endDate: any): Promise<Taskallocation001wb[]> {
        // if (startDate != endDate) {
            let sDate = new Date(startDate);
            sDate.setDate(sDate.getDate() - 1);
            let eDate = new Date(endDate);
            eDate.setDate(eDate.getDate() + 1);

            return await this.taskAllocateRepository.find({ where: { reviewerName: username, reviewerUpdatedDate: Between(sDate, eDate), reviewerStatus: "Completed" } });
        // }
        // else {
        //     let sDate = new Date(startDate);
        //     let eDate = new Date(endDate);
        //     return await this.taskAllocateRepository.find({ where: { reviewerName: username, reviewerUpdatedDate: sDate, reviewerStatus: "Completed" } });
        // }
    }



    findOne(taskallocationSlno: number): Promise<Taskallocation001wb> {
        return this.taskAllocateRepository.findOne(taskallocationSlno);
    }
    async remove(taskallocationSlno: number): Promise<void> {
        await this.taskAllocateRepository.delete(taskallocationSlno);
    }

    async downloadExcel(@Req() request: Request, @Res() response: Response) {
        let task = await this.taskAllocateRepository.find();
        if (task.length < 0) {
            return;
        }
        else {
            let workbook = new Excel.Workbook();
            let worksheet = workbook.addWorksheet('Task_Details_Report'); // creating worksheet
            // worksheet.views = [{ showGridLines: false }];
            worksheet.getRow(5).height = 20;
            worksheet.getRow(6).height = 20;
            worksheet.getRow(7).height = 20;
            worksheet.getRow(8).height = 20;
            worksheet.getRow(9).height = 20;
            worksheet.getRow(10).height = 20;
            worksheet.getRow(11).height = 20;
            worksheet.getRow(12).height = 20;
            worksheet.getRow(13).height = 20;
            worksheet.getRow(14).height = 20;
            worksheet.columns = [
                { key: 'A', width: 10.0 },
                { key: 'B', width: 20.0 },
                { key: 'C', width: 10.0 },
                { key: 'D', width: 20.0 },
                { key: 'E', width: 20.0 },
                { key: 'F', width: 20.0 },
                { key: 'G', width: 20.0 },
                { key: 'H', width: 20.0 },
                { key: 'I', width: 20.0 },
                { key: 'J', width: 20.0 },
                { key: 'K', width: 20.0 },
                { key: 'L', width: 20.0 },
                { key: 'M', width: 20.0 },
            ];
            worksheet.mergeCells('A1');
            worksheet.getCell('A1').value = "SL NO";
            worksheet.getCell('A1').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('A1').border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            worksheet.getCell('A1').alignment = { vertical: 'middle', horizontal: 'center' };


            worksheet.mergeCells('B1');
            worksheet.getCell('B1').value = "CURATOR NAME";
            worksheet.getCell('B1').fgColor = { argb: 'b03600' };
            worksheet.getCell('B1').font = {
                size: 12,
                bold: true
            };
            worksheet.getCell('B1').border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            worksheet.getCell('B1').alignment = { vertical: 'middle', horizontal: 'center' };


            worksheet.mergeCells('C1');
            worksheet.getCell('C1').value = "CURATOR BATCH";
            worksheet.getCell('C1').fgColor = { argb: '00b050' };
            worksheet.getCell('C1').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('C1').border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            worksheet.getCell('C1').alignment = { vertical: 'middle', horizontal: 'center' };


            worksheet.mergeCells('D1');
            worksheet.getCell('D1').value = "CURATOR TAN NUMBER";
            worksheet.getCell('D1').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('D1').border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            worksheet.getCell('D1').alignment = { vertical: 'left', horizontal: 'left' };


            worksheet.mergeCells('E1');
            worksheet.getCell('E1').value = "ALLOCATED ON";
            worksheet.getCell('E1').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('E1').border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            worksheet.getCell('E1').alignment = { vertical: 'left', horizontal: 'left' };


            worksheet.mergeCells('F1');
            worksheet.getCell('F1').value = "CURATOR STATUS";
            worksheet.getCell('F1').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('F1').border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            worksheet.getCell('F1').alignment = { vertical: 'left', horizontal: 'left' };


            worksheet.mergeCells('G1');
            worksheet.getCell('G1').value = "COMPLETED ON";
            worksheet.getCell('G1').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('G1').border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            worksheet.getCell('G1').alignment = { vertical: 'left', horizontal: 'left' };


            worksheet.mergeCells('H1');
            worksheet.getCell('H1').value = "REVIEWER NAME";
            worksheet.getCell('H1').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('H1').border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            worksheet.getCell('H1').alignment = { vertical: 'left', horizontal: 'left' };


            worksheet.mergeCells('I1');
            worksheet.getCell('I1').value = "REVIEWER BATCH NUMBER";
            worksheet.getCell('I1').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('I1').border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            worksheet.getCell('I1').alignment = { vertical: 'left', horizontal: 'left' };


            worksheet.mergeCells('J1');
            worksheet.getCell('J1').value = "REVIEWER TAN NUMBER";
            worksheet.getCell('J1').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('J1').border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            worksheet.getCell('J1').alignment = { vertical: 'left', horizontal: 'left' };


            worksheet.mergeCells('K1');
            worksheet.getCell('K1').value = "ALLOCATED ON";
            worksheet.getCell('K1').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('K1').border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            worksheet.getCell('K1').alignment = { vertical: 'left', horizontal: 'left' };


            worksheet.mergeCells('L1');
            worksheet.getCell('L1').value = "REVIEWER STATUS";
            worksheet.getCell('L1').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('L1').border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            worksheet.getCell('L1').alignment = { vertical: 'left', horizontal: 'left' };


            worksheet.mergeCells('M1');
            worksheet.getCell('M1').value = "COMPLETED ON";
            worksheet.getCell('M1').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('M1').border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            worksheet.getCell('M1').alignment = { vertical: 'left', horizontal: 'left' };


            for (let i = 0; i < task.length; i++) {
                let temp = i + 2;
                worksheet.mergeCells('A' + temp);
                worksheet.getCell('A' + temp).border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
                worksheet.getCell('A' + temp).alignment = { vertical: 'middle', horizontal: 'left' };
                worksheet.getCell('A' + temp).value = i + 1;


                worksheet.mergeCells('B' + temp);
                worksheet.getCell('B' + temp).border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
                worksheet.getCell('B' + temp).value = task[i].curatorName;


                worksheet.mergeCells('C' + temp);
                worksheet.getCell('C' + temp).border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
                worksheet.getCell('C' + temp).value = task[i].cbatchNo;


                worksheet.mergeCells('D' + temp);
                worksheet.getCell('D' + temp).border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
                worksheet.getCell('D' + temp).value = task[i].curatorTanNo;


                worksheet.mergeCells('E' + temp);
                worksheet.getCell('E' + temp).border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
                worksheet.getCell('E' + temp).value = task[i].curatorAllocateDate;


                worksheet.mergeCells('F' + temp);
                worksheet.getCell('F' + temp).border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
                worksheet.getCell('F' + temp).value = task[i].status;


                worksheet.mergeCells('G' + temp);
                worksheet.getCell('G' + temp).border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
                // ---------curator completed date---------
                worksheet.getCell('G' + temp).value = task[i].updatedDatetime;


                worksheet.mergeCells('H' + temp);
                worksheet.getCell('H' + temp).border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
                worksheet.getCell('H' + temp).value = task[i].reviewerName;


                worksheet.mergeCells('I' + temp);
                worksheet.getCell('I' + temp).border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
                worksheet.getCell('I' + temp).value = task[i].rbatchNo;

                worksheet.mergeCells('J' + temp);
                worksheet.getCell('J' + temp).border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
                worksheet.getCell('J' + temp).value = task[i].reviewerTanNo;


                worksheet.mergeCells('K' + temp);
                worksheet.getCell('K' + temp).border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
                worksheet.getCell('K' + temp).value = task[i].reviewerAllocateDate;


                worksheet.mergeCells('L' + temp);
                worksheet.getCell('L' + temp).border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
                worksheet.getCell('L' + temp).value = task[i].reviewerStatus;


                worksheet.mergeCells('M' + temp);
                worksheet.getCell('M' + temp).border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
                // ---------reviewer complete date--------
                worksheet.getCell('M' + temp).value = task[i].reviewerUpdatedDate;
            }
            return workbook.xlsx.write(response).then(function () {
                response['status'](200).end();
            });

        }
    }
}