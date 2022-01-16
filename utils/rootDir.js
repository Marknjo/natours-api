import path from 'path';

const rootDir = path.join(
  new URL(import.meta.url).pathname.split(':').at(-1),
  '../',
  '../'
);

export default rootDir;
