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

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

async function run() {
  const response = await fetch("https://api.github.com/user/repos", {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      "X-GitHub-Api-Version": "2026-03-10",
    },
  });

  const repoData = await response.json();

  console.log(repoData);

  process.exit(0);
}

run();
