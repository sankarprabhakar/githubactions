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

    