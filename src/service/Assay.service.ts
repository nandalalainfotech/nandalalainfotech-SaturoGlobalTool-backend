import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AssayDTO } from "src/dto/Assay.dto";
import { Assay001wb } from "src/entity/Assay001wb";
import { Ligand001wb } from "src/entity/Ligand001wb";
import { Taskallocation001wb } from "src/entity/Taskallocation001wb";
import { User001mb } from "src/entity/User001mb";
import { getRepository, In, Repository } from "typeorm";

@Injectable()
export class AssayService {
    constructor(
        @InjectRepository(User001mb) private readonly userRepository: Repository<User001mb>,
        @InjectRepository(Assay001wb) private readonly assayRepository: Repository<Assay001wb>,
        @InjectRepository(Taskallocation001wb) private readonly taskAllocateRepository: Repository<Taskallocation001wb>,
        @InjectRepository(Ligand001wb) private readonly ligandRepository: Repository<Ligand001wb>) {

    }
    async create(assayDTO: AssayDTO): Promise<Assay001wb> {

        const assay001wb = new Assay001wb();

        assay001wb.setProperties(assayDTO);
        if (assay001wb.targetVersion == "" || assay001wb.targetVersion == null || assay001wb.targetVersion == "NA") {
            assay001wb.targetStatus = "";
            assay001wb.target = "";
        }
        if (!assay001wb.dataLocator1 || assay001wb.dataLocator1 == null || assay001wb.dataLocator1 == "null") {
            assay001wb.dataLocator1 = "";
        }
        if (!assay001wb.dataLocator2 || assay001wb.dataLocator2 == null || assay001wb.dataLocator2 == "null") {
            assay001wb.dataLocator2 = "";
        }
        if (!assay001wb.dataLocator3 || assay001wb.dataLocator3 == null || assay001wb.dataLocator3 == "null") {
            assay001wb.dataLocator3 = "";
        }

        return this.assayRepository.save(assay001wb);
    }

    async update(assayDTO: AssayDTO): Promise<Assay001wb> {
        const assay001wb = new Assay001wb();
        assay001wb.setProperties(assayDTO);
        if (assay001wb.targetVersion == "" || assay001wb.targetVersion == null || assay001wb.targetVersion == "NA") {
            assay001wb.targetStatus = "";
            assay001wb.target = "";
        }
        await this.assayRepository.update({ assayId: assay001wb.assayId }, assay001wb);
        return assay001wb;
    }


    async findAll(username: any): Promise<Assay001wb[]> {

        let assay001wbs: Assay001wb[] = [];
        assay001wbs = await this.assayRepository.find({
            where: { insertUser: username }, relations: ["assayTypeSlno2", "toxiCitySlno2", "routeSlno2", "unitSlno2", "unitedSlno2", "ligandSlno2", "ligandSlno2.ligandVersionSlno2", "ligandSlno2.ligandTypeSlno2", "categorySlno2", "functionSlno2", "originalPrefixSlno2", "typeSlno2"]
        });
        for (let assay001wb of assay001wbs) {
            assay001wb.administration = unescape(assay001wb.administration);
            assay001wb.procedure = unescape(assay001wb.procedure);
            assay001wb.ligandSvalue = unescape(assay001wb.ligandSvalue);
            assay001wb.ligandHvalue = unescape(assay001wb.ligandHvalue);
            assay001wb.ligandLvalue = unescape(assay001wb.ligandLvalue);
            assay001wb.conditionMaterial = unescape(assay001wb.conditionMaterial);
            assay001wb.conditionMaterialid = unescape(assay001wb.conditionMaterialid);
            assay001wb.singleCondition = unescape(assay001wb.singleCondition);
            assay001wb.highCondition = unescape(assay001wb.highCondition);
            assay001wb.lowCondition = unescape(assay001wb.lowCondition);
            assay001wb.dataLocator1 = unescape(assay001wb.dataLocator1);
            assay001wb.dataLocator2 = unescape(assay001wb.dataLocator2);
            assay001wb.dataLocator3 = unescape(assay001wb.dataLocator3);
            assay001wb.parameter = unescape(assay001wb.parameter);
            assay001wb.parameterDetail = unescape(assay001wb.parameterDetail);
            assay001wb.singleValue = unescape(assay001wb.singleValue);
            assay001wb.highEndValue = unescape(assay001wb.highEndValue);
            assay001wb.lowEndValue = unescape(assay001wb.lowEndValue);
            assay001wb.nonNumeric = unescape(assay001wb.nonNumeric);
            assay001wb.remark = unescape(assay001wb.remark);
            assay001wb.cell = unescape(assay001wb.cell);
            assay001wb.cellDetail = unescape(assay001wb.cellDetail);
            assay001wb.organ = unescape(assay001wb.organ);
            assay001wb.organDetail = unescape(assay001wb.organDetail);
            assay001wb.species = unescape(assay001wb.species);
            assay001wb.speciesDetail = unescape(assay001wb.speciesDetail);
            assay001wb.ageGroup = unescape(assay001wb.ageGroup);
            assay001wb.targetVersion = unescape(assay001wb.targetVersion);
            assay001wb.collectionId1 = unescape(assay001wb.collectionId1);
            assay001wb.original = unescape(assay001wb.original);
            assay001wb.acronym = unescape(assay001wb.acronym);
            assay001wb.organism = unescape(assay001wb.organism);
            assay001wb.variant = unescape(assay001wb.variant);

            assay001wb.unit = unescape(assay001wb.unit);
            assay001wb.units = unescape(assay001wb.units);
            assay001wb.collectionId = unescape(assay001wb.collectionId);
            assay001wb.conditionType = unescape(assay001wb.conditionType);
            assay001wb.highLowUnit = unescape(assay001wb.highLowUnit);
            assay001wb.status = unescape(assay001wb.status);

            assay001wb.ligandSlno2.tanNumber = unescape(assay001wb.ligandSlno2.tanNumber);
            assay001wb.ligandSlno2.collection = unescape(assay001wb.ligandSlno2.collection);
            assay001wb.ligandSlno2.ligandDetail = unescape(assay001wb.ligandSlno2.ligandDetail);
            assay001wb.ligandSlno2.identifier1 = unescape(assay001wb.ligandSlno2.identifier1);
            assay001wb.ligandSlno2.identifier2 = unescape(assay001wb.ligandSlno2.identifier2);
            assay001wb.ligandSlno2.identifier3 = unescape(assay001wb.ligandSlno2.identifier3);
            assay001wb.ligandSlno2.collectionId = unescape(assay001wb.ligandSlno2.collectionId);
            assay001wb.ligandSlno2.locator = unescape(assay001wb.ligandSlno2.locator);
            assay001wb.ligandSlno2.diseaseName1 = unescape(assay001wb.ligandSlno2.diseaseName1);
            assay001wb.ligandSlno2.diseaseName2 = unescape(assay001wb.ligandSlno2.diseaseName2);
            assay001wb.ligandSlno2.diseaseName3 = unescape(assay001wb.ligandSlno2.diseaseName3);
        }
        return assay001wbs;


    }

    async findInprocesStatus(username: any): Promise<Assay001wb[]> {

        // let Assays: Assay001wb[] = [];

        // Assays = await this.assayRepository.find({ where:{insertUser: username}, relations: ["assayTypeSlno2", "toxiCitySlno2", "routeSlno2", "unitSlno2", "unitedSlno2", "ligandSlno2", "ligandSlno2.ligandVersionSlno2", "ligandSlno2.ligandTypeSlno2", "categorySlno2", "functionSlno2", "originalPrefixSlno2", "typeSlno2"] });

        return await this.assayRepository.find({ where: { insertUser: username }, relations: ["assayTypeSlno2", "toxiCitySlno2", "routeSlno2", "unitSlno2", "unitedSlno2", "ligandSlno2", "ligandSlno2.ligandVersionSlno2", "ligandSlno2.ligandTypeSlno2", "categorySlno2", "functionSlno2", "originalPrefixSlno2", "typeSlno2"] });
        // return await this.assayRepository.find({ where:{status: "In Process",insertUser: username},relations: ["assayTypeSlno2", "toxiCitySlno2", "routeSlno2", "unitSlno2", "unitedSlno2", "ligandSlno2", "ligandSlno2.ligandVersionSlno2", "ligandSlno2.ligandTypeSlno2", "categorySlno2", "functionSlno2", "originalPrefixSlno2", "typeSlno2"] });
    }

    async findByReviewer(username: any): Promise<Assay001wb[]> {

        let taskAllocations: Taskallocation001wb[] = [];
        taskAllocations = await this.taskAllocateRepository.find({ where: { reviewerName: username } });
        let taskTanNo = [];
        for (let i = 0; i < taskAllocations.length; i++) {
            taskTanNo.push(taskAllocations[i].reviewerTanNo);
        }

        let ligands: Ligand001wb[] = [];
        ligands = await this.ligandRepository.find({ where: { tanNumber: In(taskTanNo) } });

        let ligandids = [];
        for (let i = 0; i < ligands.length; i++) {
            ligandids.push(ligands[i].ligandId);
        }

        let Assays: Assay001wb[] = [];
        Assays = await this.assayRepository.find({ where: { ligandSlno2: { ligandId: In(ligandids) } }, relations: ["assayTypeSlno2", "toxiCitySlno2", "routeSlno2", "unitSlno2", "unitedSlno2", "ligandSlno2", "ligandSlno2.ligandVersionSlno2", "ligandSlno2.ligandTypeSlno2", "categorySlno2", "functionSlno2", "originalPrefixSlno2", "typeSlno2"] });
        return Assays;
    }



    async findOne(id: number | any): Promise<Assay001wb> {

        let Assays: Assay001wb[] = [];
        let AssaysTanNumbers: Assay001wb[] = [];

        Assays = await this.assayRepository.find({ relations: ["assayTypeSlno2", "toxiCitySlno2", "routeSlno2", "unitSlno2", "unitedSlno2", "ligandSlno2", "ligandSlno2.ligandVersionSlno2", "ligandSlno2.ligandTypeSlno2", "categorySlno2", "functionSlno2", "originalPrefixSlno2", "typeSlno2"] });
        for (let i = 0; i < Assays.length; i++) {

            if (Assays[i].ligandSlno2.tanNumber == id) {
                AssaysTanNumbers.push(Assays[i]);
            }
        }
        let assay001wbs: Assay001wb[] = [];



        let assayIds = [];
        for (let i = 0; i < AssaysTanNumbers.length; i++) {
            assayIds.push(AssaysTanNumbers[i].assayId)
            // assay001wbs = await this.assayRepository.update({where:{assayId:AssaysTanNumbers[i].assayId}});
        }
        const assay001wb = new Assay001wb();
        assay001wb.status = "Submitted to Qc";

        await this.assayRepository.update({ assayId: In(assayIds) }, assay001wb);

        return assay001wb;
        // return this.assayRepository.findOne(id);
    }

    async remove(assayId: number): Promise<void> {
        await this.assayRepository.delete(assayId);
    }
}