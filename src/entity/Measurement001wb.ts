import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category001mb } from "./Category001mb";
import { Categoryfunction001mb } from "./Categoryfunction001mb";
import { Originalprefix001mb } from "./Originalprefix001mb";
import { Type001mb } from "./Type001mb";
import { Assay001wb } from "./Assay001wb";
import { MeasurementDTO } from "src/dto/Measurement.dto";

@Index("category_slno", ["categorySlno"], {})
@Index("function_slno", ["functionSlno"], {})
@Index("originalPrefix_slno", ["originalPrefixSlno"], {})
@Index("type_slno", ["typeSlno"], {})
@Index("assay_slno", ["assaySlno"], {})
@Entity("measurement001wb", { schema: "saturo" })
export class Measurement001wb {
  @PrimaryGeneratedColumn({ type: "int", name: "measurementId" })
  measurementId: number;

  @Column("int", { name: "assay_slno" })
  assaySlno: number;

  @Column("varchar", { name: "dataLocator", length: 30 })
  dataLocator: string;

  @Column("int", { name: "category_slno" })
  categorySlno: number;

  @Column("int", { name: "function_slno" })
  functionSlno: number;

  @Column("varchar", { name: "parameter", length: 30 })
  parameter: string;

  @Column("varchar", { name: "parameterDetail", length: 100 })
  parameterDetail: string;

  @Column("varchar", { name: "singleValue", length: 50 })
  singleValue: string;

  @Column("varchar", { name: "unit", length: 30 })
  unit: string;

  @Column("int", { name: "originalPrefix_slno" })
  originalPrefixSlno: number;

  @Column("varchar", { name: "highEndValue", length: 30 })
  highEndValue: string;

  @Column("varchar", { name: "lowEndValue", length: 30 })
  lowEndValue: string;

  @Column("varchar", { name: "units", length: 30 })
  units: string;

  @Column("varchar", { name: "nonNumeric", length: 100 })
  nonNumeric: string;

  @Column("varchar", { name: "remark", length: 200 })
  remark: string;

  @Column("int", { name: "type_slno" })
  typeSlno: number;

  @Column("varchar", { name: "cell", length: 50 })
  cell: string;

  @Column("varchar", { name: "cellDetail", length: 100 })
  cellDetail: string;

  @Column("varchar", { name: "organ", length: 100 })
  organ: string;

  @Column("varchar", { name: "organDetail", length: 100 })
  organDetail: string;

  @Column("varchar", { name: "species", length: 100 })
  species: string;

  @Column("varchar", { name: "speciesDetail", length: 150 })
  speciesDetail: string;

  @Column("varchar", { name: "ageGroup", length: 50 })
  ageGroup: string;

  @Column("varchar", { name: "status", nullable: true, length: 50 })
  status: string | null;

  @Column("varchar", { name: "insert_user", length: 40 })
  insertUser: string;

  @Column("datetime", { name: "insert_datetime" })
  insertDatetime: Date;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;

  @Column("varchar", { name: "gender", nullable: true, length: 30 })
  gender: string | null;

  // @ManyToOne(
  //   () => Category001mb,
  //   (category001mb) => category001mb.measurement001wbs,
  //   { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  // )
  // @JoinColumn([{ name: "category_slno", referencedColumnName: "id" }])
  // categorySlno2: Category001mb;

  // @ManyToOne(
  //   () => Categoryfunction001mb,
  //   (categoryfunction001mb) => categoryfunction001mb.measurement001wbs,
  //   { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  // )
  // @JoinColumn([{ name: "function_slno", referencedColumnName: "id" }])
  // functionSlno2: Categoryfunction001mb;

  // @ManyToOne(
  //   () => Originalprefix001mb,
  //   (originalprefix001mb) => originalprefix001mb.measurement001wbs,
  //   { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  // )
  // @JoinColumn([{ name: "originalPrefix_slno", referencedColumnName: "id" }])
  // originalPrefixSlno2: Originalprefix001mb;

  // @ManyToOne(() => Type001mb, (type001mb) => type001mb.measurement001wbs, {
  //   onDelete: "CASCADE",
  //   onUpdate: "RESTRICT",
  // })
  // @JoinColumn([{ name: "type_slno", referencedColumnName: "id" }])
  // typeSlno2: Type001mb;

  // @ManyToOne(() => Assay001wb, (assay001wb) => assay001wb.measurement001wbs, {
  //   onDelete: "CASCADE",
  //   onUpdate: "RESTRICT",
  // })
  // @JoinColumn([{ name: "assay_slno", referencedColumnName: "assayId" }])
  // assaySlno2: Assay001wb;


  setProperties(measurementDTO: MeasurementDTO) {
    // this.measurementId = measurementDTO.measurementId;
    // this.assaySlno = measurementDTO.assaySlno;
    // this.dataLocator = measurementDTO.dataLocator;
    // this.categorySlno = measurementDTO.categorySlno;
    // this.functionSlno = measurementDTO.functionSlno;
    // this.parameter = measurementDTO.parameter;
    // this.parameterDetail = measurementDTO.parameterDetail;
    // this.singleValue = measurementDTO.singleValue;
    // this.unit = measurementDTO.unit;
    // this.originalPrefixSlno = measurementDTO.originalPrefixSlno;
    // this.highEndValue = measurementDTO.highEndValue;
    // this.lowEndValue = measurementDTO.lowEndValue;
    // this.units = measurementDTO.units;
    // this.nonNumeric = measurementDTO.nonNumeric;
    // this.remark = measurementDTO.remark;
    // this.typeSlno = measurementDTO.typeSlno;
    // this.cell = measurementDTO.cell;
    // this.cellDetail = measurementDTO.cellDetail;
    // this.organ = measurementDTO.organ;
    // this.organDetail = measurementDTO.organDetail;
    // this.species = measurementDTO.species;
    // this.speciesDetail = measurementDTO.speciesDetail;
    // this.gender = measurementDTO.gender;
    // this.ageGroup = measurementDTO.ageGroup;
    // this.status = measurementDTO.status;
    // this.insertUser = measurementDTO.insertUser;
    // this.insertDatetime = measurementDTO.insertDatetime;
    // this.updatedUser = measurementDTO.updatedUser;
    // this.updatedDatetime = measurementDTO.updatedDatetime;

  }
}
