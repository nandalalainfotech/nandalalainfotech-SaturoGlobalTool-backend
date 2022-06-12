import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LigandDTO } from "src/dto/Ligand.dto";
import { Ligand001wb } from "src/entity/Ligand001wb";
import { Taskallocation001wb } from "src/entity/Taskallocation001wb";
import { User001mb } from "src/entity/User001mb";
import { Repository, In } from "typeorm";

@Injectable()
export class LigandService {

    constructor(
        @InjectRepository(User001mb) private readonly userRepository: Repository<User001mb>,
        @InjectRepository(Taskallocation001wb) private readonly taskAllocateRepository: Repository<Taskallocation001wb>,
        @InjectRepository(Ligand001wb) private readonly ligandRepository: Repository<Ligand001wb>) {

    }
    async create(ligandDTO: LigandDTO): Promise<Ligand001wb> {
        const ligand001wb = new Ligand001wb();
        ligand001wb.setProperties(ligandDTO);
        return this.ligandRepository.save(ligand001wb);
    }
    async update(ligandDTO: LigandDTO): Promise<Ligand001wb> {
        const ligand001wb = new Ligand001wb();
        ligand001wb.setProperties(ligandDTO);
        await this.ligandRepository.update({ ligandId: ligand001wb.ligandId }, ligand001wb);
        return ligand001wb;
    }

    async findAll(username: any): Promise<Ligand001wb[]> {

        // let user = [];
        // user.push(username);
        // console.log("username findAll-->", user[0]);
        return await this.ligandRepository.find({ relations: ["ligandVersionSlno2", "ligandTypeSlno2"] });
    }

    // async findByCuratorTan(username: any): Promise<Ligand001wb[]> {

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

    //     let curatorTask: Ligand001wb[] = [];
    //     curatorTask = await this.ligandRepository.find({ where: { ligandId: In(ligandids) }, relations: ["ligandVersionSlno2", "ligandTypeSlno2"] });
    //     console.log("curatorTask", curatorTask);

    //     return curatorTask;
    // }

    findOne(id: number): Promise<Ligand001wb> {
        return this.ligandRepository.findOne({ where: { ligandId: id }, relations: ["ligandVersionSlno2", "ligandTypeSlno2"] });
    }
    async remove(ligandId: number): Promise<void> {
        await this.ligandRepository.delete(ligandId);
    }
}