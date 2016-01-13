defmodule Beehive.RegistrationController do
  use Beehive.Web, :controller

  def create(conn, %{"user" => user_params}) do
    changeset = User.changeset(%User{}, user_params)

    case Beehive.Registration.create(changeset, Beehive.Repo) do
      {:ok, user} ->
        token = User.generate_token(user)
        conn
          |> put_status(:ok)
          |> put_resp_cookie("_beehive_session_token", token, max_age: 15*24*3600)
          |> put_resp_cookie("_beehive_session_user", Integer.to_string(user.id), max_age: 15*24*3600)
          |> render(Beehive.UserView, "signin.json", user: user, token: User.generate_token(user))
      {:error, changeset } ->
        conn
          |> put_status(:unprocessable_entity)
          |> render(Beehive.ChangesetView, "error.json", changeset: changeset)
    end
  end
end