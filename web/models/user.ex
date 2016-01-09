defmodule Beehive.User do
  use Beehive.Web, :model

  import Joken

  schema "users" do
    field :email, :string
    field :encrypted_password, :string
    field :username, :string
    field :password, :string, virtual: true
    field :password_confirmation, :string, virtual: true
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

  def generate_token(model) do
    %{user_id: model.id}
    |> token
    |> with_signer(hs256("github-public-repo-what-did-you-expect"))
    |> sign
    |> get_compact
  end
end