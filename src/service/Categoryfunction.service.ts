import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryFunctionDTO } from "src/dto/Categoryfunction.dto";
import { Categoryfunction001mb } from "src/entity/Categoryfunction001mb";
import { Repository } from "typeorm";

@Injectable()
export class CategoryFunctionService {

    constructor(
        @InjectRepository(Categoryfunction001mb) private readonly categoryFunctionRepository: Repository<Categoryfunction001mb>) {

    }
    async create(categoryFunctionDTO: CategoryFunctionDTO): Promise<Categoryfunction001mb> {
        const categoryfunction001mb = new Categoryfunction001mb();
        categoryfunction001mb.setProperties(categoryFunctionDTO);
        return this.categoryFunctionRepository.save(categoryfunction001mb);
    }
    async update(categoryFunctionDTO: CategoryFunctionDTO): Promise<Categoryfunction001mb> {
        const categoryfunction001mb = new Categoryfunction001mb();
        categoryfunction001mb.setProperties(categoryFunctionDTO);
        await this.categoryFunctionRepository.update({ id: categoryfunction001mb.id }, categoryfunction001mb);
        return categoryfunction001mb;
    }

    async findAll(): Promise<Categoryfunction001mb[]> {
        return await this.categoryFunctionRepository.find();
    }

    findOne(id: number): Promise<Categoryfunction001mb> {
        return this.categoryFunctionRepository.findOne(id);
    }
    async remove(id: number): Promise<void> {
        await this.categoryFunctionRepository.delete(id);
    }
}