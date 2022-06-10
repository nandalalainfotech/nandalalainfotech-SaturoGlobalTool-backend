import { LigandVersionDTO } from "src/dto/Ligandversion.dto";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Assay001wb } from "./Assay001wb";
import { Ligand001wb } from "./Ligand001wb";

@Entity("ligandversion001mb", { schema: "saturo" })
export class Ligandversion001mb {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("varchar", { name: "ligandVersion", length: 30 })
  ligandVersion: string;

  @Column("varchar", { name: "insert_user", length: 40 })
  insertUser: string;

  @Column("datetime", { name: "insert_datetime" })
  insertDatetime: Date;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;

  @OneToMany(() => Assay001wb, (assay001wb) => assay001wb.ligandSlno2)
  assay001wbs: Assay001wb[];

  @OneToMany(() => Ligand001wb, (ligand001wb) => ligand001wb.ligandVersionSlno2)
  ligand001wbs: Ligand001wb[];


  setProperties(ligandVersionDTO: LigandVersionDTO) {
    this.id = ligandVersionDTO.id;
    this.ligandVersion = ligandVersionDTO.ligandVersion;
    this.insertUser = ligandVersionDTO.insertUser;
    this.insertDatetime = ligandVersionDTO.insertDatetime;
    this.updatedUser = ligandVersionDTO.updatedUser;
    this.updatedDatetime = ligandVersionDTO.updatedDatetime;
  }
}
