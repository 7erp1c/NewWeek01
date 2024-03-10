/*
step1: yarn init --yes,
step2: yarn add express dotenv,
step3: yarn add nodemon typescript ts-node @types/node @types/express jest ts-jest @types/jest supertest @types/supertest --dev,
step4: yarn tsc --init

tsconfig.json:
 */
// {
//     "compilerOptions": {
//         "target": "es2016",
//         "module": "commonjs",
//         "outDir": "./dist",
//         "allowSyntheticDefaultImports": true,
//         "esModuleInterop": true,
//         "forceConsistentCasingInFileNames": true,
//         "strict": true,
//         "noImplicitReturns": true,
//         "skipLibCheck": true
//     },
//     "include": ["src/**//*"],
// "exclude": ["node_modules", "**//*.test.ts"]
// }
//package.json:
//
// "scripts": {
//     "watch": "tsc -w",
//         "dev": "yarn nodemon --inspect dist/index.js",
//         "jest": "jest -i"
// },
//
