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

/*
{
  "TITLE": <string>,
  "README": <string>,
  "FILENAME": <string>,
  "CODE": <string>
}
*/
const chosenRepos = ["jobe", "ragion", "lead-scraper", "pet_friendly_scraper"];

async function getRepoReadme(repoName) {
  const response = await fetch(
    `https://api.github.com/repos/emmanueluwa/${repoName}/readme`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "X-GitHub-Api-Version": "2026-03-10",
      },
    },
  );

  const readmeData = await response.json();

  const decodedString = Buffer.from(readmeData.content, "base64").toString(
    "utf-8",
  );
  console.log(decodedString);

  return [];
}

async function getFileData(repoName, fileName) {
  const response = await fetch(
    `https://api.github.com/repos/emmanueluwa/${repoName}/contents/${fileName}`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "X-GitHub-Api-Version": "2026-03-10",
      },
    },
  );

  const fileContent = await response.json();

  const fileCode = Buffer.from(fileContent.content, "base64").toString("utf-8");
  console.log(fileCode);

  return [];
}

async function getAllRepoFiles() {
  const response = await fetch(
    "https://api.github.com/repos/emmanueluwa/ragion/git/trees/main?recursive=1",
    {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "X-GitHub-Api-Version": "2026-03-10",
      },
    },
  );

  const fileData = await response.json();

  return fileData;
}

/*
What am i trying to do?

I need to get the repos based on the chosen repos array

for EACH repo i need to get ALL the files

*/

async function run() {
  // const response = await fetch(
  //   "https://api.github.com/user/repos?per_page=100&page=2",
  //   {
  //     headers: {
  //       Accept: "application/vnd.github+json",
  //       Authorization: `Bearer ${GITHUB_TOKEN}`,
  //       "X-GitHub-Api-Version": "2026-03-10",
  //     },
  //   },
  // );
  // const repoData = await response.json();

  const dataset = [];

  const repoFiles = await getAllRepoFiles();

  for (let file of repoFiles.tree) {
    console.log(file.path);
  }

  process.exit(0);
}

run();
