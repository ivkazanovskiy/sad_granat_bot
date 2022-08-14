import * as fs from 'fs/promises';
import * as path from 'path';

export class Template {
  static active = false;

  static async start() {
    if (this.active) return;

    const dir = await fs.readdir(path.join(__dirname, '../../../templates'));

    for (let i = 1; i <= 14; i += 1) {
      if (!dir.includes(`${i}.txt`)) {
        await fs.writeFile(
          path.join(__dirname, `../../../templates/${i}.txt`),
          `Здесь должен быть текст ${i} сообщения`,
        );
      }
    }

    this.active = true;
  }

  static async get(i: number) {
    await this.start();
    return fs.readFile(
      path.join(__dirname, '../../../templates', `${i}.txt`),
      'utf8',
    );
  }

  static async set(i: number, text: string) {
    return fs.writeFile(
      path.join(__dirname, '../../../templates', `${i}.txt`),
      text,
    );
  }
}
