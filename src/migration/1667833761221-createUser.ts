import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableIndex,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class QuestionRefactoringTIMESTAMP
  implements MigrationInterface
{
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'User',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'username',
            type: 'varchar',
          },
          {
            name: 'password',
            type: 'varchar',
          },
        ],
      }),
      true
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('User');
  }
}
