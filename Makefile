install: install-deps

run:
	bin/gendiff.js __fixtures__/before.json __fixtures__/after.json

run-plain:
	bin/gendiff.js __fixtures__/before.json __fixtures__/after.json -f plain

run-json:
	bin/gendiff.js __fixtures__/before.json __fixtures__/after.json -f json

install-deps:
	npm ci

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

lint:
	npx eslint .

publish:
	npm publish

.PHONY: test
