import { RouteOfAdministartionDTO } from "src/dto/Routeofadministration.dto";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Assay001wb } from "./Assay001wb";

@Entity("routeofadministration001mb", { schema: "saturo" })
export class Routeofadministration001mb {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("varchar", { name: "route", length: 20 })
  route: string;

  @Column("varchar", { name: "insert_user", length: 40 })
  insertUser: string;

  @Column("datetime", { name: "insert_datetime" })
  insertDatetime: Date;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;

  @OneToMany(() => Assay001wb, (assay001wb) => assay001wb.routeSlno2)
  assay001wbs: Assay001wb[];



  setProperties(routeOfAdministartionDTO: RouteOfAdministartionDTO) {
    this.id = routeOfAdministartionDTO.id;
    this.route = routeOfAdministartionDTO.route;
    this.insertUser = routeOfAdministartionDTO.insertUser;
    this.insertDatetime = routeOfAdministartionDTO.insertDatetime;
    this.updatedUser = routeOfAdministartionDTO.updatedUser;
    this.updatedDatetime = routeOfAdministartionDTO.updatedDatetime;
}
}
