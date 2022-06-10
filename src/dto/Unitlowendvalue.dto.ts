import { Unitlowendvalue001mb } from "src/entity/Unitlowendvalue001mb";

export class UnitlowendvalueDTO {
    id: number;
    united: string;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;


    setProperties(unitlowendvalue001mb: Unitlowendvalue001mb) {
        this.id = unitlowendvalue001mb.id;
        this.united = unitlowendvalue001mb.united;
        this.insertUser = unitlowendvalue001mb.insertUser;
        this.insertDatetime = unitlowendvalue001mb.insertDatetime;
        this.updatedUser = unitlowendvalue001mb.updatedUser;
        this.updatedDatetime = unitlowendvalue001mb.updatedDatetime;
    }
}