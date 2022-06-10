import { Routeofadministration001mb } from "src/entity/Routeofadministration001mb";

export class RouteOfAdministartionDTO {
    id: number;
    route: string;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;


    setProperties(routeofadministration001mb: Routeofadministration001mb) {
        this.id = routeofadministration001mb.id;
        this.route = routeofadministration001mb.route;
        this.insertUser = routeofadministration001mb.insertUser;
        this.insertDatetime = routeofadministration001mb.insertDatetime;
        this.updatedUser = routeofadministration001mb.updatedUser;
        this.updatedDatetime = routeofadministration001mb.updatedDatetime;
    }
}