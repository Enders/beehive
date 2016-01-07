defmodule Beehive.PageController do
  use Beehive.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
