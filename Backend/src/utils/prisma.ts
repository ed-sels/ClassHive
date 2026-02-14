import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, '../../prisma/dev.db');

// In Prisma 7, the PrismaBetterSqlite3 adapter factory expects a 
// config object with a 'url' property to create its own client.
const adapter = new PrismaBetterSqlite3({ 
  url: `file:${dbPath}` 
});

const prisma = new PrismaClient({ adapter });

export default prisma;
