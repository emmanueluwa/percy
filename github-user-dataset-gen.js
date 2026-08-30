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

// curl -L \
//   -H "Accept: application/vnd.github.object" \
//   -H "Authorization: Bearer <YOUR-TOKEN>" \
//   -H "X-GitHub-Api-Version: 2026-03-10" \
//   https://api.github.com/repos/OWNER/REPO/contents/PATH

/*
{
  "TITLE": <string>,
  "README": <string>,
  "FILENAME": <string>,
  "CODE": <string>
}
*/
async function getRepoReadme() {
  const response = await fetch(
    "https://api.github.com/repos/emmanueluwa/ragion/readme",
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

async function getAllRepoFiles() {
  const response = await fetch(
    "https://api.github.com/repos/emmanueluwa/ragion/contents/README.md",
    {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "X-GitHub-Api-Version": "2026-03-10",
      },
    },
  );

  const fileData = await response.json();

  console.log(fileData);

  return [];
}

async function run() {
  const response = await fetch("https://api.github.com/user/repos", {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      "X-GitHub-Api-Version": "2026-03-10",
    },
  });

  const dataset = [];

  const repoData = await response.json();

  for (let repo of repoData) {
    const datasetItem = {
      TITLE: repo.description,
    };

    const readmeData = await getRepoReadme();
    // const files = await getAllRepoFiles();
    // for (let file in files) {
    //   break;
    // }

    break;
  }

  process.exit(0);
}

run();
