module.exports = async function main(context, core) {
  const comment = context.payload.comment.body;
  if (!comment.startsWith("/fastlane")) {
    return;
  }

  const args = comment.replace("/fastlane", "").trim();

  const pr = await fetch(context.payload.issue.pull_request.url).then((res) =>
    res.json()
  );

  const branch = pr.head.ref;

  core.setOutput("args", args);
  core.setOutput("branch", branch);

  console.log([args, branch]);
};
