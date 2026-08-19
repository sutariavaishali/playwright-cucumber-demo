module.exports = {
  default: {
    formatOptions: {
      snippetInterface: "async-await"
    },
    paths: ["src/features/*.feature"],
    dryRun: false,
    require: ["src/steps/*.ts"],
    requireModule: ["ts-node/register"],
    format: ["progress", "summary", "html:cucumber-report.html"]
  }
};
