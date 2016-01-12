defmodule Beehive.JobTest do
  use Beehive.ModelCase

  alias Beehive.Job
  import Beehive.Factory

  test "available jobs: no jobs" do
    assert Job.available_job == nil
  end

  test "available jobs: 1 job, no executions" do
    job = create(:job)

    assert Job.available_job.id == job.id
  end

  test "available_job: 1 job, 1 execution completed, max run == 1" do
    job = create :job, max_run: 1
    create :completed_job_execution, job: job

    assert Job.available_job == nil
  end

  test "available_job: 1 job, 1 execution completed but max run == 2" do
    job = create :job, max_run: 2
    create :completed_job_execution, job: job

    IO.inspect {:available, Job.available_job, job.id}

    assert Job.available_job.id == job.id
  end

  test "available_job: 1 job, 1 pending execution, 1 completed, max run == 2" do
    job = create :job, max_run: 2
    create :completed_job_execution, job: job
    create :timedout_job_execution, job: job

    assert Job.available_job.id == job.id
  end

  test "available_job: timedout execution don't count" do
    job = create :job, max_run: 2
    create :completed_job_execution, job: job
    create :pending_job_execution, job: job

    assert Job.available_job == nil
  end

  test "available_job: 2 jobs, 1 already finished, 1 waiting for execution" do
    job_completed = create :job, max_run: 1
    create :completed_job_execution, job: job_completed

    job_new = create :job, max_run: 1

    assert Job.available_job.id == job_new.id
  end
end