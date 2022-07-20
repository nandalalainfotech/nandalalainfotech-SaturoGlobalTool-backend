import { HttpException, HttpStatus, Injectable, Req, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Response } from "express";
import { Assay001wb } from "src/entity/Assay001wb";
import { Assaytype001mb } from "src/entity/Assaytype001mb";
import { Category001mb } from "src/entity/Category001mb";
import { Categoryfunction001mb } from "src/entity/Categoryfunction001mb";
import { Ligand001wb } from "src/entity/Ligand001wb";
import { Measurement001wb } from "src/entity/Measurement001wb";
import { Originalprefix001mb } from "src/entity/Originalprefix001mb";
import { Routeofadministration001mb } from "src/entity/Routeofadministration001mb";
import { Taskallocation001wb } from "src/entity/Taskallocation001wb";
import { Toxicity001mb } from "src/entity/Toxicity001mb";
import { Type001mb } from "src/entity/Type001mb";
import { Unitlowendvalue001mb } from "src/entity/Unitlowendvalue001mb";
import { Unitsinglevalue001mb } from "src/entity/Unitsinglevalue001mb";

import { Request } from "supertest";
import { In, Repository, Between, getConnection } from "typeorm";
var path = require('path');
var fs = require("fs");
var zipdir = require('zip-dir');
var path = require('path');
const excel = require('exceljs');
let output = "";
var unitsinglevalues: Unitsinglevalue001mb[] = [];
var unitlowendvalues: Unitlowendvalue001mb[] = [];

@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Assay001wb) private readonly assayRepository: Repository<Assay001wb>,
        @InjectRepository(Ligand001wb) private readonly ligandRepository: Repository<Ligand001wb>,
        @InjectRepository(Taskallocation001wb) private readonly taskAllocateRepository: Repository<Taskallocation001wb>,
        @InjectRepository(Unitsinglevalue001mb) private readonly unitsinglevalueRepository: Repository<Unitsinglevalue001mb>,
        @InjectRepository(Unitlowendvalue001mb) private readonly unitlowendvalueRepository: Repository<Unitlowendvalue001mb>) {

    }

    async downloadTanExcel(reviewerTan: any, @Req() request: Request, @Res() response: Response) {



        let ligands: Ligand001wb[] = [];
        ligands = await this.ligandRepository.find({ where: { tanNumber: reviewerTan } });
        let ligandids = [];
        for (let i = 0; i < ligands.length; i++) {
            ligandids.push(ligands[i].ligandId);
        }
        let assaysTan: Assay001wb[] = [];

        let assays: Assay001wb[] = [];
        // assays = await this.assayRepository.find({ relations: ["assayTypeSlno2", "toxiCitySlno2", "routeSlno2", "unitSlno2", "unitedSlno2", "ligandSlno2", "ligandSlno2.ligandVersionSlno2", "ligandSlno2.ligandTypeSlno2", "categorySlno2", "functionSlno2", "originalPrefixSlno2", "typeSlno2"] });
        assaysTan = await this.assayRepository.find({ where: { ligandSlno2: { ligandId: In(ligandids) }, status: "Completed" }, relations: ["assayTypeSlno2", "toxiCitySlno2", "routeSlno2", "unitSlno2", "unitedSlno2", "ligandSlno2", "ligandSlno2.ligandVersionSlno2", "ligandSlno2.ligandTypeSlno2", "categorySlno2", "functionSlno2", "originalPrefixSlno2", "typeSlno2"] });


        unitsinglevalues = await this.unitsinglevalueRepository.find();
        unitlowendvalues = await this.unitlowendvalueRepository.find();

        for (let assay001wb of assaysTan) {
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
            assays.push(assay001wb);
        }


        if (assays.length < 0) {
            return;
        }
        else {
            let workbook: any = null;
            let worksheet: any = null;
            let initRow = 3;
            let flag: boolean = true;
            let tanNumber: string = null;
            let batchNo: string = null;
            workbook = new excel.Workbook();
            worksheet = await ReportHeader(workbook);
            for (let i = 0; i < assays.length; i++) {
                let tempTan = (i == 0) ? 0 : (i != 0) ? (i - 1) : 0;
                if (assays[tempTan].ligandSlno2?.tanNumber == assays[i].ligandSlno2?.tanNumber) {
                    let assaycount = assays[i];
                    await ReportData(worksheet, initRow, assaycount, i, unitsinglevalues, unitlowendvalues);
                    tanNumber = assays[i].ligandSlno2?.tanNumber;
                    let taskallocates = await this.taskAllocateRepository.findOne({ where: { curatorTanNo: tanNumber } });
                    batchNo = taskallocates.cbatchNo
                    initRow++;
                } else {
                    await workbook.xlsx.writeFile('./EXCEL/' + batchNo + '_export_' + tanNumber + '.xlsx');
                    initRow = 3;
                    workbook = new excel.Workbook();
                    worksheet = await ReportHeader(workbook);
                    let assaycount = assays[i];
                    await ReportData(worksheet, initRow, assaycount, i, unitsinglevalues, unitlowendvalues);
                    tanNumber = assays[i].ligandSlno2?.tanNumber;
                    let taskallocates = await this.taskAllocateRepository.findOne({ where: { curatorTanNo: tanNumber } });
                    batchNo = taskallocates.cbatchNo
                    initRow++;
                }
            }
            await workbook.xlsx.writeFile('./EXCEL/' + batchNo + '_export_' + tanNumber + '.xlsx');

            var buffer = await zipdir('./EXCEL');
            response.send(buffer);

            const directory = './EXCEL';
            fs.readdir(directory, (err, files) => {
                if (err) throw err;

                for (const file of files) {
                    fs.unlink(path.join(directory, file), err => {
                        if (err) throw err;
                    });
                }
            });

        }
    }


    async curatorTanExcel(curatorTanNo: any, @Req() request: Request, @Res() response: Response) {

        let ligands: Ligand001wb[] = [];
        ligands = await this.ligandRepository.find({ where: { tanNumber: curatorTanNo } });
        let ligandids = [];
        for (let i = 0; i < ligands.length; i++) {
            ligandids.push(ligands[i].ligandId);
        }
        let assaysTan: Assay001wb[] = [];

        let assays: Assay001wb[] = [];
        // assays = await this.assayRepository.find({ relations: ["assayTypeSlno2", "toxiCitySlno2", "routeSlno2", "unitSlno2", "unitedSlno2", "ligandSlno2", "ligandSlno2.ligandVersionSlno2", "ligandSlno2.ligandTypeSlno2", "categorySlno2", "functionSlno2", "originalPrefixSlno2", "typeSlno2"] });
        // assaysTan = await this.assayRepository.find({ where: { ligandSlno2: { ligandId: In(ligandids) } }, relations: ["assayTypeSlno2", "toxiCitySlno2", "routeSlno2", "unitSlno2", "unitedSlno2", "ligandSlno2", "ligandSlno2.ligandVersionSlno2", "ligandSlno2.ligandTypeSlno2", "categorySlno2", "functionSlno2", "originalPrefixSlno2", "typeSlno2"] });
        assaysTan = await this.assayRepository.find({
            where:
                [{ ligandSlno2: { ligandId: In(ligandids) }, status: "Submitted to QC" },
                { ligandSlno2: { ligandId: In(ligandids) }, status: "Completed" }], relations: ["assayTypeSlno2", "toxiCitySlno2", "routeSlno2", "unitSlno2", "unitedSlno2", "ligandSlno2", "ligandSlno2.ligandVersionSlno2", "ligandSlno2.ligandTypeSlno2", "categorySlno2", "functionSlno2", "originalPrefixSlno2", "typeSlno2"]
        });

        unitsinglevalues = await this.unitsinglevalueRepository.find();
        unitlowendvalues = await this.unitlowendvalueRepository.find();

        for (let assay001wb of assaysTan) {
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
            assays.push(assay001wb);
        }


        if (assays.length < 0) {
            return;
        }
        else {
            let workbook: any = null;
            let worksheet: any = null;
            let initRow = 3;
            let flag: boolean = true;
            let tanNumber: string = null;
            let batchNo: string = null;
            workbook = new excel.Workbook();
            worksheet = await ReportHeader(workbook);
            for (let i = 0; i < assays.length; i++) {
                let tempTan = (i == 0) ? 0 : (i != 0) ? (i - 1) : 0;
                if (assays[tempTan].ligandSlno2?.tanNumber == assays[i].ligandSlno2?.tanNumber) {
                    let assaycount = assays[i];
                    await ReportData(worksheet, initRow, assaycount, i, unitsinglevalues, unitlowendvalues);
                    tanNumber = assays[i].ligandSlno2?.tanNumber;
                    let taskallocates = await this.taskAllocateRepository.findOne({ where: { curatorTanNo: tanNumber } });
                    batchNo = taskallocates.cbatchNo
                    initRow++;
                } else {
                    await workbook.xlsx.writeFile('./EXCEL/' + batchNo + '_export_' + tanNumber + '.xlsx');
                    initRow = 3;
                    workbook = new excel.Workbook();
                    worksheet = await ReportHeader(workbook);
                    let assaycount = assays[i];
                    await ReportData(worksheet, initRow, assaycount, i, unitsinglevalues, unitlowendvalues);
                    tanNumber = assays[i].ligandSlno2?.tanNumber;
                    let taskallocates = await this.taskAllocateRepository.findOne({ where: { curatorTanNo: tanNumber } });
                    batchNo = taskallocates.cbatchNo
                    initRow++;
                }
            }
            await workbook.xlsx.writeFile('./EXCEL/' + batchNo + '_export_' + tanNumber + '.xlsx');

            var buffer = await zipdir('./EXCEL');
            response.send(buffer);

            const directory = './EXCEL';
            fs.readdir(directory, (err, files) => {
                if (err) throw err;

                for (const file of files) {
                    fs.unlink(path.join(directory, file), err => {
                        if (err) throw err;
                    });
                }
            });

        }
    }

    async batchNumberExportExcel(username: any, rbatchNo: any, @Req() request: Request, @Res() response: Response) {

        let taslallocations: Taskallocation001wb[] = [];
        let taslallocationsTan = [];
        taslallocations = await this.taskAllocateRepository.find({ where: { rbatchNo: rbatchNo } });

        for (let i = 0; i < taslallocations.length; i++) {
            taslallocationsTan.push(taslallocations[i].curatorTanNo)
        }

        let ligands: Ligand001wb[] = [];
        ligands = await this.ligandRepository.find({ where: { tanNumber: In(taslallocationsTan) } });
        let ligandids = [];
        for (let i = 0; i < ligands.length; i++) {
            ligandids.push(ligands[i].ligandId);
        }

        let assaysTan: Assay001wb[] = [];

        let assays: Assay001wb[] = [];
        // assays = await this.assayRepository.find({ relations: ["assayTypeSlno2", "toxiCitySlno2", "routeSlno2", "unitSlno2", "unitedSlno2", "ligandSlno2", "ligandSlno2.ligandVersionSlno2", "ligandSlno2.ligandTypeSlno2", "categorySlno2", "functionSlno2", "originalPrefixSlno2", "typeSlno2"] });
        assaysTan = await this.assayRepository.find({ where: { ligandSlno2: { ligandId: In(ligandids) }, updatedUser: username, status: "Completed" }, relations: ["assayTypeSlno2", "toxiCitySlno2", "routeSlno2", "unitSlno2", "unitedSlno2", "ligandSlno2", "ligandSlno2.ligandVersionSlno2", "ligandSlno2.ligandTypeSlno2", "categorySlno2", "functionSlno2", "originalPrefixSlno2", "typeSlno2"] });

        unitsinglevalues = await this.unitsinglevalueRepository.find();
        unitlowendvalues = await this.unitlowendvalueRepository.find();

        for (let assay001wb of assaysTan) {
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
            assays.push(assay001wb);
        }


        if (assays.length < 0) {
            return;
        }
        else {
            let workbook: any = null;
            let worksheet: any = null;
            let initRow = 3;
            let flag: boolean = true;
            let tanNumber: string = null;
            let batchNo: string = null;
            workbook = new excel.Workbook();
            worksheet = await ReportHeader(workbook);
            for (let i = 0; i < assays.length; i++) {
                let tempTan = (i == 0) ? 0 : (i != 0) ? (i - 1) : 0;
                if (assays[tempTan].ligandSlno2?.tanNumber == assays[i].ligandSlno2?.tanNumber) {
                    let assaycount = assays[i];
                    await ReportData(worksheet, initRow, assaycount, i, unitsinglevalues, unitlowendvalues);
                    tanNumber = assays[i].ligandSlno2?.tanNumber;
                    let taskallocates = await this.taskAllocateRepository.findOne({ where: { curatorTanNo: tanNumber } });
                    batchNo = taskallocates.rbatchNo
                    initRow++;
                } else {
                    await workbook.xlsx.writeFile('./EXCEL/' + batchNo + '_export_' + tanNumber + '.xlsx');
                    initRow = 3;
                    workbook = new excel.Workbook();
                    worksheet = await ReportHeader(workbook);
                    let assaycount = assays[i];
                    await ReportData(worksheet, initRow, assaycount, i, unitsinglevalues, unitlowendvalues);
                    tanNumber = assays[i].ligandSlno2?.tanNumber;
                    let taskallocates = await this.taskAllocateRepository.findOne({ where: { curatorTanNo: tanNumber } });
                    batchNo = taskallocates.rbatchNo
                    initRow++;
                }
            }
            if (batchNo != null) {
                await workbook.xlsx.writeFile('./EXCEL/' + batchNo + '_export_' + tanNumber + '.xlsx');

                var buffer = await zipdir('./EXCEL');
                response.send(buffer);

                const directory = './EXCEL';
                fs.readdir(directory, (err, files) => {
                    if (err) throw err;

                    for (const file of files) {
                        fs.unlink(path.join(directory, file), err => {
                            if (err) throw err;
                        });
                    }
                });
            }
            else {
                throw new HttpException('This Batch Number have no Data!', HttpStatus.NOT_FOUND);

            }

        }
    }


    async startEndDateExportExcel(username: any, startDate: any, endDate: any, @Req() request: Request, @Res() response: Response) {

        let sDate = new Date(startDate);
        // sDate = sDate.getDate() -1;
        sDate.setDate(sDate.getDate() - 1);
        let eDate = new Date(endDate);
        eDate.setDate(eDate.getDate() + 1);

        let ligands: Ligand001wb[] = [];
        ligands = await this.ligandRepository.find({ where: { updatedUser: username, status: "Completed" } });
        let ligandids = [];
        for (let i = 0; i < ligands.length; i++) {
            ligandids.push(ligands[i].ligandId);
        }

        let assaysTan: Assay001wb[] = [];

        let assays: Assay001wb[] = [];

        assaysTan = await this.assayRepository.find({
            where: { updatedDatetime: Between(sDate, eDate), ligandSlno2: { ligandId: In(ligandids) } },
            relations: ["assayTypeSlno2", "toxiCitySlno2", "routeSlno2", "unitSlno2", "unitedSlno2", "ligandSlno2", "ligandSlno2.ligandVersionSlno2", "ligandSlno2.ligandTypeSlno2", "categorySlno2", "functionSlno2", "originalPrefixSlno2", "typeSlno2"]
        });


        unitsinglevalues = await this.unitsinglevalueRepository.find();
        unitlowendvalues = await this.unitlowendvalueRepository.find();

        for (let assay001wb of assaysTan) {
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
            assays.push(assay001wb);
        }


        if (assays.length < 0) {
            return;
        }
        else {
            let workbook: any = null;
            let worksheet: any = null;
            let initRow = 3;
            let flag: boolean = true;
            let tanNumber: string = null;
            let batchNo: string = null;
            workbook = new excel.Workbook();
            worksheet = await ReportHeader(workbook);
            for (let i = 0; i < assays.length; i++) {
                let tempTan = (i == 0) ? 0 : (i != 0) ? (i - 1) : 0;
                if (assays[tempTan].ligandSlno2?.tanNumber == assays[i].ligandSlno2?.tanNumber) {
                    let assaycount = assays[i];
                    await ReportData(worksheet, initRow, assaycount, i, unitsinglevalues, unitlowendvalues);
                    tanNumber = assays[i].ligandSlno2?.tanNumber;
                    let taskallocates = await this.taskAllocateRepository.findOne({ where: { curatorTanNo: tanNumber } });
                    batchNo = taskallocates.rbatchNo
                    initRow++;
                } else {
                    await workbook.xlsx.writeFile('./EXCEL/' + batchNo + '_export_' + tanNumber + '.xlsx');
                    initRow = 3;
                    workbook = new excel.Workbook();
                    worksheet = await ReportHeader(workbook);
                    let assaycount = assays[i];
                    await ReportData(worksheet, initRow, assaycount, i, unitsinglevalues, unitlowendvalues);
                    tanNumber = assays[i].ligandSlno2?.tanNumber;
                    let taskallocates = await this.taskAllocateRepository.findOne({ where: { curatorTanNo: tanNumber } });
                    batchNo = taskallocates.rbatchNo
                    initRow++;
                }
            }
            if (batchNo != null) {
                await workbook.xlsx.writeFile('./EXCEL/' + batchNo + '_export_' + tanNumber + '.xlsx');

                var buffer = await zipdir('./EXCEL');
                response.send(buffer);

                const directory = './EXCEL';
                fs.readdir(directory, (err, files) => {
                    if (err) throw err;

                    for (const file of files) {
                        fs.unlink(path.join(directory, file), err => {
                            if (err) throw err;
                        });
                    }
                });
            }
            else {
                throw new HttpException('This Date have no Data!', HttpStatus.NOT_FOUND);

            }
        }
    }


    async curatorStartEndDateExportExcel(username: any, startDate: any, endDate: any, @Req() request: Request, @Res() response: Response) {

        let sDate = new Date(startDate);
        sDate.setDate(sDate.getDate() - 1);
        let eDate = new Date(endDate);
        eDate.setDate(eDate.getDate() + 1);

        let ligands: Ligand001wb[] = [];
        ligands = await this.ligandRepository.find({ where: { insertUser: username} });
        let ligandids = [];
        for (let i = 0; i < ligands.length; i++) {
            ligandids.push(ligands[i].ligandId);
        }

        let assaysTan: Assay001wb[] = [];

        let assays: Assay001wb[] = [];

        // assaysTan = await this.assayRepository.find({
        //     where: { updatedDatetime: Between(sDate, eDate), ligandSlno2: { ligandId: In(ligandids) } },
        //     relations: ["assayTypeSlno2", "toxiCitySlno2", "routeSlno2", "unitSlno2", "unitedSlno2", "ligandSlno2", "ligandSlno2.ligandVersionSlno2", "ligandSlno2.ligandTypeSlno2", "categorySlno2", "functionSlno2", "originalPrefixSlno2", "typeSlno2"]
        // });

        assaysTan = await this.assayRepository.find({
            where:
                [{ updatedDatetime: Between(sDate, eDate), ligandSlno2: { ligandId: In(ligandids) }, insertUser: username, status: "Submitted to QC" },
                { updatedDatetime: Between(sDate, eDate), ligandSlno2: { ligandId: In(ligandids) }, insertUser: username, status: "Completed" }], relations: ["assayTypeSlno2", "toxiCitySlno2", "routeSlno2", "unitSlno2", "unitedSlno2", "ligandSlno2", "ligandSlno2.ligandVersionSlno2", "ligandSlno2.ligandTypeSlno2", "categorySlno2", "functionSlno2", "originalPrefixSlno2", "typeSlno2"]
        });


        unitsinglevalues = await this.unitsinglevalueRepository.find();
        unitlowendvalues = await this.unitlowendvalueRepository.find();

        for (let assay001wb of assaysTan) {
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
            assays.push(assay001wb);
        }


        if (assays.length < 0) {
            return;
        }
        else {
            let workbook: any = null;
            let worksheet: any = null;
            let initRow = 3;
            let flag: boolean = true;
            let tanNumber: string = null;
            let batchNo: string = null;
            workbook = new excel.Workbook();
            worksheet = await ReportHeader(workbook);
            for (let i = 0; i < assays.length; i++) {
                let tempTan = (i == 0) ? 0 : (i != 0) ? (i - 1) : 0;

                if (assays[tempTan].ligandSlno2?.tanNumber == assays[i].ligandSlno2?.tanNumber) {
                    let assaycount = assays[i];
                    await ReportData(worksheet, initRow, assaycount, i, unitsinglevalues, unitlowendvalues);
                    tanNumber = assays[i].ligandSlno2?.tanNumber;
                    let taskallocates = await this.taskAllocateRepository.findOne({ where: { curatorTanNo: tanNumber } });
                    batchNo = taskallocates.cbatchNo
                    initRow++;
                } else {
                    await workbook.xlsx.writeFile('./EXCEL/' + batchNo + '_export_' + tanNumber + '.xlsx');
                    initRow = 3;
                    workbook = new excel.Workbook();
                    worksheet = await ReportHeader(workbook);
                    let assaycount = assays[i];
                    await ReportData(worksheet, initRow, assaycount, i, unitsinglevalues, unitlowendvalues);
                    tanNumber = assays[i].ligandSlno2?.tanNumber;
                    let taskallocates = await this.taskAllocateRepository.findOne({ where: { curatorTanNo: tanNumber } });
                    batchNo = taskallocates.cbatchNo
                    initRow++;
                }
            }
            if (batchNo != null) {
                await workbook.xlsx.writeFile('./EXCEL/' + batchNo + '_export_' + tanNumber + '.xlsx');

                var buffer = await zipdir('./EXCEL');
                response.send(buffer);

                const directory = './EXCEL';
                fs.readdir(directory, (err, files) => {
                    if (err) throw err;

                    for (const file of files) {
                        fs.unlink(path.join(directory, file), err => {
                            if (err) throw err;
                        });
                    }
                });
            }
            else {
                throw new HttpException('This Date have no Data!', HttpStatus.NOT_FOUND);

            }
        }
    }


    async curatorBatchNumberExportExcel(username: any, cbatchNo: any, @Req() request: Request, @Res() response: Response) {

        let taslallocations: Taskallocation001wb[] = [];
        let taslallocationsTan = [];
        taslallocations = await this.taskAllocateRepository.find({ where: { cbatchNo: cbatchNo } });

        for (let i = 0; i < taslallocations.length; i++) {
            taslallocationsTan.push(taslallocations[i].curatorTanNo)
        }

        let ligands: Ligand001wb[] = [];
        ligands = await this.ligandRepository.find({ where: { tanNumber: In(taslallocationsTan) } });
        let ligandids = [];
        for (let i = 0; i < ligands.length; i++) {
            ligandids.push(ligands[i].ligandId);
        }

        let assaysTan: Assay001wb[] = [];

        let assays: Assay001wb[] = [];
        // assays = await this.assayRepository.find({ relations: ["assayTypeSlno2", "toxiCitySlno2", "routeSlno2", "unitSlno2", "unitedSlno2", "ligandSlno2", "ligandSlno2.ligandVersionSlno2", "ligandSlno2.ligandTypeSlno2", "categorySlno2", "functionSlno2", "originalPrefixSlno2", "typeSlno2"] });
        assaysTan = await this.assayRepository.find({
            where:
                [{ ligandSlno2: { ligandId: In(ligandids) }, insertUser: username, status: "Submitted to QC" },
                { ligandSlno2: { ligandId: In(ligandids) }, insertUser: username, status: "Completed" }], relations: ["assayTypeSlno2", "toxiCitySlno2", "routeSlno2", "unitSlno2", "unitedSlno2", "ligandSlno2", "ligandSlno2.ligandVersionSlno2", "ligandSlno2.ligandTypeSlno2", "categorySlno2", "functionSlno2", "originalPrefixSlno2", "typeSlno2"]
        });

        unitsinglevalues = await this.unitsinglevalueRepository.find();
        unitlowendvalues = await this.unitlowendvalueRepository.find();

        for (let assay001wb of assaysTan) {
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
            assays.push(assay001wb);
        }


        if (assays.length < 0) {
            return;
        }
        else {
            let workbook: any = null;
            let worksheet: any = null;
            let initRow = 3;
            let flag: boolean = true;
            let tanNumber: string = null;
            let batchNo: string = null;
            workbook = new excel.Workbook();
            worksheet = await ReportHeader(workbook);
            for (let i = 0; i < assays.length; i++) {
                let tempTan = (i == 0) ? 0 : (i != 0) ? (i - 1) : 0;
                if (assays[tempTan].ligandSlno2?.tanNumber == assays[i].ligandSlno2?.tanNumber) {
                    let assaycount = assays[i];
                    await ReportData(worksheet, initRow, assaycount, i, unitsinglevalues, unitlowendvalues);
                    tanNumber = assays[i].ligandSlno2?.tanNumber;
                    let taskallocates = await this.taskAllocateRepository.findOne({ where: { curatorTanNo: tanNumber } });
                    batchNo = taskallocates.cbatchNo
                    initRow++;
                } else {
                    await workbook.xlsx.writeFile('./EXCEL/' + batchNo + '_export_' + tanNumber + '.xlsx');
                    initRow = 3;
                    workbook = new excel.Workbook();
                    worksheet = await ReportHeader(workbook);
                    let assaycount = assays[i];
                    await ReportData(worksheet, initRow, assaycount, i, unitsinglevalues, unitlowendvalues);
                    tanNumber = assays[i].ligandSlno2?.tanNumber;
                    let taskallocates = await this.taskAllocateRepository.findOne({ where: { curatorTanNo: tanNumber } });
                    batchNo = taskallocates.cbatchNo
                    initRow++;
                }
            }
            if (batchNo != null) {
                await workbook.xlsx.writeFile('./EXCEL/' + batchNo + '_export_' + tanNumber + '.xlsx');

                var buffer = await zipdir('./EXCEL');
                response.send(buffer);

                const directory = './EXCEL';
                fs.readdir(directory, (err, files) => {
                    if (err) throw err;

                    for (const file of files) {
                        fs.unlink(path.join(directory, file), err => {
                            if (err) throw err;
                        });
                    }
                });
            }
            else {
                throw new HttpException('This Batch Number have no Data!', HttpStatus.NOT_FOUND);

            }

        }
    }

    async downloadExcel(username: any, @Req() request: Request, @Res() response: Response) {

        let taslallocations: Taskallocation001wb[] = [];
        let taslallocationsTan = [];
        taslallocations = await this.taskAllocateRepository.find();

        for (let i = 0; i < taslallocations.length; i++) {
            taslallocationsTan.push(taslallocations[i].curatorTanNo)
        }

        let ligands: Ligand001wb[] = [];
        ligands = await this.ligandRepository.find({ where: { tanNumber: In(taslallocationsTan) } });

        let ligandids = [];
        for (let i = 0; i < ligands.length; i++) {
            ligandids.push(ligands[i].ligandId);
        }

        let assaysTan: Assay001wb[] = [];
        let assays: Assay001wb[] = [];
        assaysTan = await this.assayRepository.find({ where: { ligandSlno2: { ligandId: In(ligandids) }, status: "Completed", updatedUser: username }, relations: ["assayTypeSlno2", "toxiCitySlno2", "routeSlno2", "unitSlno2", "unitedSlno2", "ligandSlno2", "ligandSlno2.ligandVersionSlno2", "ligandSlno2.ligandTypeSlno2", "categorySlno2", "functionSlno2", "originalPrefixSlno2", "typeSlno2"] });
        for (let assay001wb of assaysTan) {
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
            assays.push(assay001wb);
        }

        if (assays.length < 0) {
            return;
        }
        else {
            let workbook: any = null;
            let worksheet: any = null;
            let initRow = 3;
            let flag: boolean = true;
            let tanNumber: string = null;
            let batchNo: string = null;
            let k=0;
            workbook = new excel.Workbook();
            worksheet = await ReportHeader(workbook);
            for (let i = 0; i < assays.length; i++) {
                let tempTan = (i == 0) ? 0 : (i != 0) ? (i - 1) : 0;
                if (assays[tempTan].ligandSlno2?.tanNumber == assays[i].ligandSlno2?.tanNumber) {
                    let assaycount = assays[i];
                    k=k+1;
                    tanNumber = assays[i].ligandSlno2?.tanNumber;
                    await TotalExcelReportData(worksheet, initRow, assaycount, i,k, unitsinglevalues, unitlowendvalues);
                    let taskallocates = await this.taskAllocateRepository.findOne({ where: { curatorTanNo: tanNumber } });
                    batchNo = taskallocates.cbatchNo
                    initRow++;
                } else {
                    await workbook.xlsx.writeFile('./EXCEL/' + batchNo + '_export_' + tanNumber + '.xlsx');
                    initRow = 3;
                    workbook = new excel.Workbook();
                    worksheet = await ReportHeader(workbook);
                    let assaycount = assays[i];
                    k=1;
                    tanNumber = assays[i].ligandSlno2?.tanNumber;
                    await TotalExcelReportData(worksheet, initRow, assaycount, i,k, unitsinglevalues, unitlowendvalues);
                    let taskallocates = await this.taskAllocateRepository.findOne({ where: { curatorTanNo: tanNumber } });
                    batchNo = taskallocates.cbatchNo
                    initRow++;
                }
            }
            await workbook.xlsx.writeFile('./EXCEL/' + batchNo + '_export_' + tanNumber + '.xlsx');

            var buffer = await zipdir('./EXCEL');
            response.send(buffer);

            const directory = './EXCEL';
            fs.readdir(directory, (err, files) => {
                if (err) throw err;

                for (const file of files) {
                    fs.unlink(path.join(directory, file), err => {
                        if (err) throw err;
                    });
                }
            });

        }
    }
}
async function TotalExcelReportData(worksheet, temp, assaycount, i,k, unitsinglevalues, unitlowendvalues) {
    worksheet.mergeCells('A' + temp);
    worksheet.getCell('A' + temp).value = assaycount.ligandSlno2?.tanNumber;
    worksheet.getCell('A' + temp).alignment = { vertical: 'bottom', horizontal: 'left', wrapText: true };
    worksheet.getCell('A' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    worksheet.mergeCells('B' + temp);
    worksheet.getCell('B' + temp).value = assaycount.ligandSlno2?.ligandUri;
    worksheet.getCell('B' + temp).alignment = { vertical: 'bottom', horizontal: 'left', wrapText: true };
    worksheet.getCell('B' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    worksheet.mergeCells('C' + temp);
    worksheet.getCell('C' + temp).value = assaycount.ligandSlno2?.ligandVersionSlno2?.ligandVersion;
    worksheet.getCell('C' + temp).alignment = { vertical: 'bottom', horizontal: 'left', wrapText: true };
    worksheet.getCell('C' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    worksheet.mergeCells('D' + temp);
    worksheet.getCell('D' + temp).value = "embargoed";
    worksheet.getCell('D' + temp).alignment = { vertical: 'bottom', horizontal: 'left', wrapText: true };
    worksheet.getCell('D' + temp).font = {
        size: 10,
        name: 'Calibri',
    };


    worksheet.mergeCells('E' + temp);
    worksheet.getCell('E' + temp).value = "cas";
    worksheet.getCell('E' + temp).alignment = { vertical: 'bottom', horizontal: 'left', wrapText: true };
    worksheet.getCell('E' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    if (assaycount.ligandSlno2?.ligandTypeSlno2?.ligandtype != null) {
        worksheet.mergeCells('F' + temp);
        worksheet.getCell('F' + temp).value = assaycount.ligandSlno2?.ligandTypeSlno2.ligandtype;
        worksheet.getCell('F' + temp).alignment = { vertical: 'bottom', horizontal: 'left', wrapText: true };
        worksheet.getCell('F' + temp).font = {
            size: 10,
            name: 'Calibri',
        };
    }

    worksheet.mergeCells('G' + temp);
    worksheet.getCell('G' + temp).value = assaycount.ligandSlno2?.identifier1;
    worksheet.getCell('G' + temp).alignment = { vertical: 'bottom', horizontal: 'left', wrapText: true };
    worksheet.getCell('G' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    worksheet.mergeCells('H' + temp);
    worksheet.getCell('H' + temp).value = assaycount.ligandSlno2?.identifier2;
    worksheet.getCell('H' + temp).alignment = { vertical: 'bottom', horizontal: 'left', wrapText: true };
    worksheet.getCell('H' + temp).font = {
        size: 10,
        name: 'Calibri',
    };


    worksheet.mergeCells('I' + temp);
    worksheet.getCell('I' + temp).value = assaycount.ligandSlno2?.identifier3;
    worksheet.getCell('I' + temp).alignment = { vertical: 'bottom', horizontal: 'left', wrapText: true };
    worksheet.getCell('I' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    worksheet.mergeCells('J' + temp);
    worksheet.getCell('J' + temp).value = assaycount.ligandSlno2?.collectionId;
    worksheet.getCell('J' + temp).alignment = { vertical: 'bottom', horizontal: 'left', wrapText: true };
    worksheet.getCell('J' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    worksheet.mergeCells('K' + temp);
    worksheet.getCell('K' + temp).value = assaycount.ligandSlno2?.ligandDetail;
    worksheet.getCell('K' + temp).alignment = { vertical: 'bottom', horizontal: 'left', wrapText: true };
    worksheet.getCell('K' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    worksheet.mergeCells('L' + temp);
    worksheet.getCell('L' + temp).value = assaycount.ligandSlno2?.locator;
    worksheet.getCell('L' + temp).alignment = { vertical: 'bottom', horizontal: 'left', wrapText: true };
    worksheet.getCell('L' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    worksheet.mergeCells('M' + temp);
    worksheet.getCell('M' + temp).value = "journal";
    worksheet.getCell('M' + temp).alignment = { vertical: 'bottom', horizontal: 'left', wrapText: true };
    worksheet.getCell('M' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    worksheet.mergeCells('N' + temp);
    worksheet.getCell('N' + temp).value = assaycount.ligandSlno2?.tanNumber;
    worksheet.getCell('N' + temp).alignment = { vertical: 'bottom', horizontal: 'left', wrapText: true };
    worksheet.getCell('N' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    worksheet.mergeCells('O' + temp);
    worksheet.getCell('O' + temp).value = assaycount.ligandSlno2?.tanNumber;
    worksheet.getCell('O' + temp).alignment = { vertical: 'bottom', horizontal: 'left', wrapText: true };
    worksheet.getCell('O' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    worksheet.mergeCells('P' + temp);
    worksheet.getCell('P' + temp).value = assaycount.ligandSlno2?.collectionId;
    worksheet.getCell('P' + temp).alignment = { vertical: 'bottom', horizontal: 'left', wrapText: true };
    worksheet.getCell('P' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    worksheet.mergeCells('BH' + temp);
    worksheet.getCell('BH' + temp).value = assaycount.ligandSlno2?.diseaseName1;
    worksheet.getCell('BH' + temp).alignment = { vertical: 'bottom', horizontal: 'left', wrapText: true };
    worksheet.getCell('BH' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    worksheet.mergeCells('BI' + temp);
    worksheet.getCell('BI' + temp).value = assaycount.ligandSlno2?.diseaseName2;
    worksheet.getCell('BI' + temp).alignment = { vertical: 'bottom', horizontal: 'left', wrapText: true };
    worksheet.getCell('BI' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    worksheet.mergeCells('BJ' + temp);
    worksheet.getCell('BJ' + temp).value = assaycount.ligandSlno2?.diseaseName3;
    worksheet.getCell('BJ' + temp).alignment = { vertical: 'bottom', horizontal: 'left', wrapText: true };
    worksheet.getCell('BJ' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    if (assaycount.targetVersion != "" || assaycount.targetVersion != null || assaycount.targetVersion != "NA") {
        worksheet.mergeCells('BK' + temp);
        worksheet.getCell('BK' + temp).value = assaycount.target;
        worksheet.getCell('BK' + temp).alignment = { vertical: 'bottom', horizontal: 'left', wrapText: true };
        worksheet.getCell('BK' + temp).font = {
            size: 10,
            name: 'Calibri',
        };
    }

    worksheet.mergeCells('BL' + temp);
    worksheet.getCell('BL' + temp).value = assaycount.targetVersion;
    worksheet.getCell('BL' + temp).alignment = { vertical: 'bottom', horizontal: 'left', wrapText: true };
    worksheet.getCell('BL' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    worksheet.mergeCells('BM' + temp);
    worksheet.getCell('BM' + temp).value = assaycount.targetStatus;
    worksheet.getCell('BM' + temp).alignment = { vertical: 'bottom', horizontal: 'left', wrapText: true };
    worksheet.getCell('BM' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    worksheet.mergeCells('BN' + temp);
    worksheet.getCell('BN' + temp).value = assaycount.collectionId1;
    worksheet.getCell('BN' + temp).alignment = { vertical: 'bottom', horizontal: 'left', wrapText: true };
    worksheet.getCell('BN' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    worksheet.mergeCells('BO' + temp);
    worksheet.getCell('BO' + temp).value = assaycount.original;
    worksheet.getCell('BO' + temp).alignment = { vertical: 'bottom', horizontal: 'left', wrapText: true };
    worksheet.getCell('BO' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    worksheet.mergeCells('BP' + temp);
    worksheet.getCell('BP' + temp).value = assaycount.acronym;
    worksheet.getCell('BP' + temp).alignment = { vertical: 'bottom', horizontal: 'left', wrapText: true };
    worksheet.getCell('BP' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    worksheet.mergeCells('BQ' + temp);
    worksheet.getCell('BQ' + temp).value = assaycount.organism;
    worksheet.getCell('BQ' + temp).alignment = { vertical: 'bottom', horizontal: 'left', wrapText: true };
    worksheet.getCell('BQ' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    worksheet.mergeCells('BR' + temp);
    worksheet.getCell('BR' + temp).value = assaycount.variant;
    worksheet.getCell('BR' + temp).alignment = { vertical: 'bottom', horizontal: 'left', wrapText: true };
    worksheet.getCell('BR' + temp).font = {
        size: 10,
        name: 'Calibri',
    };


    // -------------------------------------------Assay-------------------------------------

   if(k>0){
    worksheet.mergeCells('Q' + temp);
    worksheet.getCell('Q' + temp).value = k ;
    worksheet.getCell('Q' + temp).alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('Q' + temp).font = {
        size: 10,
        name: 'Calibri',
    };
    }

    worksheet.mergeCells('R' + temp);
    worksheet.getCell('R' + temp).value = assaycount.ligandSlno2?.tanNumber + "-" + (i + 1);
    worksheet.getCell('R' + temp).alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('R' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    if (assaycount.assayTypeSlno2 != null) {
        worksheet.mergeCells('S' + temp);
        worksheet.getCell('S' + temp).value = assaycount.assayTypeSlno2.assayType;
        worksheet.getCell('S' + temp).alignment = { vertical: 'bottom', horizontal: 'left' };
        worksheet.getCell('S' + temp).font = {
            size: 10,
            name: 'Calibri',
        };
    }

    if (assaycount.toxiCitySlno2 != null) {
        worksheet.mergeCells('T' + temp);
        worksheet.getCell('T' + temp).value = assaycount.toxiCitySlno2.toxiCity;
        worksheet.getCell('T' + temp).alignment = { vertical: 'bottom', horizontal: 'left' };
        worksheet.getCell('T' + temp).font = {
            size: 10,
            name: 'Calibri',
        };
    }

    if (assaycount.routeSlno2 != null) {
        worksheet.mergeCells('U' + temp);
        worksheet.getCell('U' + temp).value = assaycount.routeSlno2.route;
        worksheet.getCell('U' + temp).alignment = { vertical: 'bottom', horizontal: 'left' };
        worksheet.getCell('U' + temp).font = {
            size: 10,
            name: 'Calibri',
        };
    }

    worksheet.mergeCells('V' + temp);
    worksheet.getCell('V' + temp).value = assaycount.administration;
    worksheet.getCell('V' + temp).alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('V' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    worksheet.mergeCells('W' + temp);
    worksheet.getCell('W' + temp).value = assaycount.procedure;
    worksheet.getCell('W' + temp).alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('W' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    if (assaycount.targetVersion != "" || assaycount.targetVersion != null || assaycount.targetVersion != "NA" || assaycount.targetVersion != undefined) {
        worksheet.mergeCells('X' + temp);
        worksheet.getCell('X' + temp).value = assaycount.target;
        worksheet.getCell('X' + temp).alignment = { vertical: 'bottom', horizontal: 'left' };
        worksheet.getCell('X' + temp).font = {
            size: 10,
            name: 'Calibri',
        };
    }

    worksheet.mergeCells('Y' + temp);
    worksheet.getCell('Y' + temp).value = assaycount.ligandSvalue;
    worksheet.getCell('Y' + temp).alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('Y' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    if (assaycount.unitSlno2 != null) {
        worksheet.mergeCells('Z' + temp);
        worksheet.getCell('Z' + temp).value = assaycount.unitSlno2.unit;
        worksheet.getCell('Z' + temp).alignment = { vertical: 'bottom', horizontal: 'left' };
        worksheet.getCell('Z' + temp).font = {
            size: 10,
            name: 'Calibri',
        };
    }

    worksheet.mergeCells('AA' + temp);
    worksheet.getCell('AA' + temp).value = assaycount.ligandHvalue;
    worksheet.getCell('AA' + temp).alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('AA' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    worksheet.mergeCells('AB' + temp);
    worksheet.getCell('AB' + temp).value = assaycount.ligandLvalue;
    worksheet.getCell('AB' + temp).alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('AB' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    if (assaycount.unitedSlno2 != null) {
        worksheet.mergeCells('AC' + temp);
        worksheet.getCell('AC' + temp).value = assaycount.unitedSlno2?.united;
        worksheet.getCell('AC' + temp).alignment = { vertical: 'bottom', horizontal: 'left' };
        worksheet.getCell('AC' + temp).font = {
            size: 10,
            name: 'Calibri',
        };
    }


    worksheet.mergeCells('AD' + temp);
    worksheet.getCell('AD' + temp).value = assaycount.conditionType;
    worksheet.getCell('AD' + temp).alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('AD' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    worksheet.mergeCells('AE' + temp);
    worksheet.getCell('AE' + temp).value = assaycount.conditionMaterial;
    worksheet.getCell('AE' + temp).alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('AE' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    worksheet.mergeCells('AF' + temp);
    worksheet.getCell('AF' + temp).value = assaycount.conditionMaterialid;
    worksheet.getCell('AF' + temp).alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('AF' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    worksheet.mergeCells('AG' + temp);
    worksheet.getCell('AG' + temp).value = assaycount.singleCondition;
    worksheet.getCell('AG' + temp).alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('AG' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    if (assaycount.singleUnit != null) {
        for (let z = 0; z < unitsinglevalues.length; z++) {
            if (assaycount.singleUnit == unitsinglevalues[z].id) {
                worksheet.mergeCells('AH' + temp);
                worksheet.getCell('AH' + temp).value = unescape(unitsinglevalues[z].unit);
                worksheet.getCell('AH' + temp).alignment = { vertical: 'bottom', horizontal: 'left' };
                worksheet.getCell('AH' + temp).font = {
                    size: 10,
                    name: 'Calibri',
                };
            }
        }
    }

    worksheet.mergeCells('AI' + temp);
    worksheet.getCell('AI' + temp).value = assaycount.highCondition;
    worksheet.getCell('AI' + temp).alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('AI' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    worksheet.mergeCells('AJ' + temp);
    worksheet.getCell('AJ' + temp).value = assaycount.lowCondition;
    worksheet.getCell('AJ' + temp).alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('AJ' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    if (assaycount.highLowUnit != null) {
        for (let z = 0; z < unitlowendvalues.length; z++) {
            if (assaycount.highLowUnit == unitlowendvalues[z].id) {
                worksheet.mergeCells('AK' + temp);
                worksheet.getCell('AK' + temp).value = unescape(unitlowendvalues[z].united);
                worksheet.getCell('AK' + temp).alignment = { vertical: 'bottom', horizontal: 'left' };
                worksheet.getCell('AK' + temp).font = {
                    size: 10,
                    name: 'Calibri',
                };
            }
        }

    }




    // --------------------------------------Measurement------------------------------
    if ((assaycount.dataLocator1 != null) && (assaycount.dataLocator1 != "") && (assaycount.dataLocator1 != "undefined") && (assaycount.dataLocator1 != "null")) {
        worksheet.mergeCells('AL' + temp);
        worksheet.getCell('AL' + temp).value = "Table " + assaycount.dataLocator1;
        worksheet.getCell('AL' + temp).alignment = { vertical: 'bottom', horizontal: 'left' };
        worksheet.getCell('AL' + temp).font = {
            size: 10,
            name: 'Calibri',
        };
    }

    if ((assaycount.dataLocator2 != null) && (assaycount.dataLocator2 != "") && (assaycount.dataLocator2 != "undefined") && (assaycount.dataLocator2 != "null")) {
        worksheet.mergeCells('AL' + temp);
        worksheet.getCell('AL' + temp).value = "Figure " + assaycount.dataLocator2;
        worksheet.getCell('AL' + temp).alignment = { vertical: 'bottom', horizontal: 'left' };
        worksheet.getCell('AL' + temp).font = {
            size: 10,
            name: 'Calibri',
        };
    }

    if ((assaycount.dataLocator3 != null) && (assaycount.dataLocator3 != "") && (assaycount.dataLocator3 != "undefined") && (assaycount.dataLocator3 != "null")) {
        worksheet.mergeCells('AL' + temp);
        worksheet.getCell('AL' + temp).value = "Page " + assaycount.dataLocator3 + " (text)";
        worksheet.getCell('AL' + temp).alignment = { vertical: 'bottom', horizontal: 'left' };
        worksheet.getCell('AL' + temp).font = {
            size: 10,
            name: 'Calibri',
        };
    }

    if (assaycount.categorySlno2 != null) {
        worksheet.mergeCells('AM' + temp);
        worksheet.getCell('AM' + temp).value = assaycount.categorySlno2.category;
        worksheet.getCell('AM' + temp).alignment = { vertical: 'bottom', horizontal: 'left' };
        worksheet.getCell('AM' + temp).font = {
            size: 10,
            name: 'Calibri',
        };
    }

    if (assaycount.functionSlno2 != null) {
        worksheet.mergeCells('AN' + temp);
        worksheet.getCell('AN' + temp).value = assaycount.functionSlno2.function;
        worksheet.getCell('AN' + temp).alignment = { vertical: 'bottom', horizontal: 'left' };
        worksheet.getCell('AN' + temp).font = {
            size: 10,
            name: 'Calibri',
        };
    }

    worksheet.mergeCells('AO' + temp);
    worksheet.getCell('AO' + temp).value = assaycount.parameter;
    worksheet.getCell('AO' + temp).alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('AO' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    worksheet.mergeCells('AP' + temp);
    worksheet.getCell('AP' + temp).value = assaycount.parameterDetail;
    worksheet.getCell('AP' + temp).alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('AP' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    if (assaycount.originalPrefixSlno2 != null) {
        worksheet.mergeCells('AQ' + temp);
        worksheet.getCell('AQ' + temp).value = assaycount.originalPrefixSlno2.originalPrefix;
        worksheet.getCell('AQ' + temp).alignment = { vertical: 'bottom', horizontal: 'left' };
        worksheet.getCell('AQ' + temp).font = {
            size: 10,
            name: 'Calibri',
        };
    }

    worksheet.mergeCells('AR' + temp);
    worksheet.getCell('AR' + temp).value = assaycount.singleValue;
    worksheet.getCell('AR' + temp).alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('AR' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    if (assaycount.unit != null) {
        for (let z = 0; z < unitsinglevalues.length; z++) {
            if (assaycount.unit == unitsinglevalues[z].id) {
                worksheet.mergeCells('AS' + temp);
                worksheet.getCell('AS' + temp).value = unescape(unitsinglevalues[z].unit);
                worksheet.getCell('AS' + temp).alignment = { vertical: 'bottom', horizontal: 'left' };
                worksheet.getCell('AS' + temp).font = {
                    size: 10,
                    name: 'Calibri',
                };
            }
        }
    }

    worksheet.mergeCells('AT' + temp);
    worksheet.getCell('AT' + temp).value = assaycount.highEndValue;
    worksheet.getCell('AT' + temp).alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('AT' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    worksheet.mergeCells('AU' + temp);
    worksheet.getCell('AU' + temp).value = assaycount.lowEndValue;
    worksheet.getCell('AU' + temp).alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('AU' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    if (assaycount.units != null) {
        for (let z = 0; z < unitlowendvalues.length; z++) {
            if (assaycount.units == unitlowendvalues[z].id) {
                worksheet.mergeCells('AV' + temp);
                worksheet.getCell('AV' + temp).value = unescape(unitlowendvalues[z].united);
                worksheet.getCell('AV' + temp).alignment = { vertical: 'bottom', horizontal: 'left' };
                worksheet.getCell('AV' + temp).font = {
                    size: 10,
                    name: 'Calibri',
                };
            }
        }
    }

    worksheet.mergeCells('AW' + temp);
    worksheet.getCell('AW' + temp).value = assaycount.nonNumeric;
    worksheet.getCell('AW' + temp).alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('AW' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    worksheet.mergeCells('AX' + temp);
    worksheet.getCell('AX' + temp).value = assaycount.remark;
    worksheet.getCell('AX' + temp).alignment = { vertical: 'bottom', horizontal: 'left', wrapText: true };
    worksheet.getCell('AX' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    if (assaycount.typeSlno2 != null) {
        worksheet.mergeCells('AY' + temp);
        worksheet.getCell('AY' + temp).value = assaycount.typeSlno2.type;
        worksheet.getCell('AY' + temp).alignment = { vertical: 'bottom', horizontal: 'left', wrapText: true };
        worksheet.getCell('AY' + temp).font = {
            size: 10,
            name: 'Calibri',
        };
    }

    worksheet.mergeCells('AZ' + temp);
    worksheet.getCell('AZ' + temp).value = assaycount.cell;
    worksheet.getCell('AZ' + temp).alignment = { vertical: 'bottom', horizontal: 'left', wrapText: true };
    worksheet.getCell('AZ' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    worksheet.mergeCells('BA' + temp);
    worksheet.getCell('BA' + temp).value = assaycount.cellDetail;
    worksheet.getCell('BA' + temp).alignment = { vertical: 'bottom', horizontal: 'left', wrapText: true };
    worksheet.getCell('BA' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    worksheet.mergeCells('BB' + temp);
    worksheet.getCell('BB' + temp).value = assaycount.organ;
    worksheet.getCell('BB' + temp).alignment = { vertical: 'bottom', horizontal: 'left', wrapText: true };
    worksheet.getCell('BB' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    worksheet.mergeCells('BC' + temp);
    worksheet.getCell('BC' + temp).value = assaycount.organDetail;
    worksheet.getCell('BC' + temp).alignment = { vertical: 'bottom', horizontal: 'left', wrapText: true };
    worksheet.getCell('BC' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    worksheet.mergeCells('BD' + temp);
    worksheet.getCell('BD' + temp).value = assaycount.species;
    worksheet.getCell('BD' + temp).alignment = { vertical: 'bottom', horizontal: 'left', wrapText: true };
    worksheet.getCell('BD' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    worksheet.mergeCells('BE' + temp);
    worksheet.getCell('BE' + temp).value = assaycount.speciesDetail;
    worksheet.getCell('BE' + temp).alignment = { vertical: 'bottom', horizontal: 'left', wrapText: true };
    worksheet.getCell('BE' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    if (assaycount.gender != null) {
        worksheet.mergeCells('BF' + temp);
        worksheet.getCell('BF' + temp).value = assaycount.gender;
        worksheet.getCell('BF' + temp).alignment = { vertical: 'bottom', horizontal: 'left', wrapText: true };
        worksheet.getCell('BF' + temp).font = {
            size: 10,
            name: 'Calibri',
        };
    }

    worksheet.mergeCells('BG' + temp);
    worksheet.getCell('BG' + temp).value = assaycount.ageGroup;
    worksheet.getCell('BG' + temp).alignment = { vertical: 'bottom', horizontal: 'left', wrapText: true };
    worksheet.getCell('BG' + temp).font = {
        size: 10,
        name: 'Calibri',
    };
    // return workbook.xlsx.write(response).then(function () {
    //             response['status'](200).end();
    //         });
}

async function ReportData(worksheet, temp, assaycount, i, unitsinglevalues, unitlowendvalues) {
    worksheet.mergeCells('A' + temp);
    worksheet.getCell('A' + temp).value = assaycount.ligandSlno2?.tanNumber;
    worksheet.getCell('A' + temp).alignment = { vertical: 'bottom', horizontal: 'left', wrapText: true };
    worksheet.getCell('A' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    worksheet.mergeCells('B' + temp);
    worksheet.getCell('B' + temp).value = assaycount.ligandSlno2?.ligandUri;
    worksheet.getCell('B' + temp).alignment = { vertical: 'bottom', horizontal: 'left', wrapText: true };
    worksheet.getCell('B' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    worksheet.mergeCells('C' + temp);
    worksheet.getCell('C' + temp).value = assaycount.ligandSlno2?.ligandVersionSlno2?.ligandVersion;
    worksheet.getCell('C' + temp).alignment = { vertical: 'bottom', horizontal: 'left', wrapText: true };
    worksheet.getCell('C' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    worksheet.mergeCells('D' + temp);
    worksheet.getCell('D' + temp).value = "embargoed";
    worksheet.getCell('D' + temp).alignment = { vertical: 'bottom', horizontal: 'left', wrapText: true };
    worksheet.getCell('D' + temp).font = {
        size: 10,
        name: 'Calibri',
    };


    worksheet.mergeCells('E' + temp);
    worksheet.getCell('E' + temp).value = "cas";
    worksheet.getCell('E' + temp).alignment = { vertical: 'bottom', horizontal: 'left', wrapText: true };
    worksheet.getCell('E' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    if (assaycount.ligandSlno2?.ligandTypeSlno2?.ligandtype != null) {
        worksheet.mergeCells('F' + temp);
        worksheet.getCell('F' + temp).value = assaycount.ligandSlno2?.ligandTypeSlno2.ligandtype;
        worksheet.getCell('F' + temp).alignment = { vertical: 'bottom', horizontal: 'left', wrapText: true };
        worksheet.getCell('F' + temp).font = {
            size: 10,
            name: 'Calibri',
        };
    }

    worksheet.mergeCells('G' + temp);
    worksheet.getCell('G' + temp).value = assaycount.ligandSlno2?.identifier1;
    worksheet.getCell('G' + temp).alignment = { vertical: 'bottom', horizontal: 'left', wrapText: true };
    worksheet.getCell('G' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    worksheet.mergeCells('H' + temp);
    worksheet.getCell('H' + temp).value = assaycount.ligandSlno2?.identifier2;
    worksheet.getCell('H' + temp).alignment = { vertical: 'bottom', horizontal: 'left', wrapText: true };
    worksheet.getCell('H' + temp).font = {
        size: 10,
        name: 'Calibri',
    };


    worksheet.mergeCells('I' + temp);
    worksheet.getCell('I' + temp).value = assaycount.ligandSlno2?.identifier3;
    worksheet.getCell('I' + temp).alignment = { vertical: 'bottom', horizontal: 'left', wrapText: true };
    worksheet.getCell('I' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    worksheet.mergeCells('J' + temp);
    worksheet.getCell('J' + temp).value = assaycount.ligandSlno2?.collectionId;
    worksheet.getCell('J' + temp).alignment = { vertical: 'bottom', horizontal: 'left', wrapText: true };
    worksheet.getCell('J' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    worksheet.mergeCells('K' + temp);
    worksheet.getCell('K' + temp).value = assaycount.ligandSlno2?.ligandDetail;
    worksheet.getCell('K' + temp).alignment = { vertical: 'bottom', horizontal: 'left', wrapText: true };
    worksheet.getCell('K' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    worksheet.mergeCells('L' + temp);
    worksheet.getCell('L' + temp).value = assaycount.ligandSlno2?.locator;
    worksheet.getCell('L' + temp).alignment = { vertical: 'bottom', horizontal: 'left', wrapText: true };
    worksheet.getCell('L' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    worksheet.mergeCells('M' + temp);
    worksheet.getCell('M' + temp).value = "journal";
    worksheet.getCell('M' + temp).alignment = { vertical: 'bottom', horizontal: 'left', wrapText: true };
    worksheet.getCell('M' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    worksheet.mergeCells('N' + temp);
    worksheet.getCell('N' + temp).value = assaycount.ligandSlno2?.tanNumber;
    worksheet.getCell('N' + temp).alignment = { vertical: 'bottom', horizontal: 'left', wrapText: true };
    worksheet.getCell('N' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    worksheet.mergeCells('O' + temp);
    worksheet.getCell('O' + temp).value = assaycount.ligandSlno2?.tanNumber;
    worksheet.getCell('O' + temp).alignment = { vertical: 'bottom', horizontal: 'left', wrapText: true };
    worksheet.getCell('O' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    worksheet.mergeCells('P' + temp);
    worksheet.getCell('P' + temp).value = assaycount.ligandSlno2?.collectionId;
    worksheet.getCell('P' + temp).alignment = { vertical: 'bottom', horizontal: 'left', wrapText: true };
    worksheet.getCell('P' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    worksheet.mergeCells('BH' + temp);
    worksheet.getCell('BH' + temp).value = assaycount.ligandSlno2?.diseaseName1;
    worksheet.getCell('BH' + temp).alignment = { vertical: 'bottom', horizontal: 'left', wrapText: true };
    worksheet.getCell('BH' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    worksheet.mergeCells('BI' + temp);
    worksheet.getCell('BI' + temp).value = assaycount.ligandSlno2?.diseaseName2;
    worksheet.getCell('BI' + temp).alignment = { vertical: 'bottom', horizontal: 'left', wrapText: true };
    worksheet.getCell('BI' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    worksheet.mergeCells('BJ' + temp);
    worksheet.getCell('BJ' + temp).value = assaycount.ligandSlno2?.diseaseName3;
    worksheet.getCell('BJ' + temp).alignment = { vertical: 'bottom', horizontal: 'left', wrapText: true };
    worksheet.getCell('BJ' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    if (assaycount.targetVersion != "" || assaycount.targetVersion != null || assaycount.targetVersion != "NA") {
        worksheet.mergeCells('BK' + temp);
        worksheet.getCell('BK' + temp).value = assaycount.target;
        worksheet.getCell('BK' + temp).alignment = { vertical: 'bottom', horizontal: 'left', wrapText: true };
        worksheet.getCell('BK' + temp).font = {
            size: 10,
            name: 'Calibri',
        };
    }

    worksheet.mergeCells('BL' + temp);
    worksheet.getCell('BL' + temp).value = assaycount.targetVersion;
    worksheet.getCell('BL' + temp).alignment = { vertical: 'bottom', horizontal: 'left', wrapText: true };
    worksheet.getCell('BL' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    worksheet.mergeCells('BM' + temp);
    worksheet.getCell('BM' + temp).value = assaycount.targetStatus;
    worksheet.getCell('BM' + temp).alignment = { vertical: 'bottom', horizontal: 'left', wrapText: true };
    worksheet.getCell('BM' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    worksheet.mergeCells('BN' + temp);
    worksheet.getCell('BN' + temp).value = assaycount.collectionId1;
    worksheet.getCell('BN' + temp).alignment = { vertical: 'bottom', horizontal: 'left', wrapText: true };
    worksheet.getCell('BN' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    worksheet.mergeCells('BO' + temp);
    worksheet.getCell('BO' + temp).value = assaycount.original;
    worksheet.getCell('BO' + temp).alignment = { vertical: 'bottom', horizontal: 'left', wrapText: true };
    worksheet.getCell('BO' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    worksheet.mergeCells('BP' + temp);
    worksheet.getCell('BP' + temp).value = assaycount.acronym;
    worksheet.getCell('BP' + temp).alignment = { vertical: 'bottom', horizontal: 'left', wrapText: true };
    worksheet.getCell('BP' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    worksheet.mergeCells('BQ' + temp);
    worksheet.getCell('BQ' + temp).value = assaycount.organism;
    worksheet.getCell('BQ' + temp).alignment = { vertical: 'bottom', horizontal: 'left', wrapText: true };
    worksheet.getCell('BQ' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    worksheet.mergeCells('BR' + temp);
    worksheet.getCell('BR' + temp).value = assaycount.variant;
    worksheet.getCell('BR' + temp).alignment = { vertical: 'bottom', horizontal: 'left', wrapText: true };
    worksheet.getCell('BR' + temp).font = {
        size: 10,
        name: 'Calibri',
    };


    // -------------------------------------------Assay-------------------------------------

    worksheet.mergeCells('Q' + temp);
    worksheet.getCell('Q' + temp).value = i + 1;
    worksheet.getCell('Q' + temp).alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('Q' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    worksheet.mergeCells('R' + temp);
    worksheet.getCell('R' + temp).value = assaycount.ligandSlno2?.tanNumber + "-" + (i + 1);
    worksheet.getCell('R' + temp).alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('R' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    if (assaycount.assayTypeSlno2 != null) {
        worksheet.mergeCells('S' + temp);
        worksheet.getCell('S' + temp).value = assaycount.assayTypeSlno2.assayType;
        worksheet.getCell('S' + temp).alignment = { vertical: 'bottom', horizontal: 'left' };
        worksheet.getCell('S' + temp).font = {
            size: 10,
            name: 'Calibri',
        };
    }

    if (assaycount.toxiCitySlno2 != null) {
        worksheet.mergeCells('T' + temp);
        worksheet.getCell('T' + temp).value = assaycount.toxiCitySlno2.toxiCity;
        worksheet.getCell('T' + temp).alignment = { vertical: 'bottom', horizontal: 'left' };
        worksheet.getCell('T' + temp).font = {
            size: 10,
            name: 'Calibri',
        };
    }

    if (assaycount.routeSlno2 != null) {
        worksheet.mergeCells('U' + temp);
        worksheet.getCell('U' + temp).value = assaycount.routeSlno2.route;
        worksheet.getCell('U' + temp).alignment = { vertical: 'bottom', horizontal: 'left' };
        worksheet.getCell('U' + temp).font = {
            size: 10,
            name: 'Calibri',
        };
    }

    worksheet.mergeCells('V' + temp);
    worksheet.getCell('V' + temp).value = assaycount.administration;
    worksheet.getCell('V' + temp).alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('V' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    worksheet.mergeCells('W' + temp);
    worksheet.getCell('W' + temp).value = assaycount.procedure;
    worksheet.getCell('W' + temp).alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('W' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    if (assaycount.targetVersion != "" || assaycount.targetVersion != null || assaycount.targetVersion != "NA" || assaycount.targetVersion != undefined) {
        worksheet.mergeCells('X' + temp);
        worksheet.getCell('X' + temp).value = assaycount.target;
        worksheet.getCell('X' + temp).alignment = { vertical: 'bottom', horizontal: 'left' };
        worksheet.getCell('X' + temp).font = {
            size: 10,
            name: 'Calibri',
        };
    }

    worksheet.mergeCells('Y' + temp);
    worksheet.getCell('Y' + temp).value = assaycount.ligandSvalue;
    worksheet.getCell('Y' + temp).alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('Y' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    if (assaycount.unitSlno2 != null) {
        worksheet.mergeCells('Z' + temp);
        worksheet.getCell('Z' + temp).value = assaycount.unitSlno2.unit;
        worksheet.getCell('Z' + temp).alignment = { vertical: 'bottom', horizontal: 'left' };
        worksheet.getCell('Z' + temp).font = {
            size: 10,
            name: 'Calibri',
        };
    }

    worksheet.mergeCells('AA' + temp);
    worksheet.getCell('AA' + temp).value = assaycount.ligandHvalue;
    worksheet.getCell('AA' + temp).alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('AA' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    worksheet.mergeCells('AB' + temp);
    worksheet.getCell('AB' + temp).value = assaycount.ligandLvalue;
    worksheet.getCell('AB' + temp).alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('AB' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    if (assaycount.unitedSlno2 != null) {
        worksheet.mergeCells('AC' + temp);
        worksheet.getCell('AC' + temp).value = assaycount.unitedSlno2?.united;
        worksheet.getCell('AC' + temp).alignment = { vertical: 'bottom', horizontal: 'left' };
        worksheet.getCell('AC' + temp).font = {
            size: 10,
            name: 'Calibri',
        };
    }


    worksheet.mergeCells('AD' + temp);
    worksheet.getCell('AD' + temp).value = assaycount.conditionType;
    worksheet.getCell('AD' + temp).alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('AD' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    worksheet.mergeCells('AE' + temp);
    worksheet.getCell('AE' + temp).value = assaycount.conditionMaterial;
    worksheet.getCell('AE' + temp).alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('AE' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    worksheet.mergeCells('AF' + temp);
    worksheet.getCell('AF' + temp).value = assaycount.conditionMaterialid;
    worksheet.getCell('AF' + temp).alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('AF' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    worksheet.mergeCells('AG' + temp);
    worksheet.getCell('AG' + temp).value = assaycount.singleCondition;
    worksheet.getCell('AG' + temp).alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('AG' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    if (assaycount.singleUnit != null) {
        for (let z = 0; z < unitsinglevalues.length; z++) {
            if (assaycount.singleUnit == unitsinglevalues[z].id) {
                worksheet.mergeCells('AH' + temp);
                worksheet.getCell('AH' + temp).value = unescape(unitsinglevalues[z].unit);
                worksheet.getCell('AH' + temp).alignment = { vertical: 'bottom', horizontal: 'left' };
                worksheet.getCell('AH' + temp).font = {
                    size: 10,
                    name: 'Calibri',
                };
            }
        }
    }

    worksheet.mergeCells('AI' + temp);
    worksheet.getCell('AI' + temp).value = assaycount.highCondition;
    worksheet.getCell('AI' + temp).alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('AI' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    worksheet.mergeCells('AJ' + temp);
    worksheet.getCell('AJ' + temp).value = assaycount.lowCondition;
    worksheet.getCell('AJ' + temp).alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('AJ' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    if (assaycount.highLowUnit != null) {
        for (let z = 0; z < unitlowendvalues.length; z++) {
            if (assaycount.highLowUnit == unitlowendvalues[z].id) {
                worksheet.mergeCells('AK' + temp);
                worksheet.getCell('AK' + temp).value = unescape(unitlowendvalues[z].united);
                worksheet.getCell('AK' + temp).alignment = { vertical: 'bottom', horizontal: 'left' };
                worksheet.getCell('AK' + temp).font = {
                    size: 10,
                    name: 'Calibri',
                };
            }
        }

    }




    // --------------------------------------Measurement------------------------------
    if ((assaycount.dataLocator1 != null) && (assaycount.dataLocator1 != "") && (assaycount.dataLocator1 != "undefined") && (assaycount.dataLocator1 != "null")) {
        worksheet.mergeCells('AL' + temp);
        worksheet.getCell('AL' + temp).value = "Table " + assaycount.dataLocator1;
        worksheet.getCell('AL' + temp).alignment = { vertical: 'bottom', horizontal: 'left' };
        worksheet.getCell('AL' + temp).font = {
            size: 10,
            name: 'Calibri',
        };
    }

    if ((assaycount.dataLocator2 != null) && (assaycount.dataLocator2 != "") && (assaycount.dataLocator2 != "undefined") && (assaycount.dataLocator2 != "null")) {
        worksheet.mergeCells('AL' + temp);
        worksheet.getCell('AL' + temp).value = "Figure " + assaycount.dataLocator2;
        worksheet.getCell('AL' + temp).alignment = { vertical: 'bottom', horizontal: 'left' };
        worksheet.getCell('AL' + temp).font = {
            size: 10,
            name: 'Calibri',
        };
    }

    if ((assaycount.dataLocator3 != null) && (assaycount.dataLocator3 != "") && (assaycount.dataLocator3 != "undefined") && (assaycount.dataLocator3 != "null")) {
        worksheet.mergeCells('AL' + temp);
        worksheet.getCell('AL' + temp).value = "Page " + assaycount.dataLocator3 + " (text)";
        worksheet.getCell('AL' + temp).alignment = { vertical: 'bottom', horizontal: 'left' };
        worksheet.getCell('AL' + temp).font = {
            size: 10,
            name: 'Calibri',
        };
    }

    if (assaycount.categorySlno2 != null) {
        worksheet.mergeCells('AM' + temp);
        worksheet.getCell('AM' + temp).value = assaycount.categorySlno2.category;
        worksheet.getCell('AM' + temp).alignment = { vertical: 'bottom', horizontal: 'left' };
        worksheet.getCell('AM' + temp).font = {
            size: 10,
            name: 'Calibri',
        };
    }

    if (assaycount.functionSlno2 != null) {
        worksheet.mergeCells('AN' + temp);
        worksheet.getCell('AN' + temp).value = assaycount.functionSlno2.function;
        worksheet.getCell('AN' + temp).alignment = { vertical: 'bottom', horizontal: 'left' };
        worksheet.getCell('AN' + temp).font = {
            size: 10,
            name: 'Calibri',
        };
    }

    worksheet.mergeCells('AO' + temp);
    worksheet.getCell('AO' + temp).value = assaycount.parameter;
    worksheet.getCell('AO' + temp).alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('AO' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    worksheet.mergeCells('AP' + temp);
    worksheet.getCell('AP' + temp).value = assaycount.parameterDetail;
    worksheet.getCell('AP' + temp).alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('AP' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    if (assaycount.originalPrefixSlno2 != null) {
        worksheet.mergeCells('AQ' + temp);
        worksheet.getCell('AQ' + temp).value = assaycount.originalPrefixSlno2.originalPrefix;
        worksheet.getCell('AQ' + temp).alignment = { vertical: 'bottom', horizontal: 'left' };
        worksheet.getCell('AQ' + temp).font = {
            size: 10,
            name: 'Calibri',
        };
    }

    worksheet.mergeCells('AR' + temp);
    worksheet.getCell('AR' + temp).value = assaycount.singleValue;
    worksheet.getCell('AR' + temp).alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('AR' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    if (assaycount.unit != null) {
        for (let z = 0; z < unitsinglevalues.length; z++) {
            if (assaycount.unit == unitsinglevalues[z].id) {
                worksheet.mergeCells('AS' + temp);
                worksheet.getCell('AS' + temp).value = unescape(unitsinglevalues[z].unit);
                worksheet.getCell('AS' + temp).alignment = { vertical: 'bottom', horizontal: 'left' };
                worksheet.getCell('AS' + temp).font = {
                    size: 10,
                    name: 'Calibri',
                };
            }
        }
    }

    worksheet.mergeCells('AT' + temp);
    worksheet.getCell('AT' + temp).value = assaycount.highEndValue;
    worksheet.getCell('AT' + temp).alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('AT' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    worksheet.mergeCells('AU' + temp);
    worksheet.getCell('AU' + temp).value = assaycount.lowEndValue;
    worksheet.getCell('AU' + temp).alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('AU' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    if (assaycount.units != null) {
        for (let z = 0; z < unitlowendvalues.length; z++) {
            if (assaycount.units == unitlowendvalues[z].id) {
                worksheet.mergeCells('AV' + temp);
                worksheet.getCell('AV' + temp).value = unescape(unitlowendvalues[z].united);
                worksheet.getCell('AV' + temp).alignment = { vertical: 'bottom', horizontal: 'left' };
                worksheet.getCell('AV' + temp).font = {
                    size: 10,
                    name: 'Calibri',
                };
            }
        }
    }

    worksheet.mergeCells('AW' + temp);
    worksheet.getCell('AW' + temp).value = assaycount.nonNumeric;
    worksheet.getCell('AW' + temp).alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('AW' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    worksheet.mergeCells('AX' + temp);
    worksheet.getCell('AX' + temp).value = assaycount.remark;
    worksheet.getCell('AX' + temp).alignment = { vertical: 'bottom', horizontal: 'left', wrapText: true };
    worksheet.getCell('AX' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    if (assaycount.typeSlno2 != null) {
        worksheet.mergeCells('AY' + temp);
        worksheet.getCell('AY' + temp).value = assaycount.typeSlno2.type;
        worksheet.getCell('AY' + temp).alignment = { vertical: 'bottom', horizontal: 'left', wrapText: true };
        worksheet.getCell('AY' + temp).font = {
            size: 10,
            name: 'Calibri',
        };
    }

    worksheet.mergeCells('AZ' + temp);
    worksheet.getCell('AZ' + temp).value = assaycount.cell;
    worksheet.getCell('AZ' + temp).alignment = { vertical: 'bottom', horizontal: 'left', wrapText: true };
    worksheet.getCell('AZ' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    worksheet.mergeCells('BA' + temp);
    worksheet.getCell('BA' + temp).value = assaycount.cellDetail;
    worksheet.getCell('BA' + temp).alignment = { vertical: 'bottom', horizontal: 'left', wrapText: true };
    worksheet.getCell('BA' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    worksheet.mergeCells('BB' + temp);
    worksheet.getCell('BB' + temp).value = assaycount.organ;
    worksheet.getCell('BB' + temp).alignment = { vertical: 'bottom', horizontal: 'left', wrapText: true };
    worksheet.getCell('BB' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    worksheet.mergeCells('BC' + temp);
    worksheet.getCell('BC' + temp).value = assaycount.organDetail;
    worksheet.getCell('BC' + temp).alignment = { vertical: 'bottom', horizontal: 'left', wrapText: true };
    worksheet.getCell('BC' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    worksheet.mergeCells('BD' + temp);
    worksheet.getCell('BD' + temp).value = assaycount.species;
    worksheet.getCell('BD' + temp).alignment = { vertical: 'bottom', horizontal: 'left', wrapText: true };
    worksheet.getCell('BD' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    worksheet.mergeCells('BE' + temp);
    worksheet.getCell('BE' + temp).value = assaycount.speciesDetail;
    worksheet.getCell('BE' + temp).alignment = { vertical: 'bottom', horizontal: 'left', wrapText: true };
    worksheet.getCell('BE' + temp).font = {
        size: 10,
        name: 'Calibri',
    };

    if (assaycount.gender != null) {
        worksheet.mergeCells('BF' + temp);
        worksheet.getCell('BF' + temp).value = assaycount.gender;
        worksheet.getCell('BF' + temp).alignment = { vertical: 'bottom', horizontal: 'left', wrapText: true };
        worksheet.getCell('BF' + temp).font = {
            size: 10,
            name: 'Calibri',
        };
    }

    worksheet.mergeCells('BG' + temp);
    worksheet.getCell('BG' + temp).value = assaycount.ageGroup;
    worksheet.getCell('BG' + temp).alignment = { vertical: 'bottom', horizontal: 'left', wrapText: true };
    worksheet.getCell('BG' + temp).font = {
        size: 10,
        name: 'Calibri',
    };
    // return workbook.xlsx.write(response).then(function () {
    //             response['status'](200).end();
    //         });
}

async function ReportHeader(workbook) {
    let worksheet = workbook.addWorksheet('Reports'); // creating worksheet
    worksheet.columns = [{ key: 'A', width: 20.0 }, { key: 'B', width: 95.0 }, { key: 'C', width: 20.0 },
    { key: 'D', width: 20.0 }, { key: 'E', width: 20.0 }, { key: 'F', width: 20.0 }, { key: 'G', width: 20.0 },
    { key: 'H', width: 20.0 }, { key: 'I', width: 20.0 }, { key: 'J', width: 20.0 }, { key: 'K', width: 20.0 },
    { key: 'L', width: 20.0 }, { key: 'M', width: 20.0 }, { key: 'N', width: 20.0 }, { key: 'O', width: 20.0 },
    { key: 'P', width: 20.0 }, { key: 'Q', width: 20.0 }, { key: 'R', width: 20.0 }, { key: 'S', width: 20.0 },
    { key: 'T', width: 20.0 }, { key: 'U', width: 28.0 }, { key: 'V', width: 28.0 }, { key: 'W', width: 40.0 },
    { key: 'X', width: 90.0 }, { key: 'Y', width: 20.0 }, { key: 'Z', width: 20.0 }, { key: 'AA', width: 20.0 },
    { key: 'AB', width: 20.0 }, { key: 'AC', width: 20.0 }, { key: 'AD', width: 20.0 }, { key: 'AE', width: 20.0 },
    { key: 'AF', width: 20.0 }, { key: 'AG', width: 20.0 }, { key: 'AH', width: 20.0 }, { key: 'AI', width: 20.0 },
    { key: 'AJ', width: 20.0 }, { key: 'AK', width: 20.0 }, { key: 'AL', width: 20.0 }, { key: 'AM', width: 20.0 },
    { key: 'AN', width: 20.0 }, { key: 'AO', width: 20.0 }, { key: 'AP', width: 20.0 }, { key: 'AQ', width: 20.0 },
    { key: 'AR', width: 20.0 }, { key: 'AS', width: 20.0 }, { key: 'AT', width: 20.0 }, { key: 'AU', width: 25.0 },
    { key: 'AV', width: 20.0 }, { key: 'AW', width: 20.0 }, { key: 'AX', width: 20.0 }, { key: 'AY', width: 20.0 },
    { key: 'AZ', width: 20.0 }, { key: 'BA', width: 20.0 }, { key: 'BB', width: 20.0 }, { key: 'BC', width: 20.0 },
    { key: 'BD', width: 20.0 }, { key: 'BE', width: 20.0 }, { key: 'BF', width: 20.0 }, { key: 'BG', width: 20.0 },
    { key: 'BH', width: 30.0 }, { key: 'BI', width: 30.0 }, { key: 'BJ', width: 30.0 }, { key: 'BK', width: 100.0 },
    { key: 'BL', width: 20.0 }, { key: 'BM', width: 20.0 }, { key: 'BN', width: 20.0 }, { key: 'BO', width: 20.0 },
    { key: 'BP', width: 20.0 }, { key: 'BQ', width: 20.0 }, { key: 'BR', width: 20.0 }, { key: 'BS', width: 20.0 },
    { key: 'BT', width: 20.0 }, { key: 'BU', width: 20.0 }, { key: 'BV', width: 20.0 }, { key: 'BW', width: 20.0 },
    { key: 'BX', width: 20.0 }, { key: 'BY', width: 20.0 }, { key: 'BZ', width: 20.0 }, { key: 'CA', width: 20.0 },
    { key: 'CB', width: 20.0 }, { key: 'CC', width: 20.0 }, { key: 'CD', width: 20.0 }, { key: 'CE', width: 20.0 },
    { key: 'CF', width: 20.0 }, { key: 'CG', width: 20.0 }, { key: 'CH', width: 20.0 }, { key: 'CI', width: 20.0 },
    { key: 'CJ', width: 20.0 }, { key: 'CK', width: 20.0 }, { key: 'CL', width: 20.0 }, { key: 'CM', width: 20.0 },
    { key: 'CN', width: 20.0 }, { key: 'CO', width: 20.0 }, { key: 'CP', width: 20.0 }, { key: 'CQ', width: 20.0 },];

    worksheet.columns.forEach((col) => {

        col.style.font = {
            size: 7,
            bold: true
        };
        col.style.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    })

    worksheet.getCell('A1').alignment = { vertical: 'bottom', horizontal: 'left', wrapText: true };
    worksheet.getCell('A1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00b050' }, bgColor: { argb: '00b050' } };
    worksheet.mergeCells('A1');
    worksheet.getCell('A1').value = "LINK";
    worksheet.getCell('A1').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('B1').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('B1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00b050' }, bgColor: { argb: '00b050' } };
    worksheet.mergeCells('B1');
    worksheet.getCell('B1').value = "Ligand";
    worksheet.getCell('B1').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('C1').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('C1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00b050' }, bgColor: { argb: '00b050' } };
    worksheet.mergeCells('C1');
    worksheet.getCell('C1').value = "Ligand";
    worksheet.getCell('C1').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('D1').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('D1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00b050' }, bgColor: { argb: '00b050' } };
    worksheet.mergeCells('D1');
    worksheet.getCell('D1').value = "Ligand";
    worksheet.getCell('D1').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('E1').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('E1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00b050' }, bgColor: { argb: '00b050' } };
    worksheet.mergeCells('E1');
    worksheet.getCell('E1').value = "Ligand";
    worksheet.getCell('E1').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('F1').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('F1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00b050' }, bgColor: { argb: '00b050' } };
    worksheet.mergeCells('F1');
    worksheet.getCell('F1').value = "Ligand";
    worksheet.getCell('F1').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('G1').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('G1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00b050' }, bgColor: { argb: '00b050' } };
    worksheet.mergeCells('G1');
    worksheet.getCell('G1').value = "Ligand";
    worksheet.getCell('G1').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('H1').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('H1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00b050' }, bgColor: { argb: '00b050' } };
    worksheet.mergeCells('H1');
    worksheet.getCell('H1').value = "Ligand";
    worksheet.getCell('H1').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('I1').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('I1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00b050' }, bgColor: { argb: '00b050' } };
    worksheet.mergeCells('I1');
    worksheet.getCell('I1').value = "Ligand";
    worksheet.getCell('I1').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('J1').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('J1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00b050' }, bgColor: { argb: '00b050' } };
    worksheet.mergeCells('J1');
    worksheet.getCell('J1').value = "Ligand";
    worksheet.getCell('J1').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('K1').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('K1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00b050' }, bgColor: { argb: '00b050' } };
    worksheet.mergeCells('K1');
    worksheet.getCell('K1').value = "Ligand";
    worksheet.getCell('K1').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('L1').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('L1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00b050' }, bgColor: { argb: '00b050' } };
    worksheet.mergeCells('L1');
    worksheet.getCell('L1').value = "Ligand";
    worksheet.getCell('L1').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('M1').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('M1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00b050' }, bgColor: { argb: '00b050' } };
    worksheet.mergeCells('M1');
    worksheet.getCell('M1').value = "Reference";
    worksheet.getCell('M1').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('N1').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('N1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00b050' }, bgColor: { argb: '00b050' } };
    worksheet.mergeCells('N1');
    worksheet.getCell('N1').value = "Reference";
    worksheet.getCell('N1').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('O1').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('O1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00b050' }, bgColor: { argb: '00b050' } };
    worksheet.mergeCells('O1');
    worksheet.getCell('O1').value = "Reference";
    worksheet.getCell('O1').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('P1').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('P1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00b050' }, bgColor: { argb: '00b050' } };
    worksheet.mergeCells('P1');
    worksheet.getCell('P1').value = "Substance-match";
    worksheet.getCell('P1').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('Q1').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('Q1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00b050' }, bgColor: { argb: '00b050' } };
    worksheet.mergeCells('Q1');
    worksheet.getCell('Q1').value = "Assay";
    worksheet.getCell('Q1').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('R1').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('R1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00b050' }, bgColor: { argb: '00b050' } };
    worksheet.mergeCells('R1');
    worksheet.getCell('R1').value = "Assay";
    worksheet.getCell('R1').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('S1').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('S1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00b050' }, bgColor: { argb: '00b050' } };
    worksheet.mergeCells('S1');
    worksheet.getCell('S1').value = "Assay";
    worksheet.getCell('S1').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('T1').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('T1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00b050' }, bgColor: { argb: '00b050' } };
    worksheet.mergeCells('T1');
    worksheet.getCell('T1').value = "Assay";
    worksheet.getCell('T1').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };


    worksheet.getCell('U1').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('U1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00b050' }, bgColor: { argb: '00b050' } };
    worksheet.mergeCells('U1');
    worksheet.getCell('U1').value = "Assay";
    worksheet.getCell('U1').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('V1').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('V1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00b050' }, bgColor: { argb: '00b050' } };
    worksheet.mergeCells('V1');
    worksheet.getCell('V1').value = "Assay";
    worksheet.getCell('V1').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('W1').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('W1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00b050' }, bgColor: { argb: '00b050' } };
    worksheet.mergeCells('W1');
    worksheet.getCell('W1').value = "Assay";
    worksheet.getCell('W1').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('X1').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('X1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00b050' }, bgColor: { argb: '00b050' } };
    worksheet.mergeCells('X1');
    worksheet.getCell('X1').value = "Assay";
    worksheet.getCell('X1').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('Y1').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('Y1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00b050' }, bgColor: { argb: '00b050' } };
    worksheet.mergeCells('Y1');
    worksheet.getCell('Y1').value = "Assay";
    worksheet.getCell('Y1').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('Z1').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('Z1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00b050' }, bgColor: { argb: 'fa00b050bf8f' } };
    worksheet.mergeCells('Z1');
    worksheet.getCell('Z1').value = "Assay";
    worksheet.getCell('Z1').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('AA1').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('AA1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00b050' }, bgColor: { argb: '00b050' } };
    worksheet.mergeCells('AA1');
    worksheet.getCell('AA1').value = "Assay";
    worksheet.getCell('AA1').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('AB1').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('AB1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00b050' }, bgColor: { argb: '00b050' } };
    worksheet.mergeCells('AB1');
    worksheet.getCell('AB1').value = "Assay";
    worksheet.getCell('AB1').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('AC1').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('AC1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00b050' }, bgColor: { argb: '00b050' } };
    worksheet.mergeCells('AC1');
    worksheet.getCell('AC1').value = "Assay";
    worksheet.getCell('AC1').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('AD1').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('AD1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00b050' }, bgColor: { argb: '00b050' } };
    worksheet.mergeCells('AD1');
    worksheet.getCell('AD1').value = "Assay";
    worksheet.getCell('AD1').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('AE1').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('AE1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00b050' }, bgColor: { argb: '00b050' } };
    worksheet.mergeCells('AE1');
    worksheet.getCell('AE1').value = "Assay";
    worksheet.getCell('AE1').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('AF1').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('AF1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00b050' }, bgColor: { argb: '00b050' } };
    worksheet.mergeCells('AF1');
    worksheet.getCell('AF1').value = "Assay";
    worksheet.getCell('AF1').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('AG1').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('AG1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00b050' }, bgColor: { argb: '00b050' } };
    worksheet.mergeCells('AG1');
    worksheet.getCell('AG1').value = "Assay";
    worksheet.getCell('AG1').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('AH1').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('AH1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00b050' }, bgColor: { argb: '00b050' } };
    worksheet.mergeCells('AH1');
    worksheet.getCell('AH1').value = "Assay";
    worksheet.getCell('AH1').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('AI1').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('AI1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00b050' }, bgColor: { argb: '00b050' } };
    worksheet.mergeCells('AI1');
    worksheet.getCell('AI1').value = "Assay";
    worksheet.getCell('AI1').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('AJ1').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('AJ1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00b050' }, bgColor: { argb: '00b050' } };
    worksheet.mergeCells('AJ1');
    worksheet.getCell('AJ1').value = "Assay";
    worksheet.getCell('AJ1').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('AK1').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('AK1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00b050' }, bgColor: { argb: '00b050' } };
    worksheet.mergeCells('AK1');
    worksheet.getCell('AK1').value = "Assay";
    worksheet.getCell('AK1').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('AL1').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('AL1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00b050' }, bgColor: { argb: '00b050' } };
    worksheet.mergeCells('AL1');
    worksheet.getCell('AL1').value = "Measurement";
    worksheet.getCell('AL1').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('AM1').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('AM1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00b050' }, bgColor: { argb: '00b050' } };
    worksheet.mergeCells('AM1');
    worksheet.getCell('AM1').value = "Measurement";
    worksheet.getCell('AM1').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('AN1').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('AN1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00b050' }, bgColor: { argb: '00b050' } };
    worksheet.mergeCells('AN1');
    worksheet.getCell('AN1').value = "Measurement";
    worksheet.getCell('AN1').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('AO1').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('AO1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00b050' }, bgColor: { argb: '00b050' } };
    worksheet.mergeCells('AO1');
    worksheet.getCell('AO1').value = "Measurement";
    worksheet.getCell('AO1').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('AP1').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('AP1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00b050' }, bgColor: { argb: '00b050' } };
    worksheet.mergeCells('AP1');
    worksheet.getCell('AP1').value = "Measurement";
    worksheet.getCell('AP1').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('AQ1').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('AQ1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00b050' }, bgColor: { argb: '00b050' } };
    worksheet.mergeCells('AQ1');
    worksheet.getCell('AQ1').value = "Measurement";
    worksheet.getCell('AQ1').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('AR1').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('AR1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00b050' }, bgColor: { argb: '00b050' } };
    worksheet.mergeCells('AR1');
    worksheet.getCell('AR1').value = "Measurement";
    worksheet.getCell('AR1').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('AS1').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('AS1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00b050' }, bgColor: { argb: '00b050' } };
    worksheet.mergeCells('AS1');
    worksheet.getCell('AS1').value = "Measurement";
    worksheet.getCell('AS1').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('AT1').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('AT1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00b050' }, bgColor: { argb: '00b050' } };
    worksheet.mergeCells('AT1');
    worksheet.getCell('AT1').value = "Measurement";
    worksheet.getCell('AT1').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('AU1').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('AU1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00b050' }, bgColor: { argb: '00b050' } };
    worksheet.mergeCells('AU1');
    worksheet.getCell('AU1').value = "Measurement";
    worksheet.getCell('AU1').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('AV1').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('AV1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00b050' }, bgColor: { argb: '00b050' } };
    worksheet.mergeCells('AV1');
    worksheet.getCell('AV1').value = "Measurement";
    worksheet.getCell('AV1').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('AW1').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('AW1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00b050' }, bgColor: { argb: '00b050' } };
    worksheet.mergeCells('AW1');
    worksheet.getCell('AW1').value = "Measurement";
    worksheet.getCell('AW1').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('AX1').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('AX1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00b050' }, bgColor: { argb: '00b050' } };
    worksheet.mergeCells('AX1');
    worksheet.getCell('AX1').value = "Measurement";
    worksheet.getCell('AX1').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('AY1').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('AY1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00b050' }, bgColor: { argb: '00b050' } };
    worksheet.mergeCells('AY1');
    worksheet.getCell('AY1').value = "Biological system";
    worksheet.getCell('AY1').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('AZ1').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('AZ1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00b050' }, bgColor: { argb: '00b050' } };
    worksheet.mergeCells('AZ1');
    worksheet.getCell('AZ1').value = "Biological system";
    worksheet.getCell('AZ1').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('BA1').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('BA1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00b050' }, bgColor: { argb: '00b050' } };
    worksheet.mergeCells('BA1');
    worksheet.getCell('BA1').value = "Biological system";
    worksheet.getCell('BA1').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('BB1').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('BB1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00b050' }, bgColor: { argb: '00b050' } };
    worksheet.mergeCells('BB1');
    worksheet.getCell('BB1').value = "Biological system";
    worksheet.getCell('BB1').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('BC1').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('BC1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00b050' }, bgColor: { argb: '00b050' } };
    worksheet.mergeCells('BC1');
    worksheet.getCell('BC1').value = "Biological system";
    worksheet.getCell('BC1').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('BD1').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('BD1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00b050' }, bgColor: { argb: '00b050' } };
    worksheet.mergeCells('BD1');
    worksheet.getCell('BD1').value = "Biological system";
    worksheet.getCell('BD1').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('BE1').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('BE1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00b050' }, bgColor: { argb: '00b050' } };
    worksheet.mergeCells('BE1');
    worksheet.getCell('BE1').value = "Biological system";
    worksheet.getCell('BE1').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('BF1').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('BF1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00b050' }, bgColor: { argb: '00b050' } };
    worksheet.mergeCells('BF1');
    worksheet.getCell('BF1').value = "Biological system";
    worksheet.getCell('BF1').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('BG1').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('BG1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00b050' }, bgColor: { argb: '00b050' } };
    worksheet.mergeCells('BG1');
    worksheet.getCell('BG1').value = "Biological system";
    worksheet.getCell('BG1').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('BH1').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('BH1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00b050' }, bgColor: { argb: '00b050' } };
    worksheet.mergeCells('BH1');
    worksheet.getCell('BH1').value = "Disease";
    worksheet.getCell('BH1').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('BI1').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('BI1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00b050' }, bgColor: { argb: '00b050' } };
    worksheet.mergeCells('BI1');
    worksheet.getCell('BI1').value = "Disease";
    worksheet.getCell('BI1').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('BJ1').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('BJ1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00b050' }, bgColor: { argb: '00b050' } };
    worksheet.mergeCells('BJ1');
    worksheet.getCell('BJ1').value = "Disease";
    worksheet.getCell('BJ1').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('BK1').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('BK1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00b050' }, bgColor: { argb: '00b050' } };
    worksheet.mergeCells('BK1');
    worksheet.getCell('BK1').value = "Target";
    worksheet.getCell('BK1').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };


    worksheet.getCell('BL1').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('BL1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00b050' }, bgColor: { argb: '00b050' } };
    worksheet.mergeCells('BL1');
    worksheet.getCell('BL1').value = "Target";
    worksheet.getCell('BL1').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('BM1').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('BM1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00b050' }, bgColor: { argb: '00b050' } };
    worksheet.mergeCells('BM1');
    worksheet.getCell('BM1').value = "Target";
    worksheet.getCell('BM1').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('BN1').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('BN1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00b050' }, bgColor: { argb: '00b050' } };
    worksheet.mergeCells('BN1');
    worksheet.getCell('BN1').value = "Target";
    worksheet.getCell('BN1').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('BO1').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('BO1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00b050' }, bgColor: { argb: '00b050' } };
    worksheet.mergeCells('BO1');
    worksheet.getCell('BO1').value = "Target";
    worksheet.getCell('BO1').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('BP1').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('BP1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00b050' }, bgColor: { argb: '00b050' } };
    worksheet.mergeCells('BP1');
    worksheet.getCell('BP1').value = "Target";
    worksheet.getCell('BP1').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('BQ1').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('BQ1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00b050' }, bgColor: { argb: '00b050' } };
    worksheet.mergeCells('BQ1');
    worksheet.getCell('BQ1').value = "Target";
    worksheet.getCell('BQ1').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('BR1').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('BR1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00b050' }, bgColor: { argb: '00b050' } };
    worksheet.mergeCells('BR1');
    worksheet.getCell('BR1').value = "Target";
    worksheet.getCell('BR1').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };





    // --------------SECOND ROW---------------------


    worksheet.getCell('A2').alignment = { vertical: 'bottom', horizontal: 'left', wrapText: true };
    worksheet.getCell('A2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' }, bgColor: { argb: 'FFFF00' } };
    worksheet.mergeCells('A2');
    worksheet.getCell('A2').value = "TAN Number";
    worksheet.getCell('A2').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('B2').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('B2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' }, bgColor: { argb: 'FFFF00' } };
    worksheet.mergeCells('B2');
    worksheet.getCell('B2').value = "Ligand-Uri";
    worksheet.getCell('B2').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('C2').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('C2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' }, bgColor: { argb: 'FFFF00' } };
    worksheet.mergeCells('C2');
    worksheet.getCell('C2').value = "Ligand-Version";
    worksheet.getCell('C2').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('D2').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('D2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' }, bgColor: { argb: 'FFFF00' } };
    worksheet.mergeCells('D2');
    worksheet.getCell('D2').value = "Ligand-status";
    worksheet.getCell('D2').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('E2').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('E2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' }, bgColor: { argb: 'FFFF00' } };
    worksheet.mergeCells('E2');
    worksheet.getCell('E2').value = "Collection";
    worksheet.getCell('E2').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('F2').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('F2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' }, bgColor: { argb: 'FFFF00' } };
    worksheet.mergeCells('F2');
    worksheet.getCell('F2').value = "Ligand-type";
    worksheet.getCell('F2').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('G2').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('G2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' }, bgColor: { argb: 'FFFF00' } };
    worksheet.mergeCells('G2');
    worksheet.getCell('G2').value = "Identifier1";
    worksheet.getCell('G2').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('H2').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('H2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' }, bgColor: { argb: 'FFFF00' } };
    worksheet.mergeCells('H2');
    worksheet.getCell('H2').value = "Identifier2";
    worksheet.getCell('H2').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('I2').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('I2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' }, bgColor: { argb: 'FFFF00' } };
    worksheet.mergeCells('I2');
    worksheet.getCell('I2').value = "Identifier3";
    worksheet.getCell('I2').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('J2').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('J2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' }, bgColor: { argb: 'FFFF00' } };
    worksheet.mergeCells('J2');
    worksheet.getCell('J2').value = "Collection-id";
    worksheet.getCell('J2').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('K2').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('K2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' }, bgColor: { argb: 'FFFF00' } };
    worksheet.mergeCells('K2');
    worksheet.getCell('K2').value = "Ligand-detail";
    worksheet.getCell('K2').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('L2').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('L2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' }, bgColor: { argb: 'FFFF00' } };
    worksheet.mergeCells('L2');
    worksheet.getCell('L2').value = "Locator";
    worksheet.getCell('L2').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('M2').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('M2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' }, bgColor: { argb: 'FFFF00' } };
    worksheet.mergeCells('M2');
    worksheet.getCell('M2').value = "Source-type";
    worksheet.getCell('M2').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('N2').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('N2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' }, bgColor: { argb: 'FFFF00' } };
    worksheet.mergeCells('N2');
    worksheet.getCell('N2').value = "Citation";
    worksheet.getCell('N2').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('O2').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('O2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' }, bgColor: { argb: 'FFFF00' } };
    worksheet.mergeCells('O2');
    worksheet.getCell('O2').value = "Related-document";
    worksheet.getCell('O2').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('P2').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('P2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' }, bgColor: { argb: 'FFFF00' } };
    worksheet.mergeCells('P2');
    worksheet.getCell('P2').value = "Substance-uri registry-number";
    worksheet.getCell('P2').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('Q2').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('Q2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' }, bgColor: { argb: 'FFFF00' } };
    worksheet.mergeCells('Q2');
    worksheet.getCell('Q2').value = "Ordinal";
    worksheet.getCell('Q2').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('R2').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('R2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' }, bgColor: { argb: 'FFFF00' } };
    worksheet.mergeCells('R2');
    worksheet.getCell('R2').value = "Collection-id";
    worksheet.getCell('R2').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('S2').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('S2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' }, bgColor: { argb: 'FFFF00' } };
    worksheet.mergeCells('S2');
    worksheet.getCell('S2').value = "Assay-type";
    worksheet.getCell('S2').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('T2').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('T2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' }, bgColor: { argb: 'FFFF00' } };
    worksheet.mergeCells('T2');
    worksheet.getCell('T2').value = "Toxicity-type";
    worksheet.getCell('T2').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };


    worksheet.getCell('U2').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('U2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' }, bgColor: { argb: 'FFFF00' } };
    worksheet.mergeCells('U2');
    worksheet.getCell('U2').value = "Route-of-administration";
    worksheet.getCell('U2').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('V2').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('V2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' }, bgColor: { argb: 'FFFF00' } };
    worksheet.mergeCells('V2');
    worksheet.getCell('V2').value = "Administration-regimen";
    worksheet.getCell('V2').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('W2').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('W2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' }, bgColor: { argb: 'FFFF00' } };
    worksheet.mergeCells('W2');
    worksheet.getCell('W2').value = "Procedure";
    worksheet.getCell('W2').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('X2').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('X2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' }, bgColor: { argb: 'fabf8f' } };
    worksheet.mergeCells('X2');
    worksheet.getCell('X2').value = "Target-uri";
    worksheet.getCell('X2').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('Y2').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('Y2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' }, bgColor: { argb: 'FFFF00' } };
    worksheet.mergeCells('Y2');
    worksheet.getCell('Y2').value = "Single-value";
    worksheet.getCell('Y2').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('Z2').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('Z2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' }, bgColor: { argb: 'FFFF00' } };
    worksheet.mergeCells('Z2');
    worksheet.getCell('Z2').value = "Unit";
    worksheet.getCell('Z2').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('AA2').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('AA2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' }, bgColor: { argb: 'FFFF00' } };
    worksheet.mergeCells('AA2');
    worksheet.getCell('AA2').value = "High-end-value";
    worksheet.getCell('AA2').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('AB2').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('AB2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' }, bgColor: { argb: 'FFFF00' } };
    worksheet.mergeCells('AB2');
    worksheet.getCell('AB2').value = "Low-end-value";
    worksheet.getCell('AB2').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('AC2').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('AC2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' }, bgColor: { argb: 'FFFF00' } };
    worksheet.mergeCells('AC2');
    worksheet.getCell('AC2').value = "Unit1";
    worksheet.getCell('AC2').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('AD2').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('AD2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' }, bgColor: { argb: 'FFFF00' } };
    worksheet.mergeCells('AD2');
    worksheet.getCell('AD2').value = "Condition Type";
    worksheet.getCell('AD2').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('AE2').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('AE2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' }, bgColor: { argb: 'FFFF00' } };
    worksheet.mergeCells('AE2');
    worksheet.getCell('AE2').value = "Material";
    worksheet.getCell('AE2').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('AF2').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('AF2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' }, bgColor: { argb: 'FFFF00' } };
    worksheet.mergeCells('AF2');
    worksheet.getCell('AF2').value = "Material-id";
    worksheet.getCell('AF2').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('AG2').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('AG2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' }, bgColor: { argb: 'FFFF00' } };
    worksheet.mergeCells('AG2');
    worksheet.getCell('AG2').value = "Single-value1";
    worksheet.getCell('AG2').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('AH2').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('AH2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' }, bgColor: { argb: 'FFFF00' } };
    worksheet.mergeCells('AH2');
    worksheet.getCell('AH2').value = "Unit2";
    worksheet.getCell('AH2').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('AI2').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('AI2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' }, bgColor: { argb: 'FFFF00' } };
    worksheet.mergeCells('AI2');
    worksheet.getCell('AI2').value = "High-end-value1";
    worksheet.getCell('AI2').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('AJ2').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('AJ2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' }, bgColor: { argb: 'FFFF00' } };
    worksheet.mergeCells('AJ2');
    worksheet.getCell('AJ2').value = "Low-end-value1";
    worksheet.getCell('AJ2').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('AK2').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('AK2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' }, bgColor: { argb: 'FFFF00' } };
    worksheet.mergeCells('AK2');
    worksheet.getCell('AK2').value = "Unit3";
    worksheet.getCell('AK2').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('AL2').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('AL2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' }, bgColor: { argb: 'FFFF00' } };
    worksheet.mergeCells('AL2');
    worksheet.getCell('AL2').value = "Data-locator";
    worksheet.getCell('AL2').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('AM2').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('AM2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' }, bgColor: { argb: 'FFFF00' } };
    worksheet.mergeCells('AM2');
    worksheet.getCell('AM2').value = "Category";
    worksheet.getCell('AM2').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('AN2').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('AN2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' }, bgColor: { argb: 'FFFF00' } };
    worksheet.mergeCells('AN2');
    worksheet.getCell('AN2').value = "Function";
    worksheet.getCell('AN2').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('AO2').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('AO2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' }, bgColor: { argb: 'FFFF00' } };
    worksheet.mergeCells('AO2');
    worksheet.getCell('AO2').value = "Parameter";
    worksheet.getCell('AO2').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('AP2').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('AP2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' }, bgColor: { argb: 'FFFF00' } };
    worksheet.mergeCells('AP2');
    worksheet.getCell('AP2').value = "Parameter-detail";
    worksheet.getCell('AP2').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('AQ2').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('AQ2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' }, bgColor: { argb: 'FFFF00' } };
    worksheet.mergeCells('AQ2');
    worksheet.getCell('AQ2').value = "Original-prefix";
    worksheet.getCell('AQ2').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('AR2').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('AR2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' }, bgColor: { argb: 'FFFF00' } };
    worksheet.mergeCells('AR2');
    worksheet.getCell('AR2').value = "Single-value";
    worksheet.getCell('AR2').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('AS2').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('AS2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' }, bgColor: { argb: 'FFFF00' } };
    worksheet.mergeCells('AS2');
    worksheet.getCell('AS2').value = "Unit";
    worksheet.getCell('AS2').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('AT2').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('AT2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' }, bgColor: { argb: 'FFFF00' } };
    worksheet.mergeCells('AT2');
    worksheet.getCell('AT2').value = "High-end-value";
    worksheet.getCell('AT2').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('AU2').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('AU2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' }, bgColor: { argb: 'FFFF00' } };
    worksheet.mergeCells('AU2');
    worksheet.getCell('AU2').value = "Low-end-value";
    worksheet.getCell('AU2').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('AV2').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('AV2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' }, bgColor: { argb: 'FFFF00' } };
    worksheet.mergeCells('AV2');
    worksheet.getCell('AV2').value = "Unit1";
    worksheet.getCell('AV2').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('AW2').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('AW2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' }, bgColor: { argb: 'FFFF00' } };
    worksheet.mergeCells('AW2');
    worksheet.getCell('AW2').value = "Non-numeric-value";
    worksheet.getCell('AW2').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('AX2').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('AX2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' }, bgColor: { argb: 'FFFF00' } };
    worksheet.mergeCells('AX2');
    worksheet.getCell('AX2').value = "Remarks";
    worksheet.getCell('AX2').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('AY2').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('AY2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' }, bgColor: { argb: 'FFFF00' } };
    worksheet.mergeCells('AY2');
    worksheet.getCell('AY2').value = "Type";
    worksheet.getCell('AY2').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('AZ2').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('AZ2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' }, bgColor: { argb: 'FFFF00' } };
    worksheet.mergeCells('AZ2');
    worksheet.getCell('AZ2').value = "Cell";
    worksheet.getCell('AZ2').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('BA2').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('BA2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' }, bgColor: { argb: 'FFFF00' } };
    worksheet.mergeCells('BA2');
    worksheet.getCell('BA2').value = "Cell-detail";
    worksheet.getCell('BA2').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('BB2').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('BB2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' }, bgColor: { argb: 'FFFF00' } };
    worksheet.mergeCells('BB2');
    worksheet.getCell('BB2').value = "Organ";
    worksheet.getCell('BB2').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('BC2').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('BC2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' }, bgColor: { argb: 'FFFF00' } };
    worksheet.mergeCells('BC2');
    worksheet.getCell('BC2').value = "Organ-detail";
    worksheet.getCell('BC2').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('BD2').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('BD2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' }, bgColor: { argb: 'FFFF00' } };
    worksheet.mergeCells('BD2');
    worksheet.getCell('BD2').value = "Species";
    worksheet.getCell('BD2').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('BE2').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('BE2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' }, bgColor: { argb: 'FFFF00' } };
    worksheet.mergeCells('BE2');
    worksheet.getCell('BE2').value = "Species-detail";
    worksheet.getCell('BE2').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('BF2').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('BF2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' }, bgColor: { argb: 'FFFF00' } };
    worksheet.mergeCells('BF2');
    worksheet.getCell('BF2').value = "Gender";
    worksheet.getCell('BF2').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('BG2').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('BG2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' }, bgColor: { argb: 'FFFF00' } };
    worksheet.mergeCells('BG2');
    worksheet.getCell('BG2').value = "Age-group";
    worksheet.getCell('BG2').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('BH2').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('BH2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' }, bgColor: { argb: 'FFFF00' } };
    worksheet.mergeCells('BH2');
    worksheet.getCell('BH2').value = "Original-disease-name1";
    worksheet.getCell('BH2').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('BI2').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('BI2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' }, bgColor: { argb: 'FFFF00' } };
    worksheet.mergeCells('BI2');
    worksheet.getCell('BI2').value = "Original-disease-name2";
    worksheet.getCell('BI2').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('BJ2').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('BJ2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' }, bgColor: { argb: 'FFFF00' } };
    worksheet.mergeCells('BJ2');
    worksheet.getCell('BJ2').value = "Original-disease-name3";
    worksheet.getCell('BJ2').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('BK2').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('BK2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' }, bgColor: { argb: 'FFFF00' } };
    worksheet.mergeCells('BK2');
    worksheet.getCell('BK2').value = "Target-uri";
    worksheet.getCell('BK2').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };



    worksheet.getCell('BL2').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('BL2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' }, bgColor: { argb: 'FFFF00' } };
    worksheet.mergeCells('BL2');
    worksheet.getCell('BL2').value = "Target-version";
    worksheet.getCell('BL2').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('BM2').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('BM2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' }, bgColor: { argb: 'FFFF00' } };
    worksheet.mergeCells('BM2');
    worksheet.getCell('BM2').value = "Target-status";
    worksheet.getCell('BM2').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('BN2').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('BN2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' }, bgColor: { argb: 'FFFF00' } };
    worksheet.mergeCells('BN2');
    worksheet.getCell('BN2').value = "Collection-id";
    worksheet.getCell('BN2').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('BO2').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('BO2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' }, bgColor: { argb: 'FFFF00' } };
    worksheet.mergeCells('BO2');
    worksheet.getCell('BO2').value = "Original-target-name";
    worksheet.getCell('BO2').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('BP2').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('BP2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' }, bgColor: { argb: 'FFFF00' } };
    worksheet.mergeCells('BP2');
    worksheet.getCell('BP2').value = "Acronym";
    worksheet.getCell('BP2').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('BQ2').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('BQ2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' }, bgColor: { argb: 'FFFF00' } };
    worksheet.mergeCells('BQ2');
    worksheet.getCell('BQ2').value = "Organism-source";
    worksheet.getCell('BQ2').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };

    worksheet.getCell('BR2').alignment = { vertical: 'bottom', horizontal: 'left' };
    worksheet.getCell('BR2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' }, bgColor: { argb: 'FFFF00' } };
    worksheet.mergeCells('BR2');
    worksheet.getCell('BR2').value = "Variant";
    worksheet.getCell('BR2').font = {
        size: 11,
        name: 'Calibri',
        bold: true
    };
    return worksheet;
}