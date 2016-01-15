defmodule Beehive.Factory do
  use ExMachina.Ecto, repo: Beehive.Repo

  def factory(:user) do
    %Beehive.User{
      email: sequence(:email, &"email-#{&1}@acme.com"),
      username: "User",
      password: "foobar",
      password_confirmation: "foobar"
    }
  end

  def factory(:job) do
    %Beehive.Job{
      max_run: 1,
      payload: """
        done({result: 42})
      """,
      user: build(:user)
    }
  end

  def factory(:completed_job_execution) do
    %Beehive.JobExecution{
      status: Beehive.JobExecution.status_completed,
      result: "{'result': 42}",
      job: build(:job),
      user: build(:user)
    }
  end

  def factory(:pending_job_execution) do
    %Beehive.JobExecution{
      status: Beehive.JobExecution.status_pending,
      result: nil,
      job: build(:job),
      user: build(:user)
    }
  end

  def factory(:failed_job_execution) do
    %Beehive.JobExecution{
      status: Beehive.JobExecution.status_failed,
      result: nil,
      job: build(:job),
      user: build(:user)
    }
  end
end

