defmodule Beehive.JobExecutionControllerTest do
  use Beehive.ConnCase

  alias Beehive.JobExecution
  @valid_attrs %{result: "some content", status: 42}
  @invalid_attrs %{}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  test "lists all entries on index", %{conn: conn} do
    conn = get conn, job_execution_path(conn, :index)
    assert json_response(conn, 200)["data"] == []
  end

  test "shows chosen resource", %{conn: conn} do
    job_execution = Repo.insert! %JobExecution{}
    conn = get conn, job_execution_path(conn, :show, job_execution)
    assert json_response(conn, 200)["data"] == %{"id" => job_execution.id,
      "user_id" => job_execution.user_id,
      "job_id" => job_execution.job_id,
      "result" => job_execution.result,
      "status" => job_execution.status}
  end

  test "does not show resource and instead throw error when id is nonexistent", %{conn: conn} do
    assert_error_sent 404, fn ->
      get conn, job_execution_path(conn, :show, -1)
    end
  end

  test "creates and renders resource when data is valid", %{conn: conn} do
    conn = post conn, job_execution_path(conn, :create), job_execution: @valid_attrs
    assert json_response(conn, 201)["data"]["id"]
    assert Repo.get_by(JobExecution, @valid_attrs)
  end

  test "does not create resource and renders errors when data is invalid", %{conn: conn} do
    conn = post conn, job_execution_path(conn, :create), job_execution: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "updates and renders chosen resource when data is valid", %{conn: conn} do
    job_execution = Repo.insert! %JobExecution{}
    conn = put conn, job_execution_path(conn, :update, job_execution), job_execution: @valid_attrs
    assert json_response(conn, 200)["data"]["id"]
    assert Repo.get_by(JobExecution, @valid_attrs)
  end

  test "does not update chosen resource and renders errors when data is invalid", %{conn: conn} do
    job_execution = Repo.insert! %JobExecution{}
    conn = put conn, job_execution_path(conn, :update, job_execution), job_execution: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "deletes chosen resource", %{conn: conn} do
    job_execution = Repo.insert! %JobExecution{}
    conn = delete conn, job_execution_path(conn, :delete, job_execution)
    assert response(conn, 204)
    refute Repo.get(JobExecution, job_execution.id)
  end
end
