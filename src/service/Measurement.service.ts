import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MeasurementDTO } from "src/dto/Measurement.dto";
import { Measurement001wb } from "src/entity/Measurement001wb";
import { User001mb } from "src/entity/User001mb";
import { Repository } from "typeorm";


@Injectable()
export class MeasurementService {

    constructor(
        @InjectRepository(User001mb) private readonly userRepository: Repository<User001mb>,
        @InjectRepository(Measurement001wb) private readonly measurementRepository: Repository<Measurement001wb>) {

    }
    async create(measurementDTO: MeasurementDTO): Promise<Measurement001wb> {
        const measurement001wb = new Measurement001wb();
        measurement001wb.setProperties(measurementDTO);
        return this.measurementRepository.save(measurement001wb);
    }
    async update(measurementDTO: MeasurementDTO): Promise<Measurement001wb> {
        const measurement001wb = new Measurement001wb();
        measurement001wb.setProperties(measurementDTO);
        await this.measurementRepository.update({measurementId: measurement001wb.measurementId}, measurement001wb);
        return measurement001wb;
    }

    async findAll(username: any): Promise<Measurement001wb[]> {
        // console.log("username",username);
        
        return await this.measurementRepository.find();
    }

    findOne(id: number): Promise<Measurement001wb> {
        return this.measurementRepository.findOne(id);
    }
    async remove(measurementId: number): Promise<void> {
        await this.measurementRepository.delete(measurementId);
    }
}