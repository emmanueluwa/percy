/*
we need to get all repositories
per repository we need
- description text
- all files
    - map filename => source code text
- special designaton for README.md
    - description
*/

require("dotenv").config();

async function run() {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  process.exit(0);
}

run();
