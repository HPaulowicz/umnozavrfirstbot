import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateUsersTable1698094138942 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'serial',
                    isPrimary: true,
                    isNullable: false,
                }, {
                    name: 'telegram_id',
                    type: 'text',
                    isNullable: false,
                    isUnique: true,
                }, {
                    name: 'username',
                    type: 'text',
                    isNullable: false,
                }, {
                    name: 'first_name',
                    type: 'text',
                    isNullable: false,
                }, {
                    name: 'language_code',
                    type: 'varchar(2)',
                    isNullable: false,
                }, {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                    isNullable: false,
                }, {
                    name: 'updated_at',
                    type: 'timestamp',
                    onUpdate: 'CURRENT_TIMESTAMP',
                    isNullable: true,
                }, {
                    name: 'deleted_at',
                    type: 'timestamp',
                    isNullable: true,
                },
            ],
        }));
        await queryRunner.createTable(new Table({
            name: 'admins',
            columns: [
                {
                    name: 'id',
                    type: 'serial',
                    isPrimary: true,
                    isNullable: false,
                }, {
                    name: 'telegram_id',
                    type: 'text',
                    isNullable: false,
                    isUnique: true,
                }, {
                    name: 'permissions',
                    type: 'jsonb',
                    isNullable: false,
                    default: "'[]'"
                }, {
                    name: 'valid_from',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                    isNullable: false,
                }, {
                    name: 'valid_to',
                    type: 'timestamp',
                    isNullable: true,
                }, {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                    isNullable: false,
                }, {
                    name: 'updated_at',
                    type: 'timestamp',
                    onUpdate: 'CURRENT_TIMESTAMP',
                    isNullable: true,
                }, {
                    name: 'deleted_at',
                    type: 'timestamp',
                    isNullable: true,
                },
            ],
        }));
        await queryRunner.query('INSERT INTO admins (telegram_id, permissions) VALUES (\'306947437\', \'["adminhello"]\')');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
        await queryRunner.dropTable('admins');
    }

}
