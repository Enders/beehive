defmodule Beehive.Router do
  use Beehive.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
    plug Beehive.Plugs.Session
  end

  pipeline :api do
    plug :accepts, ["json"]
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
    pipe_through [:api, :authenticate]

    resources "/jobs", JobController
    resources "/job_executions", JobExecutionController
  end

  scope "/", Beehive do
    pipe_through :browser
    get "/*path", PageController, :index
  end
end
