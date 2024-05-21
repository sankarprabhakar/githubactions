# GitHub Actions

## Workflow
    * Are automated process that will run one or more job.  Workflows triggered on an event

## Event Triggers
* 35+ Event triggers - common ones are
    * Push
    * Pull Request
    * Issues
    * Releases
    * Scheduled events
    * Manual Triggers
    * From outside the github by triggering a repository_dispatch event.

## Workflow components
    * Actions   : Reusable tasks which perform specific job within the workflow.
    * workflow  : Automated process that will run multiple jobs.
    * Jobs      : Group of steps which runs in a same runner.  Jobs runs in parallel unless  
                 configure to run serially.
    * Step      : Individual tasks or actions with in the job which runs sequentially.
    * Runs      : Instance of a worklow execution.
    * Runners   : Servers that host environment where the jobs are run. Two types - github hosted 
                  and self-hosted.
    * Marketplace: Place where you can purchase reusable actions.
    * Name : Name of the workflow. It appears in left pane.

## Scheduled workflow trigger:

### Cron String understanding
    *   Cron string explanation "*(minutes) *(hour) *(Day) *(Month) *(Day of week) "
    *   Asterisk (*): Matches every value of the field.
        Comma (,): Separates multiple values.
        Hyphen (-): Specifies a range of values.
        Slash (/): Specifies increments of values.
        L: Last day of the month or last weekday (e.g., L in the day of the month field or 5L for the last Friday).
        W: Nearest weekday (e.g., 15W means the nearest weekday to the 15th of the month).
        #: Specifies the nth occurrence of a day of the week (e.g., 3#2 for the second Wednesday of the month).

## Muliple events:
    *   multi event can be configured in the "on" part of workflow.
    *   If more than one event occurs at same time, it will trigger multiple parallel runs.
    Eg: 
    ```
    name: Multi event
    on:
        push:
            branches:
                - main
        pull_request:
            branches:
                - main
    jobs:
        build-on:
            runs-on: ubuntu-latest
            steps:
                -name: Setup Env
                 run: echo "This is setup eng
    ```

## Manual Trigger
    *   Triggered manually from UI or REST API or CLI
    *   Event ```workflow_dispatch``` as the work flow trigger
    *   ```workflow_dispatch``` can take input parameters.
    *   ```gh workflow run yml_name.yml -f input -f input -f input```
    *   For triggering from Rest API, a github token need to be generated and set in GITHUB_TOKEN   
        env
    * Trigger from GH : gh workflow run manual_trigger.yml -f greetings=Hello -f nameofperson=Karthik


## Webhooks
    *   Webhooks are public facing  HTTP APIs to which request can be send to generate event 
        to trigger workflow. Access to APIs need authentication.
    *   To trigger a workflow from external sources, the workflow need to have a    
        'repository_dispatch" event of type "webhook".
    *   Can be triggered by '''curl -X POST -H "Accept: application/vnd.github.v3+json" -H "Authorization: token PAT" -d '{"event_type":"webhook", "client_payload": {"Key":"Value"}}' https://api.github.com/repos/sankarprabhakar/githubactions/dispatches''' via curl.


## Conditional keyword for steps:
    *   jobs.<job id>.if can be used to stop a step from execution unless the condition is met.
    *   eg: if: github.repo == <xyz>
                <run statement>


## Expressions:
    * Functions:
        * contains(SearchString, Value)
        * startswith(searchstring,searchValue)
        * endswith(searchstring,searchvalue)
        * format(string,val, val2 ) -- Eg: format("Hello world {0} {1}", "Sankar", "WDC")
        * join(array, separator) -> to join the items in array
        * tojson(value)
        * fromjson(value)
        * hashFiles()
    * Status check functions
        * success
        * failure
        * cancelled
        * always
## Runners:
    * GitHub hosted
    * Self hosted
    * runner is specified in runs-on:
      Eg:
      '''
      runs-on: ubuntu-latest
      runs-on: windows-latest
      runs-on: macos-latest

      runs-on: [ubuntu-latest,windows-latest,macos-latest] # runs on any of the runner

      runs-on: [self-hosted]
      '''
    * To make a self-hoster runner we need to add github action runner in the machine. 


## Workflow commands
    Actions can
    * Communicate with runner to set environment variable : Set something to env variable
    * output values that used by another job or actions 
    * Adding to system path
    * Output debug message ::debug::
    * Group log messaging  ::group:: & ::endgroup::
    * Masking values in logs ::add-mask::
    * Stop and fail an action using ::error::

## Workflow context
    * Context are way to access the workflow runs, variables, runner enviornment, jobs, steps.
    * Each context is an object containing string or other objects.
    * You can access the context via $ {{ context }}
    * Some of the available contexts
        * github
        * env 
        * vars :: 
        * jobs:
        * steps:
        * Runner
        * secrets
        * stragegy
        * matrix
        * needs
        * inputs
    
## Dependent jobs:
    *   Workflow run is made of one or more jobs.
    *   Jobs can run in parallel, but we can make it sequency be defining dependency
        * jobs.jobid.needs
        * job.jobid.if


## Encrypted scret:
    * Encrypted screts are variables that you passes to the GitHub workflow
    * Accessed via ${{secret.MY_SECRET}}
    * Different levels of secrets:
        * Org
        * Repo
        * Environment
    * We can set secret from gh cli
        *   gh secret set SECRET_NAME - value need to be entered in prompt)
        *   gh secret --env ENV_SECRET_NAME

        *   gh secret --org ORG_SECRET_NAME ( gh auth login --scopes:"admin:org")
## Configuration Variables:
    * Vars are used to pass non-sensitive information to github workflows
    * Different level
        * Org
        * Repo
        * env
    * Can be set using gh command line

## Default env vars:
    * Variables that are set by Github, and that can be used in github workflows.
    * Eg: GITHUB_ACTIONS
## setting custom envars
    * Env can be set at 3 levels
        * workflow level
        * Job level
        * step level
    * Can be accessed  via env varibale for using it in if statements.
    * GitHub also allows us to set the env dynamically by using GITHUB_ENV variable.

## GITHUB_TOKEN
    * GitHub Creates a token at start of every workflow. This token can be used in the workflow for authorizations.
## Add script to workflow
    * Bash or power shell scripts can be executed from github actions
    * At job level, workspace path can be set and any scripts present there can be invoked
      ``` 
      jobs:
        job-name:
            runs-on: ubuntu-latest
            defaults:
                run:
                    working-directory: Scripts
            steps:
                - name: name
                  run : ./test.sh
      ```

## Publish github package using a workflow
    * github can build and publish packages
    * Below actions to be used
        * docker/login-action
        * docker/meta-data-action
        * docker/build-push-action

## Publish docker hub registry using workflow
    * same as publish to github package build and publish
    * Docker credential to be be used

## Publish github container registry using workflow
    * Below are the actions to be used
        * docker/login-action
        * docker/meta-data-action
        * docker/build-push-action
## Publish component as github release
    * actions/create-release
    * actions/upload-release-assets
## Deploy release to cloud provide
    * Azure
    * Google kubernetes engine
    * ECS
    * azure/static-web-apps-deploy

## Service Containers
    * Service containers are docker containers that provide simple and portable way for you to host services that may be need to test and operation your application in the workflow.
    * Service container can be configured for each workflow.
    * Github creates docker contained that are configured in the workflow and delets it when job completed
    * Each step can communicae wiht service contained configured in the workflow
    * composite action cannot use docker container.
    * if job used docker contained, job contained, service container then runner must be linux one.
    * Workflow can be configured to run on runner or docker container.
    ```
    name: redis container example
    on: push
    jobs:
        container-job:
        runs-on: ubuntu-later
        container: node-16: bullseye
        services:
            redis:
                image:redis
    ```
    * Serice container in host mode
     ```
    name: redis container example
    on: push
    jobs:
        runner-job:
        runs-on: ubuntu-later
        services:
            redis:
                image:redis
                host: 45545:45546
    ```
## Routing workflow to a runner
    * Self hosted runner can be added with specific labels.
    * Mulitple labels are possible to denote note capability - like linux, centos, x64, etc.
    * Runner matching all the criteria specified in runs-on criteria will be picked ( cumulative)
    * Enterprise accounts can group the runners.
## Code-QL:
    * CodeQL : Helps to analyzer code and fix security issues
    * github/codeql-action/init 
    * github/codeql-action/analyze

## Caching package and dependencies
    * To make workflow run faster we can cache file in the workflows.
    * workflow uses the same artifacts in every runs . Caching makes the execution faster.
    * eg:
    ``` uses : setup-ruby@v1
        bundler-cache: yes
    ```
## Caching Job dependencies and Build outputs
    * Caching build dependencies and build output makes the workflow faster.
    * actions/cache@V1
    * above actions outputs cache hit or miss
## Remove workflow artifacts from github
    * From UI
## Workflow status badge
    * Displaying status of workflow in repo
    * This is achieved by placing special url in the Readme file
## ENV protections
    * You can configure env with protection rules in a runner
    ``` environment : production ```
## Job matrix configuration
    * single job configure to take create multiple jobs.
    

