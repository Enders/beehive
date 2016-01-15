defmodule Beehive.JobController do
  use Beehive.Web, :controller

  alias Beehive.Job

  plug :scrub_params, "job" when action in [:create, :update]

  def index(conn, _params) do
    render(conn, "index.json", jobs: jobs(conn))
  end

  def create(conn, %{"job" => job_params}) do
    changeset = Ecto.build_assoc(current_user(conn), :jobs, create_job_params(job_params))

    case Repo.insert(changeset) do
      {:ok, job} ->
        conn
        |> put_status(:created)
        |> put_resp_header("location", job_path(conn, :show, job))
        |> render("show.json", job: job)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Beehive.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    job = Repo.get!(Job, id)
    render(conn, "show.json", job: job)
  end

  def payload(conn, %{"job_id" => id}) do
    conn
    |> put_resp_content_type("application/javascript")
    |> render("payload.js", payload: job(conn, id).payload)
  end

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

  def delete(conn, %{"id" => id}) do
    conn |> job(id) |> Repo.delete!

    send_resp(conn, :no_content, "")
  end

  defp create_job_params(job_params) do
    max_run = case Integer.parse(job_params["max_run"]) do
      {value, _} -> value
      _ -> 1
    end
    %{payload: job_params["payload"], max_run: max_run}
  end

  defp jobs(conn) do
    (current_user(conn) |> Repo.preload(:jobs)).jobs
  end

  defp job(conn, id) do
    (from job in Job, where: job.user_id == ^(current_user(conn).id))
    |> Repo.get!(id)
  end
end
