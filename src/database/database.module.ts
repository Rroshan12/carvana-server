import { Module } from '@nestjs/common';
import { drizzle, MySql2Database } from 'drizzle-orm/mysql2';
import * as mysql from 'mysql2/promise';
import * as schema from './model';

@Module({
  providers: [
    {
      provide: 'DB',
      useFactory: async (): Promise<MySql2Database<typeof schema>> => {
        const pool = await mysql.createPool({
          host: process.env.DB_HOST,
          port: Number(process.env.DB_PORT),
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
        });

        const db = drizzle(pool, {
          schema,
          mode: 'default',
          logger: {
            logQuery: (query, params) => {
              console.log('[SQL]:', query);
            },
          },
        }) as MySql2Database<typeof schema>;

        return db;
      },
    },
  ],
  exports: ['DB'],
})
export class DbModule {}
