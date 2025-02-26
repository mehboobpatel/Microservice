#!/usr/bin/env node
import { argv } from 'process';
import { importData } from './data';
import { upsertConfigValues } from './database';
import { getDBFromEnv } from './env';

async function main(args: Array<string>) {
  const dbConfig = getDBFromEnv();
  const configFile = typeof args[0] !== 'string' ? './config.json' : args[0];
  const configData = importData(configFile);
  await upsertConfigValues(dbConfig, configData);
  console.log('Migrated!!');
}

main(argv.slice(2)).catch((e) => {
  console.error(`ERROR: ${e.message}`);
  process.exit(1);
});
