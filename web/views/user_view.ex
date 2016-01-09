defmodule Beehive.UserView do
  use Beehive.Web, :view

  def render("show.json", %{user: user}) do
    %{ id: user.id,
       username: user.username,
       email: user.email }
  end

  def render("signin.json", %{user: user, token: token}) do
    %{ user: render("show.json", %{user: user}),
       token: token }
  end
end