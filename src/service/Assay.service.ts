import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AssayDTO } from "src/dto/Assay.dto";
import { Assay001wb } from "src/entity/Assay001wb";
import { Assaytype001mb } from "src/entity/Assaytype001mb";
import { Category001mb } from "src/entity/Category001mb";
import { Categoryfunction001mb } from "src/entity/Categoryfunction001mb";
import { Ligand001wb } from "src/entity/Ligand001wb";
import { Originalprefix001mb } from "src/entity/Originalprefix001mb";
import { Routeofadministration001mb } from "src/entity/Routeofadministration001mb";
import { Taskallocation001wb } from "src/entity/Taskallocation001wb";
import { Toxicity001mb } from "src/entity/Toxicity001mb";
import { Type001mb } from "src/entity/Type001mb";
import { Unitlowendvalue001mb } from "src/entity/Unitlowendvalue001mb";
import { Unitsinglevalue001mb } from "src/entity/Unitsinglevalue001mb";
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

        if (!assay001wb.dataLocator1 || assay001wb.dataLocator1 == null || assay001wb.dataLocator1 == "null") {
            assay001wb.dataLocator1 = "";
        }
        if (!assay001wb.dataLocator2 || assay001wb.dataLocator2 == null || assay001wb.dataLocator2 == "null") {
            assay001wb.dataLocator2 = "";
        }
        if (!assay001wb.dataLocator3 || assay001wb.dataLocator3 == null || assay001wb.dataLocator3 == "null") {
            assay001wb.dataLocator3 = "";
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
            if (assay001wb.ligandSlno2) {
                assay001wb.ligandSlno2.tanNumber = unescape(assay001wb.ligandSlno2 ? assay001wb.ligandSlno2.tanNumber : "");
                assay001wb.ligandSlno2.collection = unescape(assay001wb.ligandSlno2 ? assay001wb.ligandSlno2.collection : "");
                assay001wb.ligandSlno2.ligandDetail = unescape(assay001wb.ligandSlno2 ? assay001wb.ligandSlno2.ligandDetail : "");
                assay001wb.ligandSlno2.identifier1 = unescape(assay001wb.ligandSlno2 ? assay001wb.ligandSlno2.identifier1 : "");
                assay001wb.ligandSlno2.identifier2 = unescape(assay001wb.ligandSlno2 ? assay001wb.ligandSlno2.identifier2 : "");
                assay001wb.ligandSlno2.identifier3 = unescape(assay001wb.ligandSlno2 ? assay001wb.ligandSlno2.identifier3 : "");
                assay001wb.ligandSlno2.collectionId = unescape(assay001wb.ligandSlno2 ? assay001wb.ligandSlno2.collectionId : "");
                assay001wb.ligandSlno2.locator = unescape(assay001wb.ligandSlno2 ? assay001wb.ligandSlno2.locator : "");
                assay001wb.ligandSlno2.diseaseName1 = unescape(assay001wb.ligandSlno2 ? assay001wb.ligandSlno2.diseaseName1 : "");
                assay001wb.ligandSlno2.diseaseName2 = unescape(assay001wb.ligandSlno2 ? assay001wb.ligandSlno2.diseaseName2 : "");
                assay001wb.ligandSlno2.diseaseName3 = unescape(assay001wb.ligandSlno2 ? assay001wb.ligandSlno2.diseaseName3 : "");
            } else {
                assay001wb.ligandSlno2 = new Ligand001wb();
            }

            if (assay001wb.assayTypeSlno2) {
                assay001wb.assayTypeSlno2.assayType = unescape(assay001wb.assayTypeSlno2 ? assay001wb.assayTypeSlno2.assayType : null);
            } else {
                assay001wb.assayTypeSlno2 = new Assaytype001mb();
            }

            if (assay001wb.toxiCitySlno2) {
                assay001wb.toxiCitySlno2.toxiCity = unescape(assay001wb.toxiCitySlno2 ? assay001wb.toxiCitySlno2.toxiCity : null);
            } else {
                assay001wb.toxiCitySlno2 = new Toxicity001mb();
            }

            if (assay001wb.routeSlno2) {
                assay001wb.routeSlno2.route = unescape(assay001wb.routeSlno2 ? assay001wb.routeSlno2.route : null);
            } else {
                assay001wb.routeSlno2 = new Routeofadministration001mb();
            }

            if (assay001wb.unitSlno2) {
                assay001wb.unitSlno2.unit = unescape(assay001wb.unitSlno2 ? assay001wb.unitSlno2.unit : null);
            } else {
                assay001wb.unitSlno2 = new Unitsinglevalue001mb();
            }

            if (assay001wb.unitedSlno2) {
                assay001wb.unitedSlno2.united = unescape(assay001wb.unitedSlno2 ? assay001wb.unitedSlno2.united : null);
            } else {
                assay001wb.unitedSlno2 = new Unitlowendvalue001mb();
            }

            if (assay001wb.categorySlno2) {
                assay001wb.categorySlno2.category = unescape(assay001wb.categorySlno2 ? assay001wb.categorySlno2.category : null);
            } else {
                assay001wb.categorySlno2 = new Category001mb();
            }

            if (assay001wb.functionSlno2) {
                assay001wb.functionSlno2.function = unescape(assay001wb.functionSlno2 ? assay001wb.functionSlno2.function : null);
            } else {
                assay001wb.functionSlno2 = new Categoryfunction001mb();
            }

            if (assay001wb.originalPrefixSlno2) {
                assay001wb.originalPrefixSlno2.originalPrefix = unescape(assay001wb.originalPrefixSlno2 ? assay001wb.originalPrefixSlno2.originalPrefix : null);
            } else {
                assay001wb.originalPrefixSlno2 = new Originalprefix001mb();
            }

            if (assay001wb.typeSlno2) {
                assay001wb.typeSlno2.type = unescape(assay001wb.typeSlno2 ? assay001wb.typeSlno2.type : null);
            } else {
                assay001wb.typeSlno2 = new Type001mb();
            }
        }
        return assay001wbs;


    }

    async findAllByTanligandID(ligandSlno: any): Promise<Assay001wb[]> {
        return this.assayRepository.find({ where: { ligandSlno: ligandSlno }, relations: ["assayTypeSlno2", "toxiCitySlno2", "routeSlno2", "unitSlno2", "unitedSlno2", "ligandSlno2", "ligandSlno2.ligandVersionSlno2", "ligandSlno2.ligandTypeSlno2", "categorySlno2", "functionSlno2", "originalPrefixSlno2", "typeSlno2"] });
    }

    async findAllAssayTan(username: any, tannumber: any): Promise<Assay001wb[]> {
        let ligands: Ligand001wb[] = [];
        ligands = await this.ligandRepository.find({ where: { tanNumber: tannumber } });
        let ligandTanid= [];
        for (let i = 0; i < ligands.length; i++) {
            ligandTanid.push(ligands[i].ligandId);
        }
    
        let tanassay: Assay001wb[] = [];
        tanassay=await this.assayRepository.find({ where: { insertUser: username, ligandSlno: In(ligandTanid) }, relations: ["assayTypeSlno2", "toxiCitySlno2", "routeSlno2", "unitSlno2", "unitedSlno2", "ligandSlno2", "ligandSlno2.ligandVersionSlno2", "ligandSlno2.ligandTypeSlno2", "categorySlno2", "functionSlno2", "originalPrefixSlno2", "typeSlno2"] });
  
    for (let assay001wb of tanassay) {
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
        if (assay001wb.ligandSlno2) {
            assay001wb.ligandSlno2.tanNumber = unescape(assay001wb.ligandSlno2 ? assay001wb.ligandSlno2.tanNumber : "");
            assay001wb.ligandSlno2.collection = unescape(assay001wb.ligandSlno2 ? assay001wb.ligandSlno2.collection : "");
            assay001wb.ligandSlno2.ligandDetail = unescape(assay001wb.ligandSlno2 ? assay001wb.ligandSlno2.ligandDetail : "");
            assay001wb.ligandSlno2.identifier1 = unescape(assay001wb.ligandSlno2 ? assay001wb.ligandSlno2.identifier1 : "");
            assay001wb.ligandSlno2.identifier2 = unescape(assay001wb.ligandSlno2 ? assay001wb.ligandSlno2.identifier2 : "");
            assay001wb.ligandSlno2.identifier3 = unescape(assay001wb.ligandSlno2 ? assay001wb.ligandSlno2.identifier3 : "");
            assay001wb.ligandSlno2.collectionId = unescape(assay001wb.ligandSlno2 ? assay001wb.ligandSlno2.collectionId : "");
            assay001wb.ligandSlno2.locator = unescape(assay001wb.ligandSlno2 ? assay001wb.ligandSlno2.locator : "");
            assay001wb.ligandSlno2.diseaseName1 = unescape(assay001wb.ligandSlno2 ? assay001wb.ligandSlno2.diseaseName1 : "");
            assay001wb.ligandSlno2.diseaseName2 = unescape(assay001wb.ligandSlno2 ? assay001wb.ligandSlno2.diseaseName2 : "");
            assay001wb.ligandSlno2.diseaseName3 = unescape(assay001wb.ligandSlno2 ? assay001wb.ligandSlno2.diseaseName3 : "");
        } else {
            assay001wb.ligandSlno2 = new Ligand001wb();
        }

        if (assay001wb.assayTypeSlno2) {
            assay001wb.assayTypeSlno2.assayType = unescape(assay001wb.assayTypeSlno2 ? assay001wb.assayTypeSlno2.assayType : null);
        } else {
            assay001wb.assayTypeSlno2 = new Assaytype001mb();
        }

        if (assay001wb.toxiCitySlno2) {
            assay001wb.toxiCitySlno2.toxiCity = unescape(assay001wb.toxiCitySlno2 ? assay001wb.toxiCitySlno2.toxiCity : null);
        } else {
            assay001wb.toxiCitySlno2 = new Toxicity001mb();
        }

        if (assay001wb.routeSlno2) {
            assay001wb.routeSlno2.route = unescape(assay001wb.routeSlno2 ? assay001wb.routeSlno2.route : null);
        } else {
            assay001wb.routeSlno2 = new Routeofadministration001mb();
        }

        if (assay001wb.unitSlno2) {
            assay001wb.unitSlno2.unit = unescape(assay001wb.unitSlno2 ? assay001wb.unitSlno2.unit : null);
        } else {
            assay001wb.unitSlno2 = new Unitsinglevalue001mb();
        }

        if (assay001wb.unitedSlno2) {
            assay001wb.unitedSlno2.united = unescape(assay001wb.unitedSlno2 ? assay001wb.unitedSlno2.united : null);
        } else {
            assay001wb.unitedSlno2 = new Unitlowendvalue001mb();
        }

        if (assay001wb.categorySlno2) {
            assay001wb.categorySlno2.category = unescape(assay001wb.categorySlno2 ? assay001wb.categorySlno2.category : null);
        } else {
            assay001wb.categorySlno2 = new Category001mb();
        }

        if (assay001wb.functionSlno2) {
            assay001wb.functionSlno2.function = unescape(assay001wb.functionSlno2 ? assay001wb.functionSlno2.function : null);
        } else {
            assay001wb.functionSlno2 = new Categoryfunction001mb();
        }

        if (assay001wb.originalPrefixSlno2) {
            assay001wb.originalPrefixSlno2.originalPrefix = unescape(assay001wb.originalPrefixSlno2 ? assay001wb.originalPrefixSlno2.originalPrefix : null);
        } else {
            assay001wb.originalPrefixSlno2 = new Originalprefix001mb();
        }

        if (assay001wb.typeSlno2) {
            assay001wb.typeSlno2.type = unescape(assay001wb.typeSlno2 ? assay001wb.typeSlno2.type : null);
        } else {
            assay001wb.typeSlno2 = new Type001mb();
        }
    }
        return tanassay;
    }

    async findAllByLigandIdAndAssayId(assayId: any): Promise<Assay001wb[]> {
        let assay001wbs: Assay001wb[] = [];
        assay001wbs = await this.assayRepository.find({
            where: { assayId: assayId }, relations: ["assayTypeSlno2", "toxiCitySlno2", "routeSlno2", "unitSlno2", "unitedSlno2", "ligandSlno2", "ligandSlno2.ligandVersionSlno2", "ligandSlno2.ligandTypeSlno2", "categorySlno2", "functionSlno2", "originalPrefixSlno2", "typeSlno2"]
        });
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

        for (let assay001wb of Assays) {
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
            if (assay001wb.ligandSlno2) {
                assay001wb.ligandSlno2.tanNumber = unescape(assay001wb.ligandSlno2 ? assay001wb.ligandSlno2.tanNumber : "");
                assay001wb.ligandSlno2.collection = unescape(assay001wb.ligandSlno2 ? assay001wb.ligandSlno2.collection : "");
                assay001wb.ligandSlno2.ligandDetail = unescape(assay001wb.ligandSlno2 ? assay001wb.ligandSlno2.ligandDetail : "");
                assay001wb.ligandSlno2.identifier1 = unescape(assay001wb.ligandSlno2 ? assay001wb.ligandSlno2.identifier1 : "");
                assay001wb.ligandSlno2.identifier2 = unescape(assay001wb.ligandSlno2 ? assay001wb.ligandSlno2.identifier2 : "");
                assay001wb.ligandSlno2.identifier3 = unescape(assay001wb.ligandSlno2 ? assay001wb.ligandSlno2.identifier3 : "");
                assay001wb.ligandSlno2.collectionId = unescape(assay001wb.ligandSlno2 ? assay001wb.ligandSlno2.collectionId : "");
                assay001wb.ligandSlno2.locator = unescape(assay001wb.ligandSlno2 ? assay001wb.ligandSlno2.locator : "");
                assay001wb.ligandSlno2.diseaseName1 = unescape(assay001wb.ligandSlno2 ? assay001wb.ligandSlno2.diseaseName1 : "");
                assay001wb.ligandSlno2.diseaseName2 = unescape(assay001wb.ligandSlno2 ? assay001wb.ligandSlno2.diseaseName2 : "");
                assay001wb.ligandSlno2.diseaseName3 = unescape(assay001wb.ligandSlno2 ? assay001wb.ligandSlno2.diseaseName3 : "");
            } else {
                assay001wb.ligandSlno2 = new Ligand001wb();
            }
            if (assay001wb.assayTypeSlno2) {
                assay001wb.assayTypeSlno2.assayType = unescape(assay001wb.assayTypeSlno2 ? assay001wb.assayTypeSlno2.assayType : null);
            } else {
                assay001wb.assayTypeSlno2 = new Assaytype001mb();
            }
            if (assay001wb.toxiCitySlno2) {
                assay001wb.toxiCitySlno2.toxiCity = unescape(assay001wb.toxiCitySlno2 ? assay001wb.toxiCitySlno2.toxiCity : null);
            } else {
                assay001wb.toxiCitySlno2 = new Toxicity001mb();
            }
            if (assay001wb.routeSlno2) {
                assay001wb.routeSlno2.route = unescape(assay001wb.routeSlno2 ? assay001wb.routeSlno2.route : null);
            } else {
                assay001wb.routeSlno2 = new Routeofadministration001mb();
            }
            if (assay001wb.unitSlno2) {
                assay001wb.unitSlno2.unit = unescape(assay001wb.unitSlno2 ? assay001wb.unitSlno2.unit : null);
            } else {
                assay001wb.unitSlno2 = new Unitsinglevalue001mb();
            }
            if (assay001wb.unitedSlno2) {
                assay001wb.unitedSlno2.united = unescape(assay001wb.unitedSlno2 ? assay001wb.unitedSlno2.united : null);
            } else {
                assay001wb.unitedSlno2 = new Unitlowendvalue001mb();
            }
            if (assay001wb.categorySlno2) {
                assay001wb.categorySlno2.category = unescape(assay001wb.categorySlno2 ? assay001wb.categorySlno2.category : null);
            } else {
                assay001wb.categorySlno2 = new Category001mb();
            }
            if (assay001wb.functionSlno2) {
                assay001wb.functionSlno2.function = unescape(assay001wb.functionSlno2 ? assay001wb.functionSlno2.function : null);
            } else {
                assay001wb.functionSlno2 = new Categoryfunction001mb();
            }
            if (assay001wb.originalPrefixSlno2) {
                assay001wb.originalPrefixSlno2.originalPrefix = unescape(assay001wb.originalPrefixSlno2 ? assay001wb.originalPrefixSlno2.originalPrefix : null);
            } else {
                assay001wb.originalPrefixSlno2 = new Originalprefix001mb();
            }
            if (assay001wb.typeSlno2) {
                assay001wb.typeSlno2.type = unescape(assay001wb.typeSlno2 ? assay001wb.typeSlno2.type : null);
            } else {
                assay001wb.typeSlno2 = new Type001mb();
            }
        }
        
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

    async allAssayReviewer(username: any): Promise<Assay001wb[]> {

        let assay001wbs: Assay001wb[] = [];
        assay001wbs = await this.assayRepository.find({
            where: { updatedUser: username }, relations: ["assayTypeSlno2", "toxiCitySlno2", "routeSlno2", "unitSlno2", "unitedSlno2", "ligandSlno2", "ligandSlno2.ligandVersionSlno2", "ligandSlno2.ligandTypeSlno2", "categorySlno2", "functionSlno2", "originalPrefixSlno2", "typeSlno2"]
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
            if (assay001wb.ligandSlno2) {
                assay001wb.ligandSlno2.tanNumber = unescape(assay001wb.ligandSlno2 ? assay001wb.ligandSlno2.tanNumber : "");
                assay001wb.ligandSlno2.collection = unescape(assay001wb.ligandSlno2 ? assay001wb.ligandSlno2.collection : "");
                assay001wb.ligandSlno2.ligandDetail = unescape(assay001wb.ligandSlno2 ? assay001wb.ligandSlno2.ligandDetail : "");
                assay001wb.ligandSlno2.identifier1 = unescape(assay001wb.ligandSlno2 ? assay001wb.ligandSlno2.identifier1 : "");
                assay001wb.ligandSlno2.identifier2 = unescape(assay001wb.ligandSlno2 ? assay001wb.ligandSlno2.identifier2 : "");
                assay001wb.ligandSlno2.identifier3 = unescape(assay001wb.ligandSlno2 ? assay001wb.ligandSlno2.identifier3 : "");
                assay001wb.ligandSlno2.collectionId = unescape(assay001wb.ligandSlno2 ? assay001wb.ligandSlno2.collectionId : "");
                assay001wb.ligandSlno2.locator = unescape(assay001wb.ligandSlno2 ? assay001wb.ligandSlno2.locator : "");
                assay001wb.ligandSlno2.diseaseName1 = unescape(assay001wb.ligandSlno2 ? assay001wb.ligandSlno2.diseaseName1 : "");
                assay001wb.ligandSlno2.diseaseName2 = unescape(assay001wb.ligandSlno2 ? assay001wb.ligandSlno2.diseaseName2 : "");
                assay001wb.ligandSlno2.diseaseName3 = unescape(assay001wb.ligandSlno2 ? assay001wb.ligandSlno2.diseaseName3 : "");
            } else {
                assay001wb.ligandSlno2 = new Ligand001wb();
            }

            if (assay001wb.assayTypeSlno2) {
                assay001wb.assayTypeSlno2.assayType = unescape(assay001wb.assayTypeSlno2 ? assay001wb.assayTypeSlno2.assayType : null);
            } else {
                assay001wb.assayTypeSlno2 = new Assaytype001mb();
            }

            if (assay001wb.toxiCitySlno2) {
                assay001wb.toxiCitySlno2.toxiCity = unescape(assay001wb.toxiCitySlno2 ? assay001wb.toxiCitySlno2.toxiCity : null);
            } else {
                assay001wb.toxiCitySlno2 = new Toxicity001mb();
            }

            if (assay001wb.routeSlno2) {
                assay001wb.routeSlno2.route = unescape(assay001wb.routeSlno2 ? assay001wb.routeSlno2.route : null);
            } else {
                assay001wb.routeSlno2 = new Routeofadministration001mb();
            }

            if (assay001wb.unitSlno2) {
                assay001wb.unitSlno2.unit = unescape(assay001wb.unitSlno2 ? assay001wb.unitSlno2.unit : null);
            } else {
                assay001wb.unitSlno2 = new Unitsinglevalue001mb();
            }

            if (assay001wb.unitedSlno2) {
                assay001wb.unitedSlno2.united = unescape(assay001wb.unitedSlno2 ? assay001wb.unitedSlno2.united : null);
            } else {
                assay001wb.unitedSlno2 = new Unitlowendvalue001mb();
            }

            if (assay001wb.categorySlno2) {
                assay001wb.categorySlno2.category = unescape(assay001wb.categorySlno2 ? assay001wb.categorySlno2.category : null);
            } else {
                assay001wb.categorySlno2 = new Category001mb();
            }

            if (assay001wb.functionSlno2) {
                assay001wb.functionSlno2.function = unescape(assay001wb.functionSlno2 ? assay001wb.functionSlno2.function : null);
            } else {
                assay001wb.functionSlno2 = new Categoryfunction001mb();
            }

            if (assay001wb.originalPrefixSlno2) {
                assay001wb.originalPrefixSlno2.originalPrefix = unescape(assay001wb.originalPrefixSlno2 ? assay001wb.originalPrefixSlno2.originalPrefix : null);
            } else {
                assay001wb.originalPrefixSlno2 = new Originalprefix001mb();
            }

            if (assay001wb.typeSlno2) {
                assay001wb.typeSlno2.type = unescape(assay001wb.typeSlno2 ? assay001wb.typeSlno2.type : null);
            } else {
                assay001wb.typeSlno2 = new Type001mb();
            }
        }
        return assay001wbs;


    }
}