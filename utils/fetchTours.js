// Global
import fs from 'fs';
import path from 'path';

// Local Modules import
import rootDir from '../utils/rootDir.js';

export const tours = JSON.parse(
  fs.readFileSync(
    path.resolve(rootDir, 'dev-data', 'data', 'tours-simple.json'),
    'utf-8'
  )
);
