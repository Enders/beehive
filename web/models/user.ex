defmodule Beehive.User do
  use Beehive.Web, :model

  import Joken

  @user_token_secret "github-public-repo-what-did-you-expect"

  schema "users" do
    field :email, :string
    field :encrypted_password, :string
    field :username, :string
    field :password, :string, virtual: true
    field :password_confirmation, :string, virtual: true

    has_many :jobs, Beehive.Job

    timestamps
  end

  @required_fields ~w(email username password)
  @optional_fields ~w()

  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
    |> unique_constraint(:email)
    |> validate_format(:email, ~r/@/)
    |> validate_length(:username, min: 1)
    |> validate_length(:username, max: 64)
    |> validate_length(:password, min: 6)
    |> validate_length(:password_confirmation, min: 6)
    |> validate_confirmation(:password)
  end

  #TODO: extract to a token service
  def generate_token(model) do
    %{user_id: model.id}
    |> token
    |> with_signer(hs256(@user_token_secret))
    |> sign
    |> get_compact
  end

  def user_from_token(token, user_id) do
    verify_token(token, user_id) |> user_from_verified_token
  end

  defp user_from_verified_token(%Joken.Token{error: error}) when not is_nil(error) do
    {:ko, :invalid_token}
  end

  defp user_from_verified_token(%Joken.Token{claims: %{"user_id" => user_id }}) do
    case Beehive.Repo.get(Beehive.User, user_id) do
      nil -> { :ko, :user_not_found }
      user -> { :ok, user }
    end
  end

  defp verify_token(signed_token, user_id) do
    signed_token
    |> token
    |> with_validation("user_id", &(&1 == user_id))
    |> with_signer(hs256(@user_token_secret))
    |> verify
  end
end