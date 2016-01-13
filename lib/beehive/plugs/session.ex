defmodule Beehive.Plugs.Session do
  import Plug.Conn

  alias Beehive.User

  def init(options) do
    options
  end

  def call(conn, _opts) do
    case (conn |> user_from_conn) do
      {:ok, user} ->
        conn
        |> assign(:current_user, user)
      _ ->
        conn
        |> send_resp(401, "{\"error\":\"unauthorized\"}")
        |> halt
    end
  end

  defp user_from_conn(conn) do
    conn = conn |> fetch_cookies
    if conn.cookies["_beehive_session_token"] && conn.cookies["_beehive_session_user"] do
      conn |> params_from_cookies |> user_from_token
    else
      conn |> params_from_header |> user_from_token
    end
  end

  defp params_from_cookies(conn) do
    %{ user_id: conn.cookies["_beehive_session_user"],
       token: conn.cookies["_beehive_session_token"] }
  end

  defp params_from_header(conn) do
    %{ user_id: List.first(get_req_header(conn, "x-current-user")),
       token: List.first(get_req_header(conn, "x-auth-token"))}
  end

  defp user_from_token(%{user_id: user_id, token: token}) when is_nil(user_id) or is_nil(token) do
    {:ko, :missing_auth_headers }
  end

  defp user_from_token(%{user_id: user_id, token: token}) when is_binary(user_id) do
    { user_id, _ } = Integer.parse user_id
    user_from_token %{user_id: user_id, token: token}
  end

  defp user_from_token(%{user_id: user_id, token: token}) do
    Beehive.User.user_from_token token, user_id
  end
end