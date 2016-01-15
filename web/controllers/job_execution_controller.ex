defmodule Beehive.JobExecutionController do
  use Beehive.Web, :controller

  alias Beehive.Job
  alias Beehive.JobExecution

  plug :scrub_params, "job_execution" when action in [:update]


  def create(conn, _) do
    case Job.available_job do
      nil ->
        conn
        |> put_status(:unprocessable_entity)
        |> json(%{error: :no_available_job})
      job ->
        changeset = Ecto.build_assoc(job, :job_executions, %{status: JobExecution.status_pending, user_id: current_user(conn).id})
        case Repo.insert(changeset) do
          {:ok, job_execution} ->
            job_execution = Repo.preload job_execution, :job
            conn
            |> put_status(:created)
            |> put_resp_header("location", job_execution_path(conn, :show, job_execution))
            |> render("show.json", job_execution: job_execution)
          {:error, changeset} ->
            conn
            |> put_status(:unprocessable_entity)
            |> render(Beehive.ChangesetView, "error.json", changeset: changeset)
        end
    end
  end

  def update(conn, %{"id" => id, "job_execution" => job_execution_params}) do
    job_execution = conn |> job_execution(id)

    params = if job_execution_params["status"] == "ok" do
      %{ status: JobExecution.status_completed,
         result: Poison.encode!(job_execution_params["result"])}
    else
      %{}
    end

    changeset = JobExecution.changeset(job_execution, params)

    case Repo.update(changeset) do
      {:ok, job_execution} ->
        render(conn, "show.json", job_execution: job_execution)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Beehive.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    conn |> job_execution(id) |> Repo.delete!

    send_resp(conn, :no_content, "")
  end

  defp job_execution(conn, id) do
    (from job_execution in JobExecution, where: job_execution.user_id == ^(current_user(conn).id))
    |> Repo.get!(id)
    |> Repo.preload(:job)
  end
end
