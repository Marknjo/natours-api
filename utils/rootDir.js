const rootDir = new URL('../', import.meta.url).pathname.split(':').at(-1);

export default rootDir;
