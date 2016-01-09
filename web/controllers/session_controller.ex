defmodule Beehive.SessionController do
  use Beehive.Web, :controller

  def create(conn, %{"session" => session_params}) do
    validation = Beehive.Registration.validate_password session_params["email"],
                                                        session_params["password"],
                                                        Beehive.Repo

    case validation do
      {:ok, user} ->
        conn
          |> put_status(:ok)
          |> render(Beehive.UserView, "signin.json", user: user, token: User.generate_token(user))
      {:ko, _} ->
        conn
          |> put_status(:unprocessable_entity)
          |> json(%{errors: [ %{field: "password", detail: "Email/password do not match any user." }]})
    end
  end

  def destroy(conn, _params) do
  end
end