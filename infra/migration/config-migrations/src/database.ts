import * as pgPromise from 'pg-promise'; // pg-promise core library
import { IMain } from 'pg-promise';
import { ConfigData } from './data';

const pgp: IMain = pgPromise();

export interface DatabaseValues {
  host: string;
  database: string;
  port: number;
  user: string;
  password: string;
}

export async function upsertConfigValues(databaseConfig: DatabaseValues, data: ConfigData) {
  const db = pgp(databaseConfig);
  await db.tx((t) => {
    const queries = Object.keys(data).map((item) => {
      return t.none(
        `UPDATE core.configurations
        SET value=$2, updated_at=now()
        WHERE key=$1;`,
        [item, data[item]],
      );
    });
    return t.batch(queries);
  });
}
