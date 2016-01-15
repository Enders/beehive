defmodule Beehive.Job do
  use Beehive.Web, :model

  alias Beehive.Job
  alias Beehive.JobExecution
  alias Beehive.Repo

  import Ecto.Query

  schema "jobs" do
    field :payload, :string
    field :max_run, :integer
    belongs_to :user, Beehive.User
    has_many :job_executions, JobExecution, on_delete: :delete_all
    timestamps
  end

  @required_fields ~w(payload max_run user_id)
  @optional_fields ~w()

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
  end

  def available_job do
    Job
    |> join(:left, [jobs], job_executions in JobExecution, job_executions.job_id == jobs.id and
                                                           job_executions.status in [0,1])
    |> group_by([jobs, ], jobs.id)
    |> having([jobs, job_executions], count(job_executions.id) < jobs.max_run)
    |> limit(1)
    |> Repo.all
    |> List.first
  end

  def run_summaries(job) do
    JobExecution
    |> where([job_executions], job_executions.job_id == ^job.id)
    |> select([job_executions], [job_executions.status, count(job_executions.id)])
    |> group_by([job_executions], job_executions.status)
    |> Repo.all
    |> Enum.map(fn([status, count]) ->
      [JobExecution.status_atom(status), count]
    end)
  end
end