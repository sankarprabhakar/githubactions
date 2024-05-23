const core = require('@actions/core');
const github = require('@actions/github');

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('name');
  console.log(`Hello ${name}!`);
  const out_str = `Hello ${name}!`
  //const time = (new Date()).toTimeString();
  core.setOutput("greeting", out_str);
  // Get the JSON webhook payload for the event that triggered the workflow
  //const payload = JSON.stringify(github.context.payload, undefined, 2)
   //console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}