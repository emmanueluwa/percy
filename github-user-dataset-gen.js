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

const sleep = (milliseconds) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, milliseconds);
  });
};

const chosenRepos = ["ragion", "jobe", "lead-scraper", "pet_friendly_scraper"];

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

async function getFileData(repo, fileName) {
  const response = await fetch(
    `https://api.github.com/repos/emmanueluwa/${repo}/contents/${fileName}`,
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

  return fileCode;
}

async function getAllRepoFiles(repo) {
  const response = await fetch(
    `https://api.github.com/repos/emmanueluwa/${repo}/git/trees/main?recursive=1`,
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
  const dataset = [];

  for (let i in chosenRepos) {
    const repoFiles = await getAllRepoFiles(chosenRepos[i]);
    for (let file of repoFiles.tree) {
      if (
        file.path.startsWith(".") ||
        file.path.includes("__") ||
        !file.path.includes(".") ||
        file.path == "Dockerfile" ||
        file.path == "README.md"
      ) {
        continue;
      } else {
        const fileData = await getFileData(chosenRepos[i], file.path);

        console.log(fileData);
        sleep(7000);
      }
    }
    break;
  }

  process.exit(0);
}

run();
