import { Assay001wb } from "src/entity/Assay001wb";
import { Measurement001wb } from "src/entity/Measurement001wb";

export class MeasurementDTO {
    measurementId: number;
    assaySlno: number;
    dataLocator: string;
    categorySlno: number;
    functionSlno: number;
    parameter: string;
    parameterDetail: string;
    singleValue: string;
    unit: string;
    originalPrefixSlno: number;
    highEndValue: string;
    lowEndValue: string;
    units: string;
    nonNumeric: string;
    remark: string;
    typeSlno: number;
    cell: string;
    cellDetail: string;
    organ: string;
    organDetail: string;
    species: string;
    speciesDetail: string;
    ageGroup: string;
    status: string;
    gender: string;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;
   
    // assaySlno2: Assay001wb;

    setProperties(measurement001wb: Measurement001wb) {
        this.measurementId = measurement001wb.measurementId;
        this.assaySlno = measurement001wb.assaySlno;
        this.dataLocator = measurement001wb.dataLocator;
        this.categorySlno = measurement001wb.categorySlno;
        this.functionSlno = measurement001wb.functionSlno;
        this.parameter = measurement001wb.parameter;
        this.parameterDetail = measurement001wb.parameterDetail;
        this.singleValue = measurement001wb.singleValue;
        this.unit = measurement001wb.unit;
        this.originalPrefixSlno = measurement001wb.originalPrefixSlno;
        this.highEndValue = measurement001wb.highEndValue;
        this.lowEndValue = measurement001wb.lowEndValue;
        this.units = measurement001wb.units;
        this.nonNumeric = measurement001wb.nonNumeric;
        this.remark = measurement001wb.remark;
        this.typeSlno = measurement001wb.typeSlno;
        this.cell = measurement001wb.cell;
        this.cellDetail = measurement001wb.cellDetail;
        this.organ = measurement001wb.organ;
        this.organDetail = measurement001wb.organDetail;
        this.species = measurement001wb.species;
        this.speciesDetail = measurement001wb.speciesDetail;
        this.gender = measurement001wb.gender;
        this.ageGroup = measurement001wb.ageGroup;
        this.status = measurement001wb.status;
        this.insertUser = measurement001wb.insertUser;
        this.insertDatetime = measurement001wb.insertDatetime;
        this.updatedUser = measurement001wb.updatedUser;
        this.updatedDatetime = measurement001wb.updatedDatetime;
        
    }
}