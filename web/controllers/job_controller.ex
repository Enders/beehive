defmodule Beehive.JobController do
  use Beehive.Web, :controller

  alias Beehive.Job

  plug :scrub_params, "job" when action in [:create, :update]

  def index(conn, _params) do
    render(conn, "index.json", jobs: jobs(conn))
  end

  # def create(conn, %{"job" => job_params}) do
  #   changeset = Job.changeset(%Job{}, job_params)

  #   case Repo.insert(changeset) do
  #     {:ok, job} ->
  #       conn
  #       |> put_status(:created)
  #       |> put_resp_header("location", job_path(conn, :show, job))
  #       |> render("show.json", job: job)
  #     {:error, changeset} ->
  #       conn
  #       |> put_status(:unprocessable_entity)
  #       |> render(Beehive.ChangesetView, "error.json", changeset: changeset)
  #   end
  # end

  # def show(conn, %{"id" => id}) do
  #   job = Repo.get!(Job, id)
  #   render(conn, "show.json", job: job)
  # end

  # def update(conn, %{"id" => id, "job" => job_params}) do
  #   job = Repo.get!(Job, id)
  #   changeset = Job.changeset(job, job_params)

  #   case Repo.update(changeset) do
  #     {:ok, job} ->
  #       render(conn, "show.json", job: job)
  #     {:error, changeset} ->
  #       conn
  #       |> put_status(:unprocessable_entity)
  #       |> render(Beehive.ChangesetView, "error.json", changeset: changeset)
  #   end
  # end

  # def delete(conn, %{"id" => id}) do
  #   job = Repo.get!(Job, id)

  #   # Here we use delete! (with a bang) because we expect
  #   # it to always work (and if it does not, it will raise).
  #   Repo.delete!(job)

  #   send_resp(conn, :no_content, "")
  # end

  defp jobs(conn) do
    (current_user(conn) |> Repo.preload(:jobs)).jobs
  end
end