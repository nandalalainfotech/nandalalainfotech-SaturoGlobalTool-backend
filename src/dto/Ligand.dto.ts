import { Assay001wb } from "src/entity/Assay001wb";
import { Ligand001wb } from "src/entity/Ligand001wb";
import { Ligandtype001mb } from "src/entity/Ligandtype001mb";
import { Ligandversion001mb } from "src/entity/Ligandversion001mb";

export class LigandDTO {
    ligandId: number;
    tanNumber: string;
    ligandUri: string;
    ligandVersionSlno: number;
    ligandStatus: string;
    collection: string;
    ligandTypeSlno: number;
    ligandDetail: string;
    identifier1: string;
    identifier2: string;
    identifier3: string;
    collectionId: string;
    locator: string;
    sourceType: string;
    citation: string;
    diseaseName1: string;
    diseaseName2: string;
    diseaseName3: string;
    target: string;
    targetVersion: string;
    targetStatus: string;
    collectionId1: string;
    original: string;
    acronym: string;
    organism: string;
    variant: string;
    status: string;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;
    
    ligandVersionSlno2: Ligandversion001mb;
    ligandTypeSlno2: Ligandtype001mb;

    setProperties(ligand001wb: Ligand001wb) {
        this.ligandId = ligand001wb.ligandId;
        this.tanNumber = ligand001wb.tanNumber;
        this.ligandUri = ligand001wb.ligandUri;
        this.ligandVersionSlno = ligand001wb.ligandVersionSlno;
        this.ligandStatus = ligand001wb.ligandStatus;
        this.collection = ligand001wb.collection;
        this.ligandTypeSlno = ligand001wb.ligandTypeSlno;
        this.ligandDetail = ligand001wb.ligandDetail;
        this.identifier1 = ligand001wb.identifier1;
        this.identifier2 = ligand001wb.identifier2;
        this.identifier3 = ligand001wb.identifier3;
        this.collectionId = ligand001wb.collectionId;
        this.locator = ligand001wb.locator;
        this.sourceType = ligand001wb.sourceType;
        this.citation = ligand001wb.citation;
        this.diseaseName1 = ligand001wb.diseaseName1;
        this.diseaseName2 = ligand001wb.diseaseName2;
        this.diseaseName3 = ligand001wb.diseaseName3;
        this.target = ligand001wb.target;
        this.targetVersion = ligand001wb.targetVersion;
        this.targetStatus = ligand001wb.targetStatus;
        this.collectionId1 = ligand001wb.collectionId1;
        this.original = ligand001wb.original;
        this.acronym = ligand001wb.acronym;
        this.organism = ligand001wb.organism;
        this.variant = ligand001wb.variant;
        this.status = ligand001wb.status;
        this.insertUser = ligand001wb.insertUser;
        this.insertDatetime = ligand001wb.insertDatetime;
        this.updatedUser = ligand001wb.updatedUser;
        this.updatedDatetime = ligand001wb.updatedDatetime;
    }
}