defmodule Beehive.Router do
  use Beehive.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
  end

  pipeline :browser_secure do
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  pipeline :session do
    plug Beehive.Plugs.Session
  end

  pipeline :authenticate do
    plug Beehive.Plugs.Authenticate
  end

  scope "/", Beehive do
    pipe_through :api
    resources "/registration", RegistrationController, only: [:create]
    resources "/session", SessionController, only: [:create, :destroy]
  end

  scope "/api", Beehive do
    pipe_through [:browser, :session]
    resources "/jobs", JobController, only: [] do
      get "payload", JobController, :payload
    end
  end

  scope "/api", Beehive do
    pipe_through [:api, :session, :authenticate]

    resources "/jobs", JobController do
      get "payload", JobController, :payload
    end
    resources "/job_executions", JobExecutionController
  end

  scope "/", Beehive do
    pipe_through [:browser, :browser_secure, :session]
    get "/*path", PageController, :index
  end
end
