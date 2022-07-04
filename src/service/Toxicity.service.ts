import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ToxicityDTO } from "src/dto/Toxicity.dto";
import { Toxicity001mb } from "src/entity/Toxicity001mb";
import { Repository } from "typeorm";

@Injectable()
export class ToxicityService {

    constructor(
        @InjectRepository(Toxicity001mb) private readonly toxicityRepository: Repository<Toxicity001mb>) {

    }
    async create(toxicityDTO: ToxicityDTO): Promise<Toxicity001mb> {
        const toxicity001mb = new Toxicity001mb();
        toxicity001mb.setProperties(toxicityDTO);
        return this.toxicityRepository.save(toxicity001mb);
    }
    async update(toxicityDTO: ToxicityDTO): Promise<Toxicity001mb> {
        const toxicity001mb = new Toxicity001mb();
        toxicity001mb.setProperties(toxicityDTO);
        await this.toxicityRepository.update({id: toxicity001mb.id}, toxicity001mb);
        return toxicity001mb;
    }

    async findAll(): Promise<Toxicity001mb[]> {
        let toxicity001mbs: Toxicity001mb[] = [];
        toxicity001mbs = await this.toxicityRepository.find({order: { toxiCity: "ASC" }});
        for(let toxicity001mb of toxicity001mbs) {
            toxicity001mb.toxiCity = unescape( toxicity001mb.toxiCity);
        }
        return toxicity001mbs;
    }

    findOne(id: number): Promise<Toxicity001mb> {
        return this.toxicityRepository.findOne(id);
    }
    async remove(id: number): Promise<void> {
        await this.toxicityRepository.delete(id);
    }
}