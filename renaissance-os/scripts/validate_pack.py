#!/usr/bin/env python3
"""Valide le pack de référence Renaissance : aucune API, aucune écriture externe."""
from pathlib import Path
import json,csv,hashlib,re,sys
R=Path(__file__).resolve().parents[1]
files=[p for p in R.rglob('*') if p.is_file()]
required=['MISSION_A_DONNER_A_CLAUDE.md','DOSSIER_MAITRE_INTEGRAL.md','CHANGELOG_DECISIONS.md','workorders/WORK_PACKAGES.json','quality/QA_MATRIX.csv','quality/TEST_CASES.json']
for p in required: assert (R/p).is_file(),f'Missing {p}'
for p in files:
 if p.suffix=='.json': json.loads(p.read_text(encoding='utf-8'))
with (R/'quality/QA_MATRIX.csv').open(encoding='utf-8') as f:qa=list(csv.DictReader(f))
assert len(qa)>=200
assert len({x['id'] for x in qa})==len(qa)
assert all(x['status']=='NOT_RUN' for x in qa)
orders=json.loads((R/'workorders/WORK_PACKAGES.json').read_text())
ids={x['id'] for x in orders}; assert len(ids)==len(orders)
for o in orders:assert all(dep in ids for dep in o['depends_on'])
try:
 import jsonschema
 for s in (R/'contracts').glob('*.schema.json'):
  schema=json.loads(s.read_text()); jsonschema.Draft202012Validator.check_schema(schema)
  ex=R/'contracts/examples'/s.name.replace('.schema.json','.example.json')
  assert ex.is_file(),f'missing example: {ex.name}'
  jsonschema.Draft202012Validator(schema,format_checker=jsonschema.FormatChecker()).validate(json.loads(ex.read_text()))
 print('Contract schemas and examples: validated (jsonschema)')
except ImportError:print('Contract schemas: syntax-only (optional jsonschema missing)')
assert any(p.name.endswith('.html') for p in (R/'references').iterdir())
print(f'RENAISSANCE V7: PASS | files={len(files)} | QA={len(qa)} | workorders={len(orders)} | risks={len(json.loads((R/"quality/RISK_REGISTER.json").read_text()))}')
