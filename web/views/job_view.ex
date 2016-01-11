defmodule Beehive.JobView do
  use Beehive.Web, :view

  def render("index.json", %{jobs: jobs}) do
    %{jobs: render_many(jobs, Beehive.JobView, "job.json")}
  end

  def render("show.json", %{job: job}) do
    %{job: render_one(job, Beehive.JobView, "job.json")}
  end

  def render("job.json", %{job: job}) do
    %{id: job.id,
      payload: job.payload,
      max_run: job.max_run,
      created_at: job.inserted_at}
  end
end
