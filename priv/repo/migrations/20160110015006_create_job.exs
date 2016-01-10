defmodule Beehive.Repo.Migrations.CreateJob do
  use Ecto.Migration

  def change do
    create table(:jobs) do
      add :payload, :text
      add :max_run, :integer
      add :user_id, references(:users, on_delete: :nothing)

      timestamps
    end
    create index(:jobs, [:user_id])

  end
end
