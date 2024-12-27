import { Flag, Command } from "$cli";
import { createCommand, createApplication } from "$helpers";

function cli() {
  const flags: Flag[] = [
    new Flag("string", "name", "name of something", true),
    new Flag("string", "type", "type of something", true),
  ];

  const subCommands: Command[] = [
    createCommand(
      "list",
      "list something",
      function (args?: Record<string, any>) {
        if (!args) {
          console.error("Error: --name is required for the list command.");
          return;
        }

        if (!args.name) {
          console.error("Error: --name is required for the list command.");
          return;
        }

        console.log(
          `Listed items for: ${args.name}${
            args.type ? ` (Type: ${args.type})` : ""
          }`
        );
      }
    ),
    createCommand(
      "remove",
      "remove something",
      function (args?: Record<string, any>) {
        if (!args) {
          console.error("Error: --name is required for the remove command.");
          return;
        }

        if (!args.name) {
          console.error("Error: --name is required for the remove command.");
          return;
        }

        console.log(
          `Removed item: ${args.name}${
            args.type ? ` (Type: ${args.type})` : ""
          }`
        );
      }
    ),
    createCommand(
      "add",
      "add something",
      function (args?: Record<string, any>) {
        if (!args) {
          console.error("Error: --name is required for the add command.");
          return;
        }
        if (!args.name) {
          console.error("Error: --name is required for the add command.");
          return;
        }

        console.log(
          `Added item: ${args.name}${args.type ? ` (Type: ${args.type})` : ""}`
        );
      }
    ),
  ];

  const root = createApplication("application", "", subCommands, flags);

  root.run(Deno.args);

  return;
}

if (import.meta.main) {
  cli();
}
