# step53-2020
> STEP 2020 - pod #53

This is a filler README to get the repo initialized.

## Testing
slurp/src/test includes tests for this project using Jest. To use it,
first install npm, then run the following:

```
npm install --save-dev test
npm install jest --global

npm install --save-dev jest babel-jest @babel/preset-env 

``` 

Define testable functions with the `export` keyword, and in the test file, import the functions with `import`. 

The tests can then be run with 

```
npm run test
```

[source 1](https://jestjs.io/docs/en/configuration), [source 2](https://medium.com/@saplos123456/using-es6-import-and-export-statements-for-jest-testing-in-node-js-b20c8bd9041c). 

Note that `package.json` is inside slurp/.