defmodule Beehive.UserTest do
  use Beehive.ModelCase

  alias Beehive.User

  @valid_attrs %{ username: "jean-marc",
                  email: "jean.marc@acme.com",
                  password: "foobar",
                  password_confirmation: "foobar" }
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = User.changeset(%User{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = User.changeset(%User{}, @invalid_attrs)
    refute changeset.valid?
  end

  test "user_from_token: validate a token and retrieve model" do
    {:ok, user} = Beehive.Repo.insert(User.changeset(%User{}, @valid_attrs))
    signed_token = User.generate_token(user)
    {:ok, retrieved_user} = User.user_from_token(signed_token, user.id)
    assert user.id == retrieved_user.id
  end

  test "user_from_token: handle crafted tokens" do
    {:ok, user} = Beehive.Repo.insert(User.changeset(%User{}, @valid_attrs))
    assert {:ko, :invalid_token} == User.user_from_token("pouet", user.id)
  end
end
