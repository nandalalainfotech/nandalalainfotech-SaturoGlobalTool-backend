import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RouteOfAdministartionDTO } from "src/dto/Routeofadministration.dto";
import { Routeofadministration001mb } from "src/entity/Routeofadministration001mb";
import { Repository } from "typeorm";

@Injectable()
export class RouteOfAdministartionService {

    constructor(
        @InjectRepository(Routeofadministration001mb) private readonly routeofadministration: Repository<Routeofadministration001mb>) {

    }
    async create(routeOfAdministartionDTO: RouteOfAdministartionDTO): Promise<Routeofadministration001mb> {
        const routeofadministration001mb = new Routeofadministration001mb();
        routeofadministration001mb.setProperties(routeOfAdministartionDTO);
        return this.routeofadministration.save(routeofadministration001mb);
    }
    async update(routeOfAdministartionDTO: RouteOfAdministartionDTO): Promise<Routeofadministration001mb> {
        const routeofadministration001mb = new Routeofadministration001mb();
        routeofadministration001mb.setProperties(routeOfAdministartionDTO);
        await this.routeofadministration.update({id: routeofadministration001mb.id}, routeofadministration001mb);
        return routeofadministration001mb;
    }

    async findAll(): Promise<Routeofadministration001mb[]> {
        return await this.routeofadministration.find();
    }

    findOne(id: number): Promise<Routeofadministration001mb> {
        return this.routeofadministration.findOne(id);
    }
    async remove(id: number): Promise<void> {
        await this.routeofadministration.delete(id);
    }
}