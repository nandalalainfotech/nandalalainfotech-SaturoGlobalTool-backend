import { Assaytype001mb } from "src/entity/Assaytype001mb";

export class AssayTypeDTO {
    id: number;
    assayType: string;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;

    setProperties(assaytype001mb: Assaytype001mb) {
        this.id = assaytype001mb.id;
        this.assayType = assaytype001mb.assayType;
        this.insertUser = assaytype001mb.insertUser;
        this.insertDatetime = assaytype001mb.insertDatetime;
        this.updatedUser = assaytype001mb.updatedUser;
        this.updatedDatetime = assaytype001mb.updatedDatetime;
    }
}