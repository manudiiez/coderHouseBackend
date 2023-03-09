import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
console.log(__filename)
let __dirname = path.dirname(__filename);
console.log(__dirname)
__dirname = __dirname.substr(0, __dirname.length - 6);
console.log(__dirname)

