defmodule Beehive.JobExecutionView do
  use Beehive.Web, :view

  def render("index.json", %{job_executions: job_executions}) do
    %{job_executions: render_many(job_executions, Beehive.JobExecutionView, "job_execution.json")}
  end

  def render("show.json", %{job_execution: job_execution}) do
    %{job_execution: render_one(job_execution, Beehive.JobExecutionView, "job_execution.json")}
  end

  def render("job_execution.json", %{job_execution: job_execution}) do
    %{id: job_execution.id,
      job: %{
        id: job_execution.job.id,
        payload_url: Beehive.JobExecution.payload_url(job_execution)
      },
      result: job_execution.result,
      status: job_execution.status}
  end
end
