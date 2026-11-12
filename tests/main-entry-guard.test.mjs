import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const source = await readFile(new URL('../src/main.js', import.meta.url), 'utf8');
const LINE_BUDGET = 500;

const ALLOWED_DECLARATIONS = [
  'screen', 'state', 'appContext', 'dashboardFeature',
  'actionOwners', 'renderApp'
];

function extractDeclarations(src) {
  const names = [];
  src.split('\n').forEach(line => {
    const match = line.match(/^(?:async )?function (\w+)|^(?:const|let|var) (\w+)\s*=/);
    if (match) names.push(match[1] || match[2]);
  });
  return names;
}

test('ENTRY GUARD: main.js line budget is not breached', () => {
  const lines = source.split('\n').length;
  assert.ok(lines <= LINE_BUDGET, `main.js has ${lines} lines, exceeding budget of ${LINE_BUDGET}`);
});

test('ENTRY GUARD: top-level declarations in main.js remain frozen', () => {
  const actual = extractDeclarations(source);
  const added = actual.filter(n => !ALLOWED_DECLARATIONS.includes(n));
  assert.deepEqual(added, [], `New top-level names in main.js must be reviewed against D01: ${added.join(', ')}`);
});
