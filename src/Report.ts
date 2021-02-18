import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import fetch from 'node-fetch';
type Config = { repos: string[] };

export class Report {
  public config: Config;

  private dependencies: Record<string, string> = {};

  constructor() {
    this.config = JSON.parse(
      readFileSync(join(__dirname, '../config.json'), 'utf-8'),
    ) as Config;
  }

  public async runReport() {
    for (let i = 0; i < this.config.repos.length; i++) {
      const name = this.config.repos[i];
      const url = `https://raw.githubusercontent.com/formio/${name}/master/package.json`;
      console.log(`Fetching dependency list for ${name}`);
      const res = await fetch(url);
      const text = await res.text();
      try {
        const packageJson = JSON.parse(text);
        this.dependencies = {
          ...this.dependencies,
          ...packageJson.dependencies,
        };
      } catch (err) {
        console.log(text);
        console.log(url);
        process.exit();
      }
    }
    const output = JSON.stringify(
      {
        dependencies: this.dependencies,
      },
      null,
      '  ',
    );
    writeFileSync(join(__dirname, '../output/package.json'), output);
  }
}
