import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LigandDTO } from "src/dto/Ligand.dto";
import { Assay001wb } from "src/entity/Assay001wb";
import { Ligand001wb } from "src/entity/Ligand001wb";
import { Taskallocation001wb } from "src/entity/Taskallocation001wb";
import { User001mb } from "src/entity/User001mb";
import { Repository, In } from "typeorm";

@Injectable()
export class LigandService {

    constructor(
        @InjectRepository(User001mb) private readonly userRepository: Repository<User001mb>,
        @InjectRepository(Taskallocation001wb) private readonly taskAllocateRepository: Repository<Taskallocation001wb>,
        @InjectRepository(Ligand001wb) private readonly ligandRepository: Repository<Ligand001wb>,
        @InjectRepository(Assay001wb) private readonly assayRepository: Repository<Assay001wb>,) {

    }
    async create(ligandDTO: LigandDTO): Promise<Ligand001wb> {
        const ligand001wb1 = await this.ligandRepository.findOne({ where: { tanNumber: ligandDTO.tanNumber } });
        const ligand001wb2 = await this.ligandRepository.findOne({ where: { tanNumber: ligandDTO.tanNumber , ligandVersionSlno: ligandDTO.ligandVersionSlno } });
        if (ligand001wb1 && ligand001wb1.status == "Submitted to QC") {
            throw new HttpException('Already Found!', HttpStatus.BAD_REQUEST);
        } else if(ligand001wb2){
            throw new HttpException('Ligand Version Already Found! ', HttpStatus.BAD_REQUEST);
        } else {
            const ligand001wbNew = new Ligand001wb();
            ligand001wbNew.setProperties(ligandDTO);
            if (!ligand001wbNew.collectionId || ligand001wbNew.collectionId == null || ligand001wbNew.collectionId == "null") {
                ligand001wbNew.collectionId = "";
            }
            return this.ligandRepository.save(ligand001wbNew);
        }

    }
    async update(ligandDTO: LigandDTO): Promise<Ligand001wb> {
        const ligand001wb = new Ligand001wb();
        ligand001wb.setProperties(ligandDTO);
        if (!ligand001wb.collectionId || ligand001wb.collectionId == null || ligand001wb.collectionId == "null") {
            ligand001wb.collectionId = "";
        }
        await this.ligandRepository.update({ ligandId: ligand001wb.ligandId }, ligand001wb);
        return ligand001wb;
    }

    async findAll(username: any): Promise<Ligand001wb[]> {
        let ligand001wbs: Ligand001wb[] = [];
        ligand001wbs = await this.ligandRepository.find({
            where: { insertUser: username },
            relations: [
                "ligandVersionSlno2", "ligandTypeSlno2", "assay001wbs", "assay001wbs.assayTypeSlno2",
                "assay001wbs.toxiCitySlno2", "assay001wbs.routeSlno2", "assay001wbs.unitSlno2", "assay001wbs.unitedSlno2",
                "assay001wbs.categorySlno2", "assay001wbs.functionSlno2", "assay001wbs.originalPrefixSlno2", "assay001wbs.typeSlno2"]
        });
        for (let ligand001wb of ligand001wbs) {
            ligand001wb.tanNumber = unescape(ligand001wb.tanNumber)
            ligand001wb.tanNumber = unescape(ligand001wb.tanNumber)
            ligand001wb.identifier1 = unescape(ligand001wb.identifier1)
            ligand001wb.identifier2 = unescape(ligand001wb.identifier2)
            ligand001wb.identifier3 = unescape(ligand001wb.identifier3)
            ligand001wb.collectionId = unescape(ligand001wb.collectionId)
            ligand001wb.locator = unescape(ligand001wb.locator)
            ligand001wb.ligandDetail = unescape(ligand001wb.ligandDetail)
            ligand001wb.diseaseName1 = unescape(ligand001wb.diseaseName1)
            ligand001wb.diseaseName2 = unescape(ligand001wb.diseaseName2)
            ligand001wb.diseaseName3 = unescape(ligand001wb.diseaseName3)
        }
        return ligand001wbs;
    }

    async findAllByLigandIdAndAssayId(ligandId: any, assayId: any): Promise<Ligand001wb> {
        let ligand001wb: Ligand001wb;
        // ligand001wbs = await this.ligandRepository.find({
        //     where: {  ligandId: ligandId },
        //     relations: [
        //         "ligandVersionSlno2", "ligandTypeSlno2", "assay001wbs", "assay001wbs.assayTypeSlno2",
        //         "assay001wbs.toxiCitySlno2", "assay001wbs.routeSlno2", "assay001wbs.unitSlno2", "assay001wbs.unitedSlno2",
        //         "assay001wbs.categorySlno2", "assay001wbs.functionSlno2", "assay001wbs.originalPrefixSlno2", "assay001wbs.typeSlno2"]
        // });
        // console.log("ligand001wbs--->>>",ligand001wbs);
        ligand001wb = await this.ligandRepository.createQueryBuilder('ligand001wb')
            .select(['ligand001wb.ligandId',
                'ligand001wb.tanNumber',
                "ligand001wb.ligandVersionSlno",
                "ligand001wb.ligandTypeSlno",
                "ligand001wb.identifier1",
                "ligand001wb.identifier2",
                "ligand001wb.identifier3",
                "ligand001wb.collectionId",
                "ligand001wb.locator",
                "ligand001wb.ligandDetail",
                "ligand001wb.diseaseName1",
                "ligand001wb.diseaseName2",
                "ligand001wb.diseaseName3",
                "assay001wbs", "assay001wbs.assayTypeSlno2",
                "assay001wbs.toxiCitySlno2", "assay001wbs.routeSlno2", "assay001wbs.unitSlno2", "assay001wbs.unitedSlno2",
                "assay001wbs.categorySlno2", "assay001wbs.functionSlno2", "assay001wbs.originalPrefixSlno2", "assay001wbs.typeSlno2"])
            .leftJoin('ligand001wb.assay001wbs', 'assay001wbs')
            .where('ligand001wb.ligandId = :ligandId', { ligandId })
            .where('assay001wbs.assayId = :assayId', { assayId }).getOne();
            
        return ligand001wb;

    }

    async findAllByLigandId(ligandId: any): Promise<Ligand001wb> {
        let ligand001wb: Ligand001wb;
       
        ligand001wb = await this.ligandRepository.createQueryBuilder('ligand001wb')
            .select(['ligand001wb.ligandId',
                'ligand001wb.tanNumber',
                "ligand001wb.ligandVersionSlno",
                "ligand001wb.ligandTypeSlno",
                "ligand001wb.identifier1",
                "ligand001wb.identifier2",
                "ligand001wb.identifier3",
                "ligand001wb.collectionId",
                "ligand001wb.locator",
                "ligand001wb.ligandDetail",
                "ligand001wb.diseaseName1",
                "ligand001wb.diseaseName2",
                "ligand001wb.diseaseName3",
                "assay001wbs", "assay001wbs.assayTypeSlno2",
                "assay001wbs.toxiCitySlno2", "assay001wbs.routeSlno2", "assay001wbs.unitSlno2", "assay001wbs.unitedSlno2",
                "assay001wbs.categorySlno2", "assay001wbs.functionSlno2", "assay001wbs.originalPrefixSlno2", "assay001wbs.typeSlno2"])
            .leftJoin('ligand001wb.assay001wbs', 'assay001wbs')
            .where('ligand001wb.ligandId = :ligandId', { ligandId }).getOne();
        return ligand001wb;

    }

    

    async findInprocesStatus(username: any): Promise<Ligand001wb[]> {
        return await this.ligandRepository.find({ where: { status: "In Process", insertUser: username }, relations: ["ligandVersionSlno2", "ligandTypeSlno2"] });
    }

    async findSubmotToQcStatus(username: any): Promise<Ligand001wb[]> {
        return await this.ligandRepository.find({ where: { status: "Submitted to QC", insertUser: username }, relations: ["ligandVersionSlno2", "ligandTypeSlno2"] });
    }



    findOne(id: number): Promise<Ligand001wb> {
        return this.ligandRepository.findOne({ where: { ligandId: id }, relations: ["ligandVersionSlno2", "ligandTypeSlno2"] });
    }

    async updateStatus(ligandId: any, tanNumber: any): Promise<Ligand001wb> {
        const ligand001wbUpdate = new Ligand001wb();
        ligand001wbUpdate.status = "Submitted to QC";
        const ligand001wbs = await this.ligandRepository.find({
            where: { tanNumber: tanNumber }, relations: ["ligandVersionSlno2", "ligandTypeSlno2", "assay001wbs", "assay001wbs.assayTypeSlno2",
                "assay001wbs.toxiCitySlno2", "assay001wbs.routeSlno2", "assay001wbs.unitSlno2", "assay001wbs.unitedSlno2",
                "assay001wbs.categorySlno2", "assay001wbs.functionSlno2", "assay001wbs.originalPrefixSlno2", "assay001wbs.typeSlno2"]
        });
        for(let ligand001wb of ligand001wbs) {
            await this.ligandRepository.save({ ...ligand001wb, ...ligand001wbUpdate });
            for (let assay of ligand001wb.assay001wbs) {
                let newAssas = new Assay001wb();
                newAssas.status = "Submitted to QC";
                await this.assayRepository.save({ ...assay, ...newAssas });
            }
        }
        return ligand001wbUpdate;
    }

    async remove(ligandId: number): Promise<void> {
        await this.ligandRepository.delete(ligandId);
    }
}