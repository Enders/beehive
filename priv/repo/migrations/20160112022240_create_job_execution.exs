defmodule Beehive.Repo.Migrations.CreateJobExecution do
  use Ecto.Migration

  def change do
    create table(:job_executions) do
      add :result, :text
      add :status, :integer
      add :user_id, references(:users, on_delete: :nothing)
      add :job_id, references(:jobs, on_delete: :nothing)

      timestamps
    end
    create index(:job_executions, [:user_id])
    create index(:job_executions, [:job_id])

  end
end
