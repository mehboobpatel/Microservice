import * as fs from 'fs';
import * as crypto from 'crypto';
import { getDBFromEnv } from './env';
import { upsertConfigValues } from './database';

interface PasswordData {
  [key: string]: string;
}

const dbConfig = getDBFromEnv();

function encryptMessage(publicKeyPath: string, plainText: string): string {
  try {
    const messageBuffer = Buffer.from(plainText, 'utf8');

    // Encrypt the message
    const encryptedData = crypto.publicEncrypt(
      {
        key: fs.readFileSync(publicKeyPath, 'utf8'),
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256',
      },
      messageBuffer,
    );

    // Return encrypted data as base64 string
    return encryptedData.toString('base64');
  } catch (error) {
    throw new Error(`Encryption failed: ${(error as Error).message}`);
  }
}

async function processJsonFile(jsonPath: string, publicKeyPath: string) {
  try {
    // Validate file paths
    if (!fs.existsSync(jsonPath)) {
      throw new Error(`JSON file not found: ${jsonPath}`);
    }
    if (!fs.existsSync(publicKeyPath)) {
      throw new Error(`Public key file not found: ${publicKeyPath}`);
    }

    const jsonContent = fs.readFileSync(jsonPath, 'utf8');
    const passwords: PasswordData = JSON.parse(jsonContent);

    const encryptedPasswords: PasswordData = {};

    // Encrypt all values first and store them in the object
    for (const [key, value] of Object.entries(passwords)) {
      encryptedPasswords[key] = encryptMessage(publicKeyPath, value.toString());
      console.log(`Key: ${key}`);
      console.log('Encrypted Value: ', encryptedPasswords[key]);
      console.log('\n');
    }

    // Now call the upsertConfigValues function once with the entire encryptedPasswords object
    await upsertConfigValues(dbConfig, encryptedPasswords);
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`);
    process.exit(1);
  }
}

// Get command line arguments
const args = process.argv.slice(2);

if (args.length !== 2) {
  console.error('Usage: node encrypt-config-data.js <path_to_json> <path_to_public_key>');
  process.exit(1);
}

const [jsonPath, publicKeyPath] = args;
processJsonFile(jsonPath, publicKeyPath);
