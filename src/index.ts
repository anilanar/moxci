import { getArtifactUrl } from "./get-artifact";
import { notifyGithubPr } from "./github-notify";

type Options = {
  message: string;
};

export const moxci = async (targetPath: string, options: Options) => {
  const {
    CIRCLE_BUILD_NUM,
    GITHUB_TOKEN,
    CIRCLE_TOKEN,
    CIRCLE_PROJECT_USERNAME,
    CIRCLE_PROJECT_REPONAME,
    CIRCLE_SHA1,
    CIRCLE_JOB
  } = process.env;

  // Validation

  if (!CIRCLE_PROJECT_USERNAME) {
    console.error("Cannot find project username");
    return;
  }

  if (!CIRCLE_PROJECT_REPONAME) {
    console.error("Cannot find project reponame");
    return;
  }

  if (!CIRCLE_BUILD_NUM) {
    console.error("Cannot find build number");
    return;
  }

  if (!CIRCLE_TOKEN) {
    console.error("The environment variable CIRCLE_TOKEN must be required");
    return;
  }

  if (!CIRCLE_SHA1) {
    console.error("Cannot find commit SHA");
    return;
  }

  const circleciApiUrl = `https://circleci.com/api/v1.1/project/github/${CIRCLE_PROJECT_USERNAME}/${CIRCLE_PROJECT_REPONAME}/${CIRCLE_BUILD_NUM}/artifacts?circle-token=${CIRCLE_TOKEN}`;
  const artifactUrl = await getArtifactUrl(circleciApiUrl, targetPath);

  // Github
  if (GITHUB_TOKEN) {
    notifyGithubPr({
      owner: CIRCLE_PROJECT_USERNAME,
      repo: CIRCLE_PROJECT_REPONAME,
      sha: CIRCLE_SHA1,
      token: GITHUB_TOKEN,
      job: CIRCLE_JOB || "#unknown",
      artifactUrl
    });
  } else {
    console.log("Github Token is not set or invalid");
  }
};
