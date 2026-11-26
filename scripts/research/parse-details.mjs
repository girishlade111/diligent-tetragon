import fs from 'node:fs';
import path from 'node:path';

const contentDir = 'research/reference/content';
const out = { projects: {}, services: {}, lab: {}, writing: {} };

for (const f of fs.readdirSync(contentDir)) {
  const text = fs.readFileSync(path.join(contentDir, f), 'utf8');
  if (f.startsWith('work__')) out.projects[f.replace('.txt', '')] = text;
  else if (f.startsWith('services__')) out.services[f.replace('.txt', '')] = text;
  else if (f.startsWith('lab__')) out.lab[f.replace('.txt', '')] = text;
  else if (f.startsWith('writing__')) out.writing[f.replace('.txt', '')] = text;
}

fs.writeFileSync('research/manifests/detail-pages-text.json', JSON.stringify(out, null, 2));
console.log('Bundled detail texts:', {
  projects: Object.keys(out.projects).length,
  services: Object.keys(out.services).length,
  lab: Object.keys(out.lab).length,
  writing: Object.keys(out.writing).length,
});
