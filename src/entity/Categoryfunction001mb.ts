import { CategoryFunctionDTO } from "src/dto/Categoryfunction.dto";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Assay001wb } from "./Assay001wb";
import { Measurement001wb } from "./Measurement001wb";

@Entity("categoryfunction001mb", { schema: "saturo" })
export class Categoryfunction001mb {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("varchar", { name: "function", length: 100 })
  function: string;

  @Column("varchar", { name: "insert_user", length: 40 })
  insertUser: string;

  @Column("datetime", { name: "insert_datetime" })
  insertDatetime: Date;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;

  // @OneToMany(
  //   () => Measurement001wb,
  //   (measurement001wb) => measurement001wb.functionSlno2
  // )
  // measurement001wbs: Measurement001wb[];

  @OneToMany(() => Assay001wb, (assay001wb) => assay001wb.functionSlno2)
  assay001wbs: Assay001wb[];


  setProperties(categoryFunctionDTO: CategoryFunctionDTO) {
    this.id = categoryFunctionDTO.id;
    this.function = escape(categoryFunctionDTO.function);
    this.insertUser = categoryFunctionDTO.insertUser;
    this.insertDatetime = categoryFunctionDTO.insertDatetime;
    this.updatedUser = categoryFunctionDTO.updatedUser;
    this.updatedDatetime = categoryFunctionDTO.updatedDatetime;
  }
}
