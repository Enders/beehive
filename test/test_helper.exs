ExUnit.start

Mix.Task.run "ecto.create", ~w(-r Beehive.Repo --quiet)
Mix.Task.run "ecto.migrate", ~w(-r Beehive.Repo --quiet)
Ecto.Adapters.SQL.begin_test_transaction(Beehive.Repo)

