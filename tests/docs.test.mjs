import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';

const read = (relPath) => readFile(new URL(relPath, import.meta.url), 'utf8');

test('DOCS GUARD: README links AI-BRIEF, CODE-MAP, and DATA-MODEL in order', async () => {
  const readme = await read('../README.md');
  assert.match(readme, /AI-BRIEF\.md[\s\S]*CODE-MAP\.md[\s\S]*DATA-MODEL\.md/);
});

test('DOCS GUARD: Every script in src/ is indexed in CODE-MAP.md', async () => {
  const codeMap = await read('../CODE-MAP.md');
  
  async function scan(dir, prefix = '') {
    const list = [];
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        list.push(...await scan(new URL(`${entry.name}/`, dir), `${prefix}${entry.name}/`));
      } else if (entry.name.endsWith('.js')) {
        list.push(`${prefix}${entry.name}`);
      }
    }
    return list;
  }
  
  const scripts = await scan(new URL('../src/', import.meta.url));
  const missing = scripts.filter((s) => !codeMap.includes(`src/${s}`));
  assert.deepEqual(missing, [], `Files missing from CODE-MAP.md: ${missing.join(', ')}`);
});

test('DOCS GUARD: Every route in state.js is named in AI-BRIEF.md', async () => {
  const [brief, state] = await Promise.all([
    read('../AI-BRIEF.md'),
    read('../src/state.js')
  ]);
  const routesMatch = state.match(/screens\s*=\s*new\s+Set\(\[([^\]]+)\]\)/);
  if (routesMatch) {
    const routes = [...routesMatch[1].matchAll(/'([\w-]+)'/g)].map(m => m[1]);
    const missing = routes.filter(r => !brief.includes(`#${r}`));
    assert.deepEqual(missing, [], `Routes missing from AI-BRIEF.md: ${missing.join(', ')}`);
  }
});
