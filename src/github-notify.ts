import Octokit from "@octokit/rest";

type Props = {
  owner: string;
  repo: string;
  token: string;
  artifactUrl: string;
  job: string;
  sha: string;
};

export const notifyGithubPr = async ({
  owner,
  repo,
  token,
  artifactUrl,
  job,
  sha
}: Props) => {
  const octokit = new Octokit({ auth: `token ${token}` });
  return octokit.repos.createStatus({
    owner,
    repo,
    sha,
    target_url: artifactUrl,
    state: "success",
    context: `${job} artifact is ready!`,
    description: "Click details to see in the browser."
  });
};
