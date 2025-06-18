import {ObjectType,Field, Int} from "type-graphql";
import {BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";

@ObjectType()
@Entity()
export class Questions extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(() => String)
    @Column()
    questionhash!: string;

    @Field(() => String)
    @Column()
    film!: string;

    @Field(() => String)
    @Column()
    filmImage!: string;

    @Field(() => String)
    @Column()
    acteur!: string;

    @Field(() => String)
    @Column()
    acteurImage!: string;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}