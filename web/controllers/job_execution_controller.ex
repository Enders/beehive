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
        changeset = Ecto.build_assoc(job, :job_executions, %{status: JobExecution.status_pending, user: current_user(conn)})
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

  # def show(conn, %{"id" => id}) do
  #   job_execution = Repo.get!(JobExecution, id)
  #   render(conn, "show.json", job_execution: job_execution)
  # end

  # def index(conn, _params) do
  #   job_executions = Repo.all(JobExecution)
  #   render(conn, "index.json", job_executions: job_executions)
  # end

  def update(conn, %{"id" => id, "job_execution" => job_execution_params}) do
    job_execution = Repo.get!(JobExecution, id)
    changeset = JobExecution.changeset(job_execution, job_execution_params)

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
    job_execution = Repo.get!(JobExecution, id)

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Repo.delete!(job_execution)

    send_resp(conn, :no_content, "")
  end
end
