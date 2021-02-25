install:
	npm install

gendiff:
	node bin/gendiff.js

publish: 
	npm publish --dry-run

lint:
	npx eslint .

test: 
	npm run-script test

test-coverage:
	npm run-script test-coverage

test-watch:
	NODE_OPTIONS=--experimental-vm-modules npx jest --watch