defmodule Beehive.Job do
  use Beehive.Web, :model

  schema "jobs" do
    field :payload, :string
    field :max_run, :integer
    belongs_to :user, Beehive.User

    timestamps
  end

  @required_fields ~w(payload max_run)
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
end