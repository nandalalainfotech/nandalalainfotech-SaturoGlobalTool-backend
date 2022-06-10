import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LigandTypeDTO } from "src/dto/Ligandtype.dto";
import { Ligandtype001mb } from "src/entity/Ligandtype001mb";
import { Repository } from "typeorm";

@Injectable()
export class LigandTypeService {

    constructor(
        @InjectRepository(Ligandtype001mb) private readonly ligandtypeRepository: Repository<Ligandtype001mb>) {

    }
    async create(ligandTypeDTO: LigandTypeDTO): Promise<Ligandtype001mb> {
        const ligandtype001mb = new Ligandtype001mb();
        ligandtype001mb.setProperties(ligandTypeDTO);
        return this.ligandtypeRepository.save(ligandtype001mb);
    }
    async update(ligandTypeDTO: LigandTypeDTO): Promise<Ligandtype001mb> {
        const ligandtype001mb = new Ligandtype001mb();
        ligandtype001mb.setProperties(ligandTypeDTO);
        await this.ligandtypeRepository.update({ id: ligandtype001mb.id }, ligandtype001mb);
        return ligandtype001mb;
    }

    async findAll(): Promise<Ligandtype001mb[]> {
        return await this.ligandtypeRepository.find();
    }

    findOne(id: number): Promise<Ligandtype001mb> {
        return this.ligandtypeRepository.findOne(id);
    }
    async remove(id: number): Promise<void> {
        await this.ligandtypeRepository.delete(id);
    }
}