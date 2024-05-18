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

# Scheduled workflow trigger:

### Cron String understanding
    *   Cron string explanation "*(minutes) *(hour) *(Day) *(Month) *(Day of week) "
    *   Asterisk (*): Matches every value of the field.
        Comma (,): Separates multiple values.
        Hyphen (-): Specifies a range of values.
        Slash (/): Specifies increments of values.
        L: Last day of the month or last weekday (e.g., L in the day of the month field or 5L for the last Friday).
        W: Nearest weekday (e.g., 15W means the nearest weekday to the 15th of the month).
        #: Specifies the nth occurrence of a day of the week (e.g., 3#2 for the second Wednesday of the month).