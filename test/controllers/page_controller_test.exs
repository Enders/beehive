defmodule Beehive.PageControllerTest do
  use Beehive.ConnCase

  test "GET /", %{conn: conn} do
    conn = get conn, "/"
    assert html_response(conn, 200) =~ "Welcome to Beehive!"
  end
end
