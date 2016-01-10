defmodule Beehive.Plugs.Token do
  import Plug.Conn

  alias Beehive.User

  def init(options) do
    options
  end

  def call(conn, _opts) do
    case (conn |> token_params |> user_from_token) do
      {:ok, user} ->
        conn
        |> assign(:current_user, user)
      _ ->
        conn
        |> send_resp(401, "{\"error\":\"unauthorized\"}")
        |> halt
    end
  end

  defp token_params(conn) do
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