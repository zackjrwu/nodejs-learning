import { open } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function streamFiles() {
    try {
        const readHandle = await open(__dirname + '/greet.txt');
        const writeHandle = await open(__dirname + '/greet-copy.txt', 'w');

        const readable = readHandle.createReadStream({
            encoding: 'utf-8',
            highWaterMark: 16 * 1024 // 16KB
        });

        const writeable = writeHandle.createWriteStream();

        for await (const chunk of readable) {
            await writeable.write(chunk);
        }
        await readHandle.close();
        await writeHandle.close();
        
    } catch (error) {
        console.error(error);
    }
}

streamFiles();