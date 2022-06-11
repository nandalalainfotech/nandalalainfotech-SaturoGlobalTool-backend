import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AssayDTO } from "src/dto/Assay.dto";
import { Assay001wb } from "src/entity/Assay001wb";
import { Ligand001wb } from "src/entity/Ligand001wb";
import { Taskallocation001wb } from "src/entity/Taskallocation001wb";
import { User001mb } from "src/entity/User001mb";
import { Repository } from "typeorm";

@Injectable()
export class AssayService {
    constructor(
        @InjectRepository(User001mb) private readonly userRepository: Repository<User001mb>,
        @InjectRepository(Assay001wb) private readonly assayRepository: Repository<Assay001wb>,
        @InjectRepository(Taskallocation001wb) private readonly taskAllocateRepository: Repository<Taskallocation001wb>,
        @InjectRepository(Ligand001wb) private readonly ligandRepository: Repository<Ligand001wb>) {

    }
    async create(assayDTO: AssayDTO): Promise<Assay001wb> {
        // console.log("assayDTO", assayDTO);
        const assay001wb = new Assay001wb();
        assay001wb.setProperties(assayDTO);
        if (assay001wb.targetVersion == "") {
            assay001wb.targetStatus = "";
            assay001wb.target = "";
        }

        return this.assayRepository.save(assay001wb);
    }
    async update(assayDTO: AssayDTO): Promise<Assay001wb> {
        const assay001wb = new Assay001wb();
        assay001wb.setProperties(assayDTO);
        await this.assayRepository.update({ assayId: assay001wb.assayId }, assay001wb);
        return assay001wb;
    }

    async findAll(username: any): Promise<Assay001wb[]> {
        let Assays: Assay001wb[] = [];
        Assays = await this.assayRepository.find({ relations: ["assayTypeSlno2", "toxiCitySlno2", "routeSlno2", "unitSlno2", "unitedSlno2", "ligandSlno2", "ligandSlno2.ligandVersionSlno2", "ligandSlno2.ligandTypeSlno2", "categorySlno2", "functionSlno2", "originalPrefixSlno2", "typeSlno2"] });
        let AssayTan = [];
        for (let i = 0; i < Assays.length; i++) {
            AssayTan.push(Assays[i].ligandSlno2.tanNumber);

        }
// console.log("AssayTan",AssayTan);

        // let Ligands: Ligand001wb[] = [];
        // Ligands = await this.ligandRepository.find({ relations: ["ligandVersionSlno2", "ligandTypeSlno2"] });
        // let LigandTan = [];
        // for (let i = 0; i < Ligands.length; i++) {
        //     LigandTan.push(Ligands[i].tanNumber);

        // }

        let taskAllocations: Taskallocation001wb[] = [];
        taskAllocations = await this.taskAllocateRepository.find({ where: { reviewerName: username } });
        let taskTanNo = [];
        for (let i = 0; i < taskAllocations.length; i++) {
            taskTanNo.push(taskAllocations[i].reviewerTanNo);
        }

        let legands: Assay001wb[] = [];
        for (let i = 0; i < Assays.length; i++) {
            for (let j = 0; j < taskAllocations.length; j++) {

                if (Assays[i].ligandSlno2.tanNumber == taskAllocations[j].reviewerTanNo) {

                    console.log("Assays tan", Assays[i].ligandSlno2.tanNumber);
                    console.log("taskAllocations tan", taskAllocations[j].reviewerTanNo);
                    // let legands: Measurement001wb[] = [];
                    legands = await this.assayRepository.find({where:{ligandSlno2:{tanNumber:taskAllocations[j].reviewerTanNo}}, relations: ["assayTypeSlno2", "toxiCitySlno2", "routeSlno2", "unitSlno2", "unitedSlno2", "ligandSlno2", "ligandSlno2.ligandVersionSlno2", "ligandSlno2.ligandTypeSlno2", "categorySlno2", "functionSlno2", "originalPrefixSlno2", "typeSlno2"] });

                }
            }
        }

        return legands;
        // return await this.assayRepository.find({relations: ["assayTypeSlno2", "toxiCitySlno2", "routeSlno2", "unitSlno2", "unitedSlno2","ligandSlno2", "ligandSlno2.ligandVersionSlno2","ligandSlno2.ligandTypeSlno2","categorySlno2","functionSlno2","originalPrefixSlno2", "typeSlno2"]} );
    }

    findOne(id: number): Promise<Assay001wb> {
        return this.assayRepository.findOne(id);
    }
    async remove(assayId: number): Promise<void> {
        await this.assayRepository.delete(assayId);
    }
}