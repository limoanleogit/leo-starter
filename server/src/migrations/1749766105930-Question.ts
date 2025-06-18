import { MigrationInterface, QueryRunner } from "typeorm";

export class Question1749766105930 implements MigrationInterface {
    name = 'Question1749766105930'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "questions" ("id" SERIAL NOT NULL, "questionhash" character varying NOT NULL, "film" character varying NOT NULL, "filmImage" character varying NOT NULL, "acteur" character varying NOT NULL, "acteurImage" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_08a6d4b0f49ff300bf3a0ca60ac" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "firstname"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "firstname" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastname"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "lastname" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastname"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "lastname" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "firstname"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "firstname" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`DROP TABLE "questions"`);
    }

}
