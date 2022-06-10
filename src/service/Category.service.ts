import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryDTO } from "src/dto/Category.dto";
import { Category001mb } from "src/entity/Category001mb";
import { Repository } from "typeorm";

@Injectable()
export class CategoryService {

    constructor(
        @InjectRepository(Category001mb) private readonly categoryRepository: Repository<Category001mb>) {

    }
    async create(categoryDTO: CategoryDTO): Promise<Category001mb> {
        const category001mb = new Category001mb();
        category001mb.setProperties(categoryDTO);
        return this.categoryRepository.save(category001mb);
    }
    async update(categoryDTO: CategoryDTO): Promise<Category001mb> {
        const category001mb = new Category001mb();
        category001mb.setProperties(categoryDTO);
        await this.categoryRepository.update({ id: category001mb.id }, category001mb);
        return category001mb;
    }

    async findAll(): Promise<Category001mb[]> {
        return await this.categoryRepository.find();
    }

    findOne(id: number): Promise<Category001mb> {
        return this.categoryRepository.findOne(id);
    }
    async remove(id: number): Promise<void> {
        await this.categoryRepository.delete(id);
    }
}