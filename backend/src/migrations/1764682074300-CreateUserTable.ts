import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1764682074300 implements MigrationInterface {
    name = 'CreateUserTable1764682074300'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Check if the users table already exists
        const tableExists = await queryRunner.hasTable("users");
        
        if (!tableExists) {
            await queryRunner.query(`
                CREATE TABLE "users" (
                    "id" SERIAL NOT NULL,
                    "email" character varying NOT NULL,
                    "password" character varying NOT NULL,
                    "name" character varying NOT NULL,
                    "is_active" boolean NOT NULL DEFAULT true,
                    "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                    "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                    CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
                    CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
                )
            `);
            console.log('Users table created via migration');
        } else {
            console.log('Users table already exists, skipping creation');
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }
}
