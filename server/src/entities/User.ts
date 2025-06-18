import { ObjectType, Field, Int } from "type-graphql";
import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { IsNotEmpty } from "class-validator";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column()
  @IsNotEmpty({ message: "Username is required" })
  username!: string;

  @Field(() => String)
  @Column()
  @IsNotEmpty({ message: "Firstname is required" })
  firstname!: string;

  @Field(() => String)
  @Column()
  @IsNotEmpty({ message: "Lastname is required" })
  lastname!: string;

  @Field(() => String)
  @Column()
  @IsNotEmpty({ message: "Email is required" })
  email!: string;

  @Field(() => String)
  @Column()
  @IsNotEmpty({ message: "Password is required" })
  password!: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
