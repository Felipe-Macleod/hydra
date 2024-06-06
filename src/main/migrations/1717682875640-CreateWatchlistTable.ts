import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateWatchlistTable1717682875640 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "watched",
        columns: [
          { name: "id", type: "int", isPrimary: true },
          { name: "objectID", type: "varchar", isUnique: true },
          { name: "createdAt", type: "timestamp", default: "now()" },
          { name: "updatedAt", type: "timestamp", default: "now()" },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('watched');
  }

}
