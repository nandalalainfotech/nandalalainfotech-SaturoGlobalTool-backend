import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AssayTypeDTO } from "src/dto/Assaytype.dto";
import { Assaytype001mb } from "src/entity/Assaytype001mb";
import { Repository } from "typeorm";

@Injectable()
export class AssaytypeService {

    constructor(
        @InjectRepository(Assaytype001mb) private readonly assaytypeRepository: Repository<Assaytype001mb>) {

    }
    async create(assayTypeDTO: AssayTypeDTO): Promise<Assaytype001mb> {
        const assaytype001mb = new Assaytype001mb();
        assaytype001mb.setProperties(assayTypeDTO);
        return this.assaytypeRepository.save(assaytype001mb);
    }
    async update(assayTypeDTO: AssayTypeDTO): Promise<Assaytype001mb> {
        const assaytype001mb = new Assaytype001mb();
        assaytype001mb.setProperties(assayTypeDTO);
        await this.assaytypeRepository.update({id: assaytype001mb.id }, assaytype001mb);
        return assaytype001mb;
    }

    async findAll(): Promise<Assaytype001mb[]> {
        return await this.assaytypeRepository.find();
    }

    findOne(id: number): Promise<Assaytype001mb> {
        return this.assaytypeRepository.findOne(id);
    }
    async remove(id: number): Promise<void> {
        await this.assaytypeRepository.delete(id);
    }
}