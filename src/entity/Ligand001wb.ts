import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Assay001wb } from "./Assay001wb";
import { Ligandversion001mb } from "./Ligandversion001mb";
import { Ligandtype001mb } from "./Ligandtype001mb";
import { LigandDTO } from "src/dto/Ligand.dto";

@Index("ligandVersion_slno", ["ligandVersionSlno"], {})
@Index("ligandType_slno", ["ligandTypeSlno"], {})
@Entity("ligand001wb", { schema: "newsaturo" })
export class Ligand001wb {
  @PrimaryGeneratedColumn({ type: "int", name: "ligandId" })
  ligandId: number;

  @Column("varchar", { name: "tanNumber", length: 30 })
  tanNumber: string;

  @Column("varchar", { name: "ligandUri", length: 150 })
  ligandUri: string;

  @Column("int", { name: "ligandVersion_slno" })
  ligandVersionSlno: number;

  @Column("varchar", { name: "ligandStatus", length: 50 })
  ligandStatus: string;

  @Column("varchar", { name: "collection", length: 30 })
  collection: string;

  @Column("int", { name: "ligandType_slno" })
  ligandTypeSlno: number;

  @Column("varchar", { name: "ligandDetail", length: 100 })
  ligandDetail: string;

  @Column("varchar", { name: "Identifier1", nullable: true, length: 100 })
  identifier1: string | null;

  @Column("varchar", { name: "Identifier2", nullable: true, length: 100 })
  identifier2: string | null;

  @Column("varchar", { name: "Identifier3", nullable: true, length: 100 })
  identifier3: string | null;

  @Column("varchar", { name: "collectionId", length: 30 })
  collectionId: string;

  @Column("varchar", { name: "locator", length: 30 })
  locator: string;

  @Column("varchar", { name: "sourceType", length: 30 })
  sourceType: string;

  @Column("varchar", { name: "citation", length: 30 })
  citation: string;

  @Column("varchar", { name: "diseaseName1", length: 30 })
  diseaseName1: string;

  @Column("varchar", { name: "diseaseName2", length: 30 })
  diseaseName2: string;

  @Column("varchar", { name: "diseaseName3", length: 30 })
  diseaseName3: string;

  @Column("varchar", { name: "target", length: 150 })
  target: string;

  @Column("varchar", { name: "targetVersion", length: 20 })
  targetVersion: string;

  @Column("varchar", { name: "targetStatus", length: 50 })
  targetStatus: string;

  @Column("varchar", { name: "collectionId1", length: 30 })
  collectionId1: string;

  @Column("varchar", { name: "original", length: 50 })
  original: string;

  @Column("varchar", { name: "acronym", length: 30 })
  acronym: string;

  @Column("varchar", { name: "organism", length: 30 })
  organism: string;

  @Column("varchar", { name: "variant", length: 30 })
  variant: string;

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

  @OneToMany(() => Assay001wb, (assay001wb) => assay001wb.ligandSlno2)
  assay001wbs: Assay001wb[];

  @ManyToOne(
    () => Ligandversion001mb,
    (ligandversion001mb) => ligandversion001mb.ligand001wbs,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "ligandVersion_slno", referencedColumnName: "id" }])
  ligandVersionSlno2: Ligandversion001mb;

  @ManyToOne(
    () => Ligandtype001mb,
    (ligandtype001mb) => ligandtype001mb.ligand001wbs,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "ligandType_slno", referencedColumnName: "id" }])
  ligandTypeSlno2: Ligandtype001mb;




  setProperties(ligandDTO: LigandDTO) {
    this.ligandId = ligandDTO.ligandId;
    this.tanNumber = escape(ligandDTO.tanNumber);
    this.ligandUri = ligandDTO.ligandUri;
    this.ligandVersionSlno = ligandDTO.ligandVersionSlno;
    this.ligandStatus = ligandDTO.ligandStatus;
    this.collection = ligandDTO.collection;
    this.ligandTypeSlno = ligandDTO.ligandTypeSlno;
    this.ligandDetail = escape(ligandDTO.ligandDetail);
    this.identifier1 = escape(ligandDTO.identifier1);
    this.identifier2 = escape(ligandDTO.identifier2);
    this.identifier3 = escape(ligandDTO.identifier3);
    this.collectionId = escape(ligandDTO.collectionId);
    this.locator = escape(ligandDTO.locator);
    this.sourceType = ligandDTO.sourceType;
    this.citation = ligandDTO.citation;
    this.diseaseName1 = escape(ligandDTO.diseaseName1);
    this.diseaseName2 = escape(ligandDTO.diseaseName2);
    this.diseaseName3 = escape(ligandDTO.diseaseName3);
    this.target = ligandDTO.target;
    this.targetVersion = ligandDTO.targetVersion;
    this.targetStatus = ligandDTO.targetStatus;
    this.collectionId1 = ligandDTO.collectionId1;
    this.original = ligandDTO.original;
    this.acronym = ligandDTO.acronym;
    this.organism = ligandDTO.organism;
    this.variant = ligandDTO.variant;
    this.status = ligandDTO.status;
    this.insertUser = ligandDTO.insertUser;
    this.insertDatetime = ligandDTO.insertDatetime;
    this.updatedUser = ligandDTO.updatedUser;
    this.updatedDatetime = ligandDTO.updatedDatetime;
  }
}
