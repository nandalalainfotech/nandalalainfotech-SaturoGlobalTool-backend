import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LigandDTO } from "src/dto/Ligand.dto";
import { Assay001wb } from "src/entity/Assay001wb";
import { Assaytype001mb } from "src/entity/Assaytype001mb";
import { Category001mb } from "src/entity/Category001mb";
import { Categoryfunction001mb } from "src/entity/Categoryfunction001mb";
import { Ligand001wb } from "src/entity/Ligand001wb";
import { Ligandtype001mb } from "src/entity/Ligandtype001mb";
import { Ligandversion001mb } from "src/entity/Ligandversion001mb";
import { Originalprefix001mb } from "src/entity/Originalprefix001mb";
import { Routeofadministration001mb } from "src/entity/Routeofadministration001mb";
import { Taskallocation001wb } from "src/entity/Taskallocation001wb";
import { Toxicity001mb } from "src/entity/Toxicity001mb";
import { Type001mb } from "src/entity/Type001mb";
import { Unitlowendvalue001mb } from "src/entity/Unitlowendvalue001mb";
import { Unitsinglevalue001mb } from "src/entity/Unitsinglevalue001mb";
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
        const ligand001wb2 = await this.ligandRepository.findOne({ where: { tanNumber: ligandDTO.tanNumber, ligandVersionSlno: ligandDTO.ligandVersionSlno } });
        if (ligand001wb1 && ligand001wb1.status == "Submitted to QC") {
            throw new HttpException('Already Found!', HttpStatus.BAD_REQUEST);
        }
        else if (ligand001wb2 && ligand001wb2.status != "Rejected") {
            throw new HttpException('Ligand Version Already Found! ', HttpStatus.BAD_REQUEST);
        } else if (ligand001wb2 && ligand001wb2.status == "Rejected") {
            this.update(ligandDTO);
        }
        else {
            const ligand001wbNew = new Ligand001wb();
            ligand001wbNew.setProperties(ligandDTO);
            if (!ligand001wbNew.collectionId || ligand001wbNew.collectionId == null || ligand001wbNew.collectionId == "null") {
                ligand001wbNew.collectionId = "";

            }
            return this.ligandRepository.save(ligand001wbNew);
        }

    }

    async update1(ligandDTO: LigandDTO): Promise<Ligand001wb> {
        const ligand001wb = new Ligand001wb();

        // ligand001wb.assay001wbs.datalocator
        ligand001wb.setProperties(ligandDTO);
        if (!ligand001wb.collectionId || ligand001wb.collectionId == null || ligand001wb.collectionId == "null") {
            ligand001wb.collectionId = "";
        }
        await this.ligandRepository.update({ ligandId: ligand001wb.ligandId }, ligand001wb);
        return ligand001wb;
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

    async findAllRejected(ligandId: any): Promise<Ligand001wb> {
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

    async updateStatus(username:any,ligandId: any, tanNumber: any): Promise<Ligand001wb> {
        const ligand001wbUpdate = new Ligand001wb();
        ligand001wbUpdate.status = "Submitted to QC";
        ligand001wbUpdate.updatedUser = username;
        ligand001wbUpdate.updatedDatetime = new Date();
        const ligand001wbs = await this.ligandRepository.find({
            where: { tanNumber: tanNumber }, relations: ["ligandVersionSlno2", "ligandTypeSlno2", "assay001wbs", "assay001wbs.assayTypeSlno2",
                "assay001wbs.toxiCitySlno2", "assay001wbs.routeSlno2", "assay001wbs.unitSlno2", "assay001wbs.unitedSlno2",
                "assay001wbs.categorySlno2", "assay001wbs.functionSlno2", "assay001wbs.originalPrefixSlno2", "assay001wbs.typeSlno2"]
        });
        for (let ligand001wb of ligand001wbs) {
            await this.ligandRepository.save({ ...ligand001wb, ...ligand001wbUpdate });
            for (let assay of ligand001wb.assay001wbs) {
                let newAssas = new Assay001wb();
                newAssas.status = "Submitted to QC";
                newAssas.updatedUser = username;
                newAssas.updatedDatetime = new Date();
                await this.assayRepository.save({ ...assay, ...newAssas });
            }
        }

        const taskallocation001wb = new Taskallocation001wb();
        taskallocation001wb.status = "Submitted to QC";
        taskallocation001wb.updatedDatetime = new Date();
        await this.taskAllocateRepository.update({ curatorTanNo: tanNumber }, taskallocation001wb);

        return ligand001wbUpdate;
    }

    async reviewerAcceptStatusUpdate(tanNumber: any,username:any): Promise<Ligand001wb> {
        const ligand001wbUpdate = new Ligand001wb();
        ligand001wbUpdate.status = "Completed";
        ligand001wbUpdate.updatedUser = username;
        ligand001wbUpdate.updatedDatetime = new Date();
        const ligand001wbs = await this.ligandRepository.find({
            where: { tanNumber: tanNumber }, relations: ["ligandVersionSlno2", "ligandTypeSlno2", "assay001wbs", "assay001wbs.assayTypeSlno2",
                "assay001wbs.toxiCitySlno2", "assay001wbs.routeSlno2", "assay001wbs.unitSlno2", "assay001wbs.unitedSlno2",
                "assay001wbs.categorySlno2", "assay001wbs.functionSlno2", "assay001wbs.originalPrefixSlno2", "assay001wbs.typeSlno2"]
        });
        for (let ligand001wb of ligand001wbs) {
            await this.ligandRepository.save({ ...ligand001wb, ...ligand001wbUpdate });
            for (let assay of ligand001wb.assay001wbs) {
                let newAssas = new Assay001wb();
                newAssas.status = "Completed";
                newAssas.updatedUser = username;
                newAssas.updatedDatetime = new Date();
                await this.assayRepository.save({ ...assay, ...newAssas });
            }
        }

        const taskallocation001wb = new Taskallocation001wb();
        taskallocation001wb.reviewerStatus = "Completed";
        taskallocation001wb.reviewerUpdatedDate = new Date();
        await this.taskAllocateRepository.update({ curatorTanNo: tanNumber }, taskallocation001wb);

        return ligand001wbUpdate;
    }

    async reviewerRejectStatusUpdate(tanNumber: any,username:any): Promise<Ligand001wb> {

        const ligand001wbs = await this.ligandRepository.find({
            where: { tanNumber: tanNumber }, relations: ["ligandVersionSlno2", "ligandTypeSlno2", "assay001wbs", "assay001wbs.assayTypeSlno2",
                "assay001wbs.toxiCitySlno2", "assay001wbs.routeSlno2", "assay001wbs.unitSlno2", "assay001wbs.unitedSlno2",
                "assay001wbs.categorySlno2", "assay001wbs.functionSlno2", "assay001wbs.originalPrefixSlno2", "assay001wbs.typeSlno2"]
        });

        let ligand001wbUpdate = new Ligand001wb();
        ligand001wbUpdate.status = "Rejected";
        ligand001wbUpdate.updatedUser = username;
        for (let ligand001wb of ligand001wbs) {
           
            ligand001wbUpdate.ligandUri = "";
            ligand001wbUpdate.ligandVersionSlno = null;
            ligand001wbUpdate.ligandVersionSlno2 = undefined;
            ligand001wbUpdate.ligandStatus = "";
            ligand001wbUpdate.collection = "";
            ligand001wbUpdate.ligandTypeSlno = null;
            ligand001wbUpdate.ligandTypeSlno2 = undefined;
            ligand001wbUpdate.ligandDetail = "";
            ligand001wbUpdate.identifier1 = "";
            ligand001wbUpdate.identifier2 = "";
            ligand001wbUpdate.identifier3 = "";
            ligand001wbUpdate.collectionId = "";
            ligand001wbUpdate.locator = "";
            ligand001wbUpdate.sourceType = "";
            ligand001wbUpdate.citation = "";
            ligand001wbUpdate.diseaseName1 = "";
            ligand001wbUpdate.diseaseName2 = "";
            ligand001wbUpdate.diseaseName3 = "";
            ligand001wbUpdate.target = "";
            ligand001wbUpdate.targetVersion = "";
            ligand001wbUpdate.targetStatus = "";
            ligand001wbUpdate.collectionId1 = "";
            ligand001wbUpdate.original = "";
            ligand001wbUpdate.acronym = "";
            ligand001wbUpdate.organism = "";
            ligand001wbUpdate.variant = "";
            ligand001wbUpdate.updatedDatetime = new Date();
            // let ligandUpdate = { ...ligand001wb, ...ligand001wbUpdate };
            // await this.ligandRepository.update( {ligandId : ligand001wb.ligandId}, { ...ligand001wb, ...ligand001wbUpdate });
            await this.ligandRepository.save({ ...ligand001wb, ...ligand001wbUpdate });

            let newAssas = new Assay001wb();
            newAssas.status = "Rejected";
            newAssas.updatedUser = username;
            newAssas.ordinal = "";
            newAssas.assayTypeSlno = null;
            newAssas.assayTypeSlno2 = undefined;
            newAssas.toxiCitySlno = null;
            newAssas.toxiCitySlno2 = undefined;
            newAssas.routeSlno = null;
            newAssas.routeSlno2 = undefined;
            newAssas.collectionId = "";
            newAssas.ligandSlno = null;
            newAssas.ligandSlno2 = undefined;
            newAssas.ligandSvalue = "";
            newAssas.unitSlno = null;
            newAssas.unitSlno2 = undefined;
            newAssas.ligandHvalue = "";
            newAssas.ligandLvalue = "";
            newAssas.administration = "";
            newAssas.procedure = "";
            newAssas.target = "";
            newAssas.conditionType = "";
            newAssas.conditionMaterial = "";
            newAssas.conditionMaterialid = "";
            newAssas.singleCondition = "";
            newAssas.singleUnit = "";
            newAssas.highCondition = "";
            newAssas.lowCondition = "";
            newAssas.highLowUnit = "";
            newAssas.unitedSlno = null;
            newAssas.unitedSlno2 = undefined;
            newAssas.dataLocator = "";
            newAssas.dataLocator1 = "";
            newAssas.dataLocator2 = "";
            newAssas.dataLocator3 = "";
            newAssas.categorySlno = null;
            newAssas.categorySlno2 = undefined;
            newAssas.functionSlno = null;
            newAssas.functionSlno2 = undefined;
            newAssas.parameter = "";
            newAssas.parameterDetail = "";
            newAssas.singleValue = "";
            newAssas.unit = "";
            newAssas.originalPrefixSlno = null;
            newAssas.originalPrefixSlno2 = undefined;
            newAssas.highEndValue = "";
            newAssas.lowEndValue = "";
            newAssas.units = "";
            newAssas.nonNumeric = "";
            newAssas.remark = "";
            newAssas.typeSlno = null;
            newAssas.typeSlno2 = undefined;
            newAssas.cell = "";
            newAssas.cellDetail = "";
            newAssas.organ = "";
            newAssas.organDetail = "";
            newAssas.species = "";
            newAssas.speciesDetail = "";
            newAssas.gender = "";
            newAssas.ageGroup = "";
            newAssas.target = "";
            newAssas.targetVersion = "";
            newAssas.targetStatus = "";
            newAssas.collectionId1 = "";
            newAssas.original = "";
            newAssas.acronym = "";
            newAssas.organism = "";
            newAssas.variant = "";
            newAssas.updatedDatetime = new Date();
            for (let assay of ligand001wb.assay001wbs) {
               
                await this.assayRepository.save({ ...assay, ...newAssas });
            }
        }

        const taskallocation001wb = new Taskallocation001wb();
        taskallocation001wb.status = "Rejected by QC";
        taskallocation001wb.reviewerStatus = "Rejected";
        taskallocation001wb.reviewerUpdatedDate = new Date();
        await this.taskAllocateRepository.update({ curatorTanNo: tanNumber }, taskallocation001wb);
        return ligand001wbUpdate;
    }

    async remove(ligandId: number): Promise<void> {
        await this.ligandRepository.delete(ligandId);
    }
}