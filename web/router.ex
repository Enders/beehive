defmodule Beehive.Router do
  use Beehive.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", Beehive do
    pipe_through :api
    resources "/registration", RegistrationController, only: [:create]
    resources "/session", SessionController, only: [:create, :destroy]
  end

  scope "/api", Beehive do
    pipe_through [:api]
  end

  scope "/", Beehive do
    pipe_through :browser
    get "/*path", PageController, :index
  end
end
