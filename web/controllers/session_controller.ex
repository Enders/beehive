defmodule Beehive.SessionController do
  use Beehive.Web, :controller

  def create(conn, %{"session" => session_params}) do
    case sign_in(conn, session_params) do
      {:ok, user} ->
        token = User.generate_token(user)
        conn
          |> put_status(:ok)
          |> put_resp_cookie("_beehive_session_token", token, max_age: 15*24*3600)
          |> put_resp_cookie("_beehive_session_user", Integer.to_string(user.id), max_age: 15*24*3600)
          |> render(Beehive.UserView, "signin.json", user: user, token: token)
      {:ko, _} ->
        conn
          |> put_status(:unprocessable_entity)
          |> json(%{errors: [ %{field: "password", detail: "Email/password do not match any user." }]})
    end
  end

  def destroy(conn, _params) do
  end

  defp sign_in(conn, session_params) do
    case current_user(conn) do
      nil ->
        Beehive.Registration.validate_password session_params["email"],
                                               session_params["password"],
                                               Beehive.Repo
      user ->
        {:ok, user}
    end
  end
end