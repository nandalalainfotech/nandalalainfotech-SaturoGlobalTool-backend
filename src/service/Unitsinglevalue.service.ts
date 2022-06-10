import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UnitSingleValueDTO } from "src/dto/Unitsinglevalue.dto";
import { Unitsinglevalue001mb } from "src/entity/Unitsinglevalue001mb";
import { Repository } from "typeorm";

@Injectable()
export class UnitSingleValueService {

    constructor(
        @InjectRepository(Unitsinglevalue001mb) private readonly unitsinglevalueRepository: Repository<Unitsinglevalue001mb>) {

    }
    async create(unitSingleValueDTO: UnitSingleValueDTO): Promise<Unitsinglevalue001mb> {
        const unitsinglevalue001mb = new Unitsinglevalue001mb();
        unitsinglevalue001mb.setProperties(unitSingleValueDTO);
        return this.unitsinglevalueRepository.save(unitsinglevalue001mb);
    }
    async update(unitSingleValueDTO: UnitSingleValueDTO): Promise<Unitsinglevalue001mb> {
        const unitsinglevalue001mb = new Unitsinglevalue001mb();
        unitsinglevalue001mb.setProperties(unitSingleValueDTO);
        await this.unitsinglevalueRepository.update({ }, unitsinglevalue001mb);
        return unitsinglevalue001mb;
    }

    async findAll(): Promise<Unitsinglevalue001mb[]> {
        return await this.unitsinglevalueRepository.find();
    }

    findOne(id: number): Promise<Unitsinglevalue001mb> {
        return this.unitsinglevalueRepository.findOne(id);
    }
    async remove(slNo: number): Promise<void> {
        await this.unitsinglevalueRepository.delete(slNo);
    }
}