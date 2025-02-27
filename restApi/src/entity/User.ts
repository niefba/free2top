import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
  } from "typeorm";
  
  import { Course } from "./Course";

  @Entity({ name: "users" })
  export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;
  
    @Column({ nullable: false })
    firstName: string;

    @Column({ nullable: false })
    lastName: string;
  
    @Column({ nullable: false })
    email: string;
  
    @Column({ nullable: false })
    password: string;
  
    @Column({ default: "user" })
    role: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Course, (course) => course.user)
    courses: Course[]
  }
  