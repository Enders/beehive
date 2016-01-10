defmodule Beehive.JobControllerTest do
  use Beehive.ConnCase

  alias Beehive.Job
  alias Beehive.User

  @valid_attrs %{max_run: 42, payload: "some content"}
  @invalid_attrs %{}

  setup %{conn: conn} do
    #TODO: how to extract this? Factories?
    user_attributes =  %{ username: "jean-marc",
                          email: "jean.marc@acme.com",
                          password: "foobar",
                          password_confirmation: "foobar" }
    {:ok, user} = Beehive.Repo.insert(User.changeset(%User{}, user_attributes))
    signed_token = User.generate_token(user)

    conn = conn
    |> put_req_header("accept", "application/json")
    |> put_req_header("x-auth-token", signed_token)
    |> put_req_header("x-current-user", "#{user.id}")

    {:ok, conn: conn, user: user}
  end

  test "lists all entries on index", %{conn: conn, user: user} do
    conn = get conn, job_path(conn, :index)
    assert json_response(conn, 200)["jobs"] == []
  end

  # test "shows chosen resource", %{conn: conn} do
  #   job = Repo.insert! %Job{}
  #   conn = get conn, job_path(conn, :show, job)
  #   assert json_response(conn, 200)["data"] == %{"id" => job.id,
  #     "user_id" => job.user_id,
  #     "payload" => job.payload,
  #     "max_run" => job.max_run}
  # end

  # test "does not show resource and instead throw error when id is nonexistent", %{conn: conn} do
  #   assert_error_sent 404, fn ->
  #     get conn, job_path(conn, :show, -1)
  #   end
  # end

  # test "creates and renders resource when data is valid", %{conn: conn} do
  #   conn = post conn, job_path(conn, :create), job: @valid_attrs
  #   assert json_response(conn, 201)["data"]["id"]
  #   assert Repo.get_by(Job, @valid_attrs)
  # end

  # test "does not create resource and renders errors when data is invalid", %{conn: conn} do
  #   conn = post conn, job_path(conn, :create), job: @invalid_attrs
  #   assert json_response(conn, 422)["errors"] != %{}
  # end

  # test "updates and renders chosen resource when data is valid", %{conn: conn} do
  #   job = Repo.insert! %Job{}
  #   conn = put conn, job_path(conn, :update, job), job: @valid_attrs
  #   assert json_response(conn, 200)["data"]["id"]
  #   assert Repo.get_by(Job, @valid_attrs)
  # end

  # test "does not update chosen resource and renders errors when data is invalid", %{conn: conn} do
  #   job = Repo.insert! %Job{}
  #   conn = put conn, job_path(conn, :update, job), job: @invalid_attrs
  #   assert json_response(conn, 422)["errors"] != %{}
  # end

  # test "deletes chosen resource", %{conn: conn} do
  #   job = Repo.insert! %Job{}
  #   conn = delete conn, job_path(conn, :delete, job)
  #   assert response(conn, 204)
  #   refute Repo.get(Job, job.id)
  # end
end
