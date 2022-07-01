import { Role001mb } from "src/entity/Role001mb";
import { User001mb } from "src/entity/User001mb";
import { Role } from "src/role/role.enum";
import { BaseDTO } from "./Base.dto";
import { PersonDTO } from "./person.dto";
import { RoleDTO } from "./Role.dto";


export class UserDTO extends PersonDTO{
    personId: number;
    username: string;
    firstname: string;
    lastname: string;
    roleid: number;
    password: string;
    status: string;
    email: string;
    securityquestion: string;
    securityanswer: string;
    theme: string | null;
    rolename: string | null;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;
    role: Role001mb;

    setProperties(user001mb: User001mb) {
        this.personId = user001mb.personId;
        this.rolename = user001mb.role.rolename;
        this.username = user001mb.username;
        this.firstname = user001mb.firstname;
        this.lastname = user001mb.lastname;
        this.roleid = user001mb.roleid;
        this.password = user001mb.password;
        this.status = user001mb.status;
        this.email = user001mb.email;
        this.securityquestion = user001mb.securityquestion;
        this.securityanswer = user001mb.securityanswer;
        this.theme = user001mb.theme;
        this.insertUser = user001mb.insertUser;
        this.insertDatetime = user001mb.insertDatetime;
        this.updatedUser = user001mb.updatedUser;
        this.updatedDatetime = user001mb.updatedDatetime;
    }
}
