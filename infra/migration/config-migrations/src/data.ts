import { readFileSync } from "fs";

export interface ConfigData {
  [key: string]: string;
}

export const importData = (fileName: string): ConfigData =>
  JSON.parse(readFileSync(fileName).toString()) as ConfigData;
