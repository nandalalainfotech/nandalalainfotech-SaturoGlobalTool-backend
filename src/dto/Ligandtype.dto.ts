import { Ligandtype001mb } from "src/entity/Ligandtype001mb";

export class LigandTypeDTO {
    id: number;
    ligandtype: string;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;

    setProperties(ligandtype001mb: Ligandtype001mb) {
        this.id = ligandtype001mb.id;
        this.ligandtype = ligandtype001mb.ligandtype;
        this.insertUser = ligandtype001mb.insertUser;
        this.insertDatetime = ligandtype001mb.insertDatetime;
        this.updatedUser = ligandtype001mb.updatedUser;
        this.updatedDatetime = ligandtype001mb.updatedDatetime;
    }
}