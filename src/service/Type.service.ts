import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeDTO } from "src/dto/Type.dto";
import { Type001mb } from "src/entity/Type001mb";
import { Repository } from "typeorm";

@Injectable()
export class TypeService {

    constructor(
        @InjectRepository(Type001mb) private readonly typeRepository: Repository<Type001mb>) {

    }
    async create(typeDTO: TypeDTO): Promise<Type001mb> {
        const type001mb = new Type001mb();
        type001mb.setProperties(typeDTO);
        return this.typeRepository.save(type001mb);
    }
    async update(typeDTO: TypeDTO): Promise<Type001mb> {
        const type001mb = new Type001mb();
        type001mb.setProperties(typeDTO);
        await this.typeRepository.update({ id: type001mb.id}, type001mb);
        return type001mb;
    }

    async findAll(): Promise<Type001mb[]> {
        return await this.typeRepository.find();
    }

    findOne(id: number): Promise<Type001mb> {
        return this.typeRepository.findOne(id);
    }
    async remove(id: number): Promise<void> {
        await this.typeRepository.delete(id);
    }
}