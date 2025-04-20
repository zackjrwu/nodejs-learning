
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

// 這裡顯示的是 app.js 的完整路徑 包含檔案名稱
const __filename = fileURLToPath(import.meta.url);
// 這裡顯示的是 app.js 所在的目錄路徑
const __dirname = dirname(__filename);

console.log("__filename", __filename);
console.log("__dirname", __dirname);


async function readFiles() {
    try {
        const greet = await readFile(__dirname + '/greet.txt', 'utf-8');
        console.log(greet);
    } catch (error) {
        console.error('Error: ', error);
    }
}

readFiles();
console.log("Done");
