import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AssayDTO } from "src/dto/Assay.dto";
import { Assay001wb } from "src/entity/Assay001wb";
import { Ligand001wb } from "src/entity/Ligand001wb";
import { Taskallocation001wb } from "src/entity/Taskallocation001wb";
import { User001mb } from "src/entity/User001mb";
import { getRepository, In, Repository } from "typeorm";

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
        if (assay001wb.targetVersion == "" || assay001wb.targetVersion == null || assay001wb.targetVersion == "NA") {
            assay001wb.targetStatus = "";
            assay001wb.target = "";
        }

        return this.assayRepository.save(assay001wb);
    }
    async update(assayDTO: AssayDTO): Promise<Assay001wb> {
        const assay001wb = new Assay001wb();
        assay001wb.setProperties(assayDTO);
        if (assay001wb.targetVersion == "" || assay001wb.targetVersion == null || assay001wb.targetVersion == "NA") {
            assay001wb.targetStatus = "";
            assay001wb.target = "";
        }
        await this.assayRepository.update({ assayId: assay001wb.assayId }, assay001wb);
        return assay001wb;
    }


    async findAll(username: any): Promise<Assay001wb[]> {

        // let user = [];
        // user.push(username);
        
        return await this.assayRepository.find({  where:{insertUser: username},relations: ["assayTypeSlno2", "toxiCitySlno2", "routeSlno2", "unitSlno2", "unitedSlno2", "ligandSlno2", "ligandSlno2.ligandVersionSlno2", "ligandSlno2.ligandTypeSlno2", "categorySlno2", "functionSlno2", "originalPrefixSlno2", "typeSlno2"] });
        
    }

    async findInprocesStatus(username: any): Promise<Assay001wb[]> {

        // let taskAllocations: Assay001wb[] = [];
        // taskAllocations = await this.assayRepository.find({ where: { status: "In Process" } });
        // let taskTanNo = [];
        // for (let i = 0; i < taskAllocations.length; i++) {
        //     taskTanNo.push(taskAllocations[i].status);
        // }

        let ligands: Ligand001wb[] = [];
        // ligands  = await this.ligandRepository.find({ relations: ["ligandVersionSlno2", "ligandTypeSlno2", "assay001wbs"] });
        ligands = await this.ligandRepository.find({ where: { status: "In Process"} });
        // console.log("ligands", ligands);

        let ligandids = [];
        for (let i = 0; i < ligands.length; i++) {
            ligandids.push(ligands[i].ligandId);
        }
        // console.log("Status", ligandids);

        let Assays: Assay001wb[] = [];
       
        Assays = await this.assayRepository.find({ where:{insertUser: username}, relations: ["assayTypeSlno2", "toxiCitySlno2", "routeSlno2", "unitSlno2", "unitedSlno2", "ligandSlno2", "ligandSlno2.ligandVersionSlno2", "ligandSlno2.ligandTypeSlno2", "categorySlno2", "functionSlno2", "originalPrefixSlno2", "typeSlno2"] });
       
        return Assays;
        // return await this.assayRepository.find({ where:{status: "In Process",insertUser: username},relations: ["assayTypeSlno2", "toxiCitySlno2", "routeSlno2", "unitSlno2", "unitedSlno2", "ligandSlno2", "ligandSlno2.ligandVersionSlno2", "ligandSlno2.ligandTypeSlno2", "categorySlno2", "functionSlno2", "originalPrefixSlno2", "typeSlno2"] });
    }

    async findByReviewer(username: any): Promise<Assay001wb[]> {

        let taskAllocations: Taskallocation001wb[] = [];
        taskAllocations = await this.taskAllocateRepository.find({ where: { reviewerName: username } });
        let taskTanNo = [];
        for (let i = 0; i < taskAllocations.length; i++) {
            taskTanNo.push(taskAllocations[i].reviewerTanNo);
        }

        let ligands: Ligand001wb[] = [];
        ligands = await this.ligandRepository.find({ where: { tanNumber: In(taskTanNo) } });

        let ligandids = [];
        for (let i = 0; i < ligands.length; i++) {
            ligandids.push(ligands[i].ligandId);
        }

        let Assays: Assay001wb[] = [];
        Assays = await this.assayRepository.find({ where: { ligandSlno2: { ligandId: In(ligandids) } }, relations: ["assayTypeSlno2", "toxiCitySlno2", "routeSlno2", "unitSlno2", "unitedSlno2", "ligandSlno2", "ligandSlno2.ligandVersionSlno2", "ligandSlno2.ligandTypeSlno2", "categorySlno2", "functionSlno2", "originalPrefixSlno2", "typeSlno2"] });
        return Assays;
    }

    // async findByCuratorTan(username: any): Promise<Assay001wb[]> {

    //     let taskAllocations: Taskallocation001wb[] = [];
    //     taskAllocations = await this.taskAllocateRepository.find({ where: { curatorName: username } });
    //     let taskTanNo = [];
    //     for (let i = 0; i < taskAllocations.length; i++) {
    //         taskTanNo.push(taskAllocations[i].curatorTanNo);
    //     }
    //     // console.log("taskTanNo", taskTanNo);

    //     let ligands: Ligand001wb[] = [];
    //     ligands = await this.ligandRepository.find({ where: { tanNumber: In(taskTanNo) } });
    //     console.log("liands", ligands);

    //     let ligandids = [];
    //     for (let i = 0; i < ligands.length; i++) {
    //         ligandids.push(ligands[i].ligandId);
    //     }
    //     // console.log("ligandids", ligandids);

    //    let CuratorTask: Assay001wb[] = [];
    //    CuratorTask = await this.assayRepository.find({where:{ligandSlno2:{ligandId: In(ligandids)}}, relations: ["assayTypeSlno2", "toxiCitySlno2", "routeSlno2", "unitSlno2", "unitedSlno2", "ligandSlno2", "ligandSlno2.ligandVersionSlno2", "ligandSlno2.ligandTypeSlno2", "categorySlno2", "functionSlno2", "originalPrefixSlno2", "typeSlno2"] });
    //     return CuratorTask;
    // }

    findOne(id: number): Promise<Assay001wb> {
        return this.assayRepository.findOne(id);
    }
    async remove(assayId: number): Promise<void> {
        await this.assayRepository.delete(assayId);
    }
}