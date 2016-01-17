defmodule Beehive.JobView do
  use Beehive.Web, :view

  def render("index.json", %{jobs: jobs}) do
    %{jobs: render_many(jobs, Beehive.JobView, "job_base.json")}
  end

  def render("show.json", %{job: job}) do
    %{job: render_one(job, Beehive.JobView, "job.json")}
  end

  def render("job_base.json", %{job: job}) do
    %{id: job.id,
      max_run: job.max_run,
      run_summaries: Beehive.Job.run_summaries(job),
      created_at: job.inserted_at}
  end

  def render("job.json", %{job: job}) do
    %{id: job.id,
      payload: job.payload,
      max_run: job.max_run,
      executions: Enum.map(job.job_executions, fn (job_execution) ->
        %{
          id: job_execution.id,
          result: Poison.decode!(job_execution.result),
          status: Beehive.JobExecution.status_atom(job_execution.status),
          inserted_at: job_execution.inserted_at
        }
      end),
      run_summaries: Beehive.Job.run_summaries(job),
      created_at: job.inserted_at}
  end
end
