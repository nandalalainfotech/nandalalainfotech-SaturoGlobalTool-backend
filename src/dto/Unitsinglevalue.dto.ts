import { Unitsinglevalue001mb } from "src/entity/Unitsinglevalue001mb";

export class UnitSingleValueDTO {
    id: number;
    unit: string;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;

    setProperties(unitsinglevalue001mb: Unitsinglevalue001mb) {
        this.id = unitsinglevalue001mb.id;
        this.unit = unitsinglevalue001mb.unit;
        this.insertUser = unitsinglevalue001mb.insertUser;
        this.insertDatetime = unitsinglevalue001mb.insertDatetime;
        this.updatedUser = unitsinglevalue001mb.updatedUser;
        this.updatedDatetime = unitsinglevalue001mb.updatedDatetime;
    }
}