defmodule Beehive.RegistrationController do
  use Beehive.Web, :controller

  def create(conn, %{"user" => user_params}) do
    changeset = User.changeset(%User{}, user_params)

    case Beehive.Registration.create(changeset, Beehive.Repo) do
      {:ok, user} ->
        conn
          |> put_status(:ok)
          |> render(Beehive.UserView, "signin.json", user: user, token: User.generate_token(user))
      {:error, changeset } ->
        conn
          |> put_status(:unprocessable_entity)
          |> render(Beehive.ChangesetView, "error.json", changeset: changeset)
    end
  end
end