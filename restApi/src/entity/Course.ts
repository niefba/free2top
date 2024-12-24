import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ManyToOne
  } from "typeorm";
  
  import { User } from "./User"

  export type CategoryType = "ski touring" | "trekking" | "splitboard"

  @Entity({ name: "courses" })
  export class Course {
    @PrimaryGeneratedColumn("uuid")
    id: string;
  
    @Column({ nullable: false })
    target: string;

    @Column({ nullable: false })
    itinerary: string;
  
    @Column({ nullable: false })
    description: string;

    @Column({ 
      nullable: false,
      type: "enum",
      enum: ["ski touring", "trekking", "splitboard"],
      default: "ski touring"
    })
    category: CategoryType;

    @Column({ nullable: false })
    dateBegin: Date;

    @Column({ nullable: false })
    altitude: number;

    @Column({ nullable: false })
    ascending: number;

    @Column({ nullable: false })
    hours: number;

    @Column({ nullable: false, default: false })
    publicTransport: boolean;

    @Column({ nullable: false })
    dateStamm: Date;

    @Column({ nullable: false, default: false })
    inactive: boolean;

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => User, (user) => user.courses)
    user: User;
  }
  