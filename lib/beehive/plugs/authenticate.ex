defmodule Beehive.Plugs.Authenticate do
  import Plug.Conn

  alias Beehive.User

  def init(options) do
    options
  end

  def call(conn, _opts) do
    case conn.assigns[:current_user] do
      nil ->
        conn
        |> send_resp(401, "{\"error\":\"unauthorized\"}")
        |> halt
      _ ->
        conn
    end
  end
end