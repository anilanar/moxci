import Octokit from "@octokit/rest";

type Props = {
  owner: string;
  repo: string;
  token: string;
  artifactUrl: string;
  sha: string;
};

export const notifyGithubPr = async ({
  owner,
  repo,
  token,
  artifactUrl,
  sha
}: Props) => {
  const octokit = new Octokit({ auth: `token ${token}` });
  return octokit.repos.createStatus({
    owner,
    repo,
    sha,
    target_url: artifactUrl,
    state: "success",
    context: "Storybook is ready!",
    description: "Click details to go to the storybook."
  });
};
