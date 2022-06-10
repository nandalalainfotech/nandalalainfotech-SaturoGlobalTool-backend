import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LigandVersionDTO } from "src/dto/Ligandversion.dto";
import { Ligandversion001mb } from "src/entity/Ligandversion001mb";
import { Repository } from "typeorm";

@Injectable()
export class LigandVersionService {

    constructor(
        @InjectRepository(Ligandversion001mb) private readonly ligandversionRepository: Repository<Ligandversion001mb>) {

    }
    async create(ligandVersionDTO: LigandVersionDTO): Promise<Ligandversion001mb> {
        const ligandversion001mb = new Ligandversion001mb();
        ligandversion001mb.setProperties(ligandVersionDTO);
        return this.ligandversionRepository.save(ligandversion001mb);
    }
    async update(ligandVersionDTO: LigandVersionDTO): Promise<Ligandversion001mb> {
        const ligandversion001mb = new Ligandversion001mb();
        ligandversion001mb.setProperties(ligandVersionDTO);
        await this.ligandversionRepository.update({ id: ligandversion001mb.id  }, ligandversion001mb);
        return ligandversion001mb;
    }

    async findAll(): Promise<Ligandversion001mb[]> {
        return await this.ligandversionRepository.find();
    }

    findOne(id: number): Promise<Ligandversion001mb> {
        return this.ligandversionRepository.findOne(id);
    }
    async remove(id: number): Promise<void> {
        await this.ligandversionRepository.delete(id);
    }
}