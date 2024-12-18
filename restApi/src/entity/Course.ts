import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from "typeorm";
  
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

    @Column({ nullable: false })
    category: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }
  