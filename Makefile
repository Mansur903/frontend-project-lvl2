install:
	npm install

gendiff:
	node src/bin/gendiff.js

publish: 
	npm publish --dry-run

lint:
	npx eslint .

test: 
	npm test

test-coverage:
	npm run test-coverage

test-watch:
	npx jest --watch