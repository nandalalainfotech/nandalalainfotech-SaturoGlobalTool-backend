import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Assaytype001mb } from "./Assaytype001mb";
import { Toxicity001mb } from "./Toxicity001mb";
import { Routeofadministration001mb } from "./Routeofadministration001mb";
import { Unitsinglevalue001mb } from "./Unitsinglevalue001mb";
import { Unitlowendvalue001mb } from "./Unitlowendvalue001mb";
import { Ligand001wb } from "./Ligand001wb";
import { Category001mb } from "./Category001mb";
import { Categoryfunction001mb } from "./Categoryfunction001mb";
import { Originalprefix001mb } from "./Originalprefix001mb";
import { Type001mb } from "./Type001mb";
import { AssayDTO } from "src/dto/Assay.dto";

@Index("assayType_slno", ["assayTypeSlno"], {})
@Index("toxiCity_slno", ["toxiCitySlno"], {})
@Index("route_slno", ["routeSlno"], {})
@Index("unit_slno", ["unitSlno"], {})
@Index("united_slno", ["unitedSlno"], {})
@Index("ligand_slno", ["ligandSlno"], {})
@Index("category_slno", ["categorySlno"], {})
@Index("function_slno", ["functionSlno"], {})
@Index("originalPrefix_slno", ["originalPrefixSlno"], {})
@Index("type_slno", ["typeSlno"], {})
@Entity("assay001wb", { schema: "newsaturo" })
export class Assay001wb {
  @PrimaryGeneratedColumn({ type: "int", name: "assayId" })
  assayId: number;

  @Column("varchar", { name: "ordinal", nullable: true, length: 20 })
  ordinal: string | null;

  @Column("varchar", { name: "collectionId", nullable: true, length: 30 })
  collectionId: string | null;

  @Column("int", { name: "ligand_slno", nullable: true })
  ligandSlno: number | null;

  @Column("int", { name: "assayType_slno", nullable: true })
  assayTypeSlno: number | null;

  @Column("int", { name: "toxiCity_slno", nullable: true })
  toxiCitySlno: number | null;

  @Column("int", { name: "route_slno", nullable: true })
  routeSlno: number | null;

  @Column("varchar", { name: "ligandSvalue", nullable: true, length: 30 })
  ligandSvalue: string | null;

  @Column("int", { name: "unit_slno", nullable: true })
  unitSlno: number | null;

  @Column("varchar", { name: "ligandHvalue", nullable: true, length: 20 })
  ligandHvalue: string | null;

  @Column("varchar", { name: "ligandLvalue", nullable: true, length: 30 })
  ligandLvalue: string | null;

  @Column("varchar", { name: "administration", nullable: true, length: 50 })
  administration: string | null;

  @Column("varchar", { name: "procedure", nullable: true, length: 30 })
  procedure: string | null;

  @Column("varchar", { name: "conditionType", nullable: true, length: 100 })
  conditionType: string | null;

  @Column("varchar", { name: "conditionMaterial", nullable: true, length: 50 })
  conditionMaterial: string | null;

  @Column("varchar", {
    name: "conditionMaterialid",
    nullable: true,
    length: 30,
  })
  conditionMaterialid: string | null;

  @Column("varchar", { name: "singleCondition", nullable: true, length: 50 })
  singleCondition: string | null;

  @Column("varchar", { name: "singleUnit", nullable: true, length: 50 })
  singleUnit: string | null;

  @Column("varchar", { name: "highCondition", nullable: true, length: 50 })
  highCondition: string | null;

  @Column("varchar", { name: "lowCondition", nullable: true, length: 50 })
  lowCondition: string | null;

  @Column("varchar", { name: "highLowUnit", nullable: true, length: 50 })
  highLowUnit: string | null;

  @Column("int", { name: "united_slno", nullable: true })
  unitedSlno: number | null;

  @Column("varchar", { name: "status", nullable: true, length: 50 })
  status: string | null;

  @Column("varchar", { name: "dataLocator", nullable: true, length: 30 })
  dataLocator: string | null;

  @Column("varchar", { name: "dataLocator1", nullable: true, length: 30 })
  dataLocator1: string | null;

  @Column("varchar", { name: "dataLocator2", nullable: true, length: 30 })
  dataLocator2: string | null;

  @Column("varchar", { name: "dataLocator3", nullable: true, length: 30 })
  dataLocator3: string | null;

  @Column("int", { name: "category_slno", nullable: true })
  categorySlno: number | null;

  @Column("int", { name: "function_slno", nullable: true })
  functionSlno: number | null;

  @Column("varchar", { name: "parameter", nullable: true, length: 30 })
  parameter: string | null;

  @Column("varchar", { name: "parameterDetail", nullable: true, length: 100 })
  parameterDetail: string | null;

  @Column("varchar", { name: "singleValue", nullable: true, length: 50 })
  singleValue: string | null;

  @Column("varchar", { name: "unit", nullable: true, length: 30 })
  unit: string | null;

  @Column("int", { name: "originalPrefix_slno", nullable: true })
  originalPrefixSlno: number | null;

  @Column("varchar", { name: "highEndValue", nullable: true, length: 30 })
  highEndValue: string | null;

  @Column("varchar", { name: "lowEndValue", nullable: true, length: 30 })
  lowEndValue: string | null;

  @Column("varchar", { name: "units", nullable: true, length: 30 })
  units: string | null;

  @Column("varchar", { name: "nonNumeric", nullable: true, length: 100 })
  nonNumeric: string | null;

  @Column("varchar", { name: "remark", nullable: true, length: 200 })
  remark: string | null;

  @Column("int", { name: "type_slno", nullable: true })
  typeSlno: number | null;

  @Column("varchar", { name: "cell", nullable: true, length: 50 })
  cell: string | null;

  @Column("varchar", { name: "cellDetail", nullable: true, length: 100 })
  cellDetail: string | null;

  @Column("varchar", { name: "organ", nullable: true, length: 100 })
  organ: string | null;

  @Column("varchar", { name: "organDetail", nullable: true, length: 100 })
  organDetail: string | null;

  @Column("varchar", { name: "species", nullable: true, length: 100 })
  species: string | null;

  @Column("varchar", { name: "speciesDetail", nullable: true, length: 150 })
  speciesDetail: string | null;

  @Column("varchar", { name: "gender", nullable: true, length: 30 })
  gender: string | null;

  @Column("varchar", { name: "ageGroup", nullable: true, length: 50 })
  ageGroup: string | null;

  @Column("varchar", { name: "target", nullable: true, length: 150 })
  target: string | null;

  @Column("varchar", { name: "targetVersion", nullable: true, length: 20 })
  targetVersion: string | null;

  @Column("varchar", { name: "targetStatus", nullable: true, length: 50 })
  targetStatus: string | null;

  @Column("varchar", { name: "collectionId1", nullable: true, length: 30 })
  collectionId1: string | null;

  @Column("varchar", { name: "original", nullable: true, length: 50 })
  original: string | null;

  @Column("varchar", { name: "acronym", nullable: true, length: 30 })
  acronym: string | null;

  @Column("varchar", { name: "organism", nullable: true, length: 30 })
  organism: string | null;

  @Column("varchar", { name: "variant", nullable: true, length: 30 })
  variant: string | null;

  @Column("varchar", { name: "insert_user", nullable: true, length: 40 })
  insertUser: string | null;

  @Column("datetime", { name: "insert_datetime", nullable: true })
  insertDatetime: Date | null;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;

  @ManyToOne(
    () => Assaytype001mb,
    (assaytype001mb) => assaytype001mb.assay001wbs,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "assayType_slno", referencedColumnName: "id" }])
  assayTypeSlno2: Assaytype001mb;

  @ManyToOne(
    () => Toxicity001mb,
    (toxicity001mb) => toxicity001mb.assay001wbs,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "toxiCity_slno", referencedColumnName: "id" }])
  toxiCitySlno2: Toxicity001mb;

  @ManyToOne(
    () => Routeofadministration001mb,
    (routeofadministration001mb) => routeofadministration001mb.assay001wbs,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "route_slno", referencedColumnName: "id" }])
  routeSlno2: Routeofadministration001mb;

  @ManyToOne(
    () => Unitsinglevalue001mb,
    (unitsinglevalue001mb) => unitsinglevalue001mb.assay001wbs,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "unit_slno", referencedColumnName: "id" }])
  unitSlno2: Unitsinglevalue001mb;

  @ManyToOne(
    () => Unitlowendvalue001mb,
    (unitlowendvalue001mb) => unitlowendvalue001mb.assay001wbs,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "united_slno", referencedColumnName: "id" }])
  unitedSlno2: Unitlowendvalue001mb;

  @ManyToOne(() => Ligand001wb, (ligand001wb) => ligand001wb.assay001wbs, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "ligand_slno", referencedColumnName: "ligandId" }])
  ligandSlno2: Ligand001wb;

  @ManyToOne(
    () => Category001mb,
    (category001mb) => category001mb.assay001wbs,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "category_slno", referencedColumnName: "id" }])
  categorySlno2: Category001mb;

  @ManyToOne(
    () => Categoryfunction001mb,
    (categoryfunction001mb) => categoryfunction001mb.assay001wbs,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "function_slno", referencedColumnName: "id" }])
  functionSlno2: Categoryfunction001mb;

  @ManyToOne(
    () => Originalprefix001mb,
    (originalprefix001mb) => originalprefix001mb.assay001wbs,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "originalPrefix_slno", referencedColumnName: "id" }])
  originalPrefixSlno2: Originalprefix001mb;

  @ManyToOne(() => Type001mb, (type001mb) => type001mb.assay001wbs, {
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "type_slno", referencedColumnName: "id" }])
  typeSlno2: Type001mb;

  setProperties(assayDTO: AssayDTO) {
    this.assayId = assayDTO.assayId;
    this.ordinal = assayDTO.ordinal;
    this.assayTypeSlno = assayDTO.assayTypeSlno;
    this.toxiCitySlno = assayDTO.toxiCitySlno;
    this.routeSlno = assayDTO.routeSlno;
    this.collectionId = assayDTO.collectionId;
    this.ligandSlno = assayDTO.ligandSlno;
    this.ligandSvalue = escape(assayDTO.ligandSvalue);
    this.unitSlno = assayDTO.unitSlno;
    this.ligandHvalue = escape(assayDTO.ligandHvalue);
    this.ligandLvalue = escape(assayDTO.ligandLvalue);
    this.administration = escape(assayDTO.administration);
    this.procedure = escape(assayDTO.procedure);
    this.target = escape(assayDTO.target);
    this.conditionType = assayDTO.conditionType;
    this.conditionMaterial = escape(assayDTO.conditionMaterial);
    this.conditionMaterialid = escape(assayDTO.conditionMaterialid);
    this.singleCondition = escape(assayDTO.singleCondition);
    this.singleUnit = assayDTO.singleUnit;
    this.highCondition = escape(assayDTO.highCondition);
    this.lowCondition = escape(assayDTO.lowCondition);
    this.highLowUnit = assayDTO.highLowUnit;
    this.unitedSlno = assayDTO.unitedSlno;
    this.status = assayDTO.status;
    this.dataLocator = assayDTO.dataLocator;
    this.dataLocator1 = escape(assayDTO.dataLocator1);
    this.dataLocator2 = escape(assayDTO.dataLocator2);
    this.dataLocator3 = escape(assayDTO.dataLocator3);
    this.categorySlno = assayDTO.categorySlno;
    this.functionSlno = assayDTO.functionSlno;
    this.parameter = escape(assayDTO.parameter);
    this.parameterDetail = escape(assayDTO.parameterDetail);
    this.singleValue = escape(assayDTO.singleValue);
    this.unit = assayDTO.unit;
    this.originalPrefixSlno = assayDTO.originalPrefixSlno;
    this.highEndValue = escape(assayDTO.highEndValue);
    this.lowEndValue = escape(assayDTO.lowEndValue);
    this.units = assayDTO.units;
    this.nonNumeric = escape(assayDTO.nonNumeric);
    this.remark = escape(assayDTO.remark);
    this.typeSlno = assayDTO.typeSlno;
    this.cell = escape(assayDTO.cell);
    this.cellDetail = escape(assayDTO.cellDetail);
    this.organ = escape(assayDTO.organ);
    this.organDetail = escape(assayDTO.organDetail);
    this.species = escape(assayDTO.species);
    this.speciesDetail = escape(assayDTO.speciesDetail);
    this.gender = assayDTO.gender;
    this.ageGroup = escape(assayDTO.ageGroup);
    this.target = assayDTO.target;
    this.targetVersion = escape(assayDTO.targetVersion);
    this.targetStatus = assayDTO.targetStatus;
    this.collectionId1 = escape(assayDTO.collectionId1);
    this.original = escape(assayDTO.original);
    this.acronym = escape(assayDTO.acronym);
    this.organism = escape(assayDTO.organism);
    this.variant = escape(assayDTO.variant);
    this.insertUser = assayDTO.insertUser;
    this.insertDatetime = assayDTO.insertDatetime;
    this.updatedUser = assayDTO.updatedUser;
    this.updatedDatetime = assayDTO.updatedDatetime;

  }

}
