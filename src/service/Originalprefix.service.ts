import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OriginalPrefixDTO } from "src/dto/Originalprefix.dto";
import { Originalprefix001mb } from "src/entity/Originalprefix001mb";
import { Repository } from "typeorm";

@Injectable()
export class OriginalPrefixService {

    constructor(
        @InjectRepository(Originalprefix001mb) private readonly originalprefixRepository: Repository<Originalprefix001mb>) {

    }
    async create(originalPrefixDTO: OriginalPrefixDTO): Promise<Originalprefix001mb> {
        const originalprefix001mb = new Originalprefix001mb();
        originalprefix001mb.setProperties(originalPrefixDTO);
        return this.originalprefixRepository.save(originalprefix001mb);
    }
    async update(originalPrefixDTO: OriginalPrefixDTO): Promise<Originalprefix001mb> {
        const originalprefix001mb = new Originalprefix001mb();
        originalprefix001mb.setProperties(originalPrefixDTO);
        await this.originalprefixRepository.update({ id: originalprefix001mb.id}, originalprefix001mb);
        return originalprefix001mb;
    }

    async findAll(): Promise<Originalprefix001mb[]> {
        return await this.originalprefixRepository.find();
    }

    findOne(id: number): Promise<Originalprefix001mb> {
        return this.originalprefixRepository.findOne(id);
    }
    async remove(id: number): Promise<void> {
        await this.originalprefixRepository.delete(id);
    }
}