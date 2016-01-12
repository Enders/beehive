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
      status: 1,
      result: "{'result': 42}",
      job: build(:job),
      user: build(:user)
    }
  end

  def factory(:pending_job_execution) do
    %Beehive.JobExecution{
      status: 0,
      result: nil,
      job: build(:job),
      user: build(:user)
    }
  end

  def factory(:timedout_job_execution) do
    %Beehive.JobExecution{
      status: 2,
      result: nil,
      job: build(:job),
      user: build(:user)
    }
  end
end

