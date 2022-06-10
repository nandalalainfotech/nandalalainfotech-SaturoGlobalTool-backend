import { LigandTypeDTO } from "src/dto/Ligandtype.dto";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Ligand001wb } from "./Ligand001wb";

@Entity("ligandtype001mb", { schema: "saturo" })
export class Ligandtype001mb {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("varchar", { name: "ligandtype", length: 30 })
  ligandtype: string;

  @Column("varchar", { name: "insert_user", length: 40 })
  insertUser: string;

  @Column("datetime", { name: "insert_datetime" })
  insertDatetime: Date;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;

  @OneToMany(() => Ligand001wb, (ligand001wb) => ligand001wb.ligandTypeSlno2)
  ligand001wbs: Ligand001wb[];


  setProperties(ligandTypeDTO: LigandTypeDTO) {
    this.id = ligandTypeDTO.id;
    this.ligandtype = ligandTypeDTO.ligandtype;
    this.insertUser = ligandTypeDTO.insertUser;
    this.insertDatetime = ligandTypeDTO.insertDatetime;
    this.updatedUser = ligandTypeDTO.updatedUser;
    this.updatedDatetime = ligandTypeDTO.updatedDatetime;
  }
}
