defmodule Beehive.Registration do

  import Ecto.Changeset, only: [put_change: 3]
  import Comeonin.Bcrypt, only: [hashpwsalt: 1, checkpw: 2]

  alias Beehive.User

  def create(changeset, repo) do
    changeset
    |> put_change(:encrypted_password, hash_password(changeset.params["password"]))
    |> repo.insert
  end

  def validate_password(email, password, repo) do
    user = repo.get_by(User, email: email)
    if user do
      if checkpw(password, user.encrypted_password) do
        {:ok, user}
      else
        {:ko, :invalid_password}
      end
    else
      { :ko, :unknown_email }
    end
  end

  defp hash_password(password) do
    hashpwsalt password
  end
end