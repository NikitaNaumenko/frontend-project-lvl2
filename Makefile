install: install-deps

run:
	bin/gendiff.js __fixtures__/first_file.json __fixtures__/second_file.json

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
