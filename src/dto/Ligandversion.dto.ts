import { Ligandversion001mb } from "src/entity/Ligandversion001mb";

export class LigandVersionDTO {
    id: number;
    ligandVersion: string;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;

    setProperties(ligandversion001mb: Ligandversion001mb) {
        this.id = ligandversion001mb.id;
        this.ligandVersion = ligandversion001mb.ligandVersion;
        this.insertUser = ligandversion001mb.insertUser;
        this.insertDatetime = ligandversion001mb.insertDatetime;
        this.updatedUser = ligandversion001mb.updatedUser;
        this.updatedDatetime = ligandversion001mb.updatedDatetime;
    }
}