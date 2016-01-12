defmodule Beehive.JobExecution do
  use Beehive.Web, :model

  schema "job_executions" do
    field :result, :string
    field :status, :integer
    belongs_to :user, Beehive.User
    belongs_to :job, Beehive.Job

    timestamps
  end

  @required_fields ~w(result status user_id job_id)
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

  #TODO: find how to do enum constants
  def status_pending, do: 0
  def status_completed, do: 1
  def status_timedout, do: 2
end
