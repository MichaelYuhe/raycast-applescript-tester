import { Action, ActionPanel, Form, showHUD } from "@raycast/api";
import { runAppleScript } from "@raycast/utils";
import { useState } from "react";

export default function Command() {
  const [script, setScript] = useState("");
  const [params, setParams] = useState<Record<string, string>>({});
  const [paramCount, setParamCount] = useState(0);

  const handleSubmit = async () => {
    let scriptWithParams = script;
    Object.entries(params).forEach(([key, value]) => {
      scriptWithParams = scriptWithParams.replace(new RegExp(`{${key}}`, "g"), value);
    });

    const res = await runAppleScript(scriptWithParams);
    await showHUD(res);
  };

  const addParam = () => {
    const newKey = `Param ${paramCount + 1}`;
    setParams((prev) => ({ ...prev, [newKey]: "" }));
    setParamCount((prev) => prev + 1);
  };

  const removeParam = () => {
    const keys = Object.keys(params);
    const lastKey = keys[keys.length - 1];
    setParams((prev) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [lastKey]: _, ...rest } = prev;
      return rest;
    });
    setParamCount((prev) => prev - 1);
  };

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Submit" onSubmit={handleSubmit} />
          <Action title="Add Parameter" shortcut={{ modifiers: ["cmd"], key: "n" }} onAction={addParam} />
          <Action title="Remove Parameter" shortcut={{ modifiers: ["cmd"], key: "d" }} onAction={removeParam} />
        </ActionPanel>
      }
    >
      <Form.TextArea
        id="script"
        title="AppleScript"
        placeholder="Enter your AppleScript here..."
        onChange={(value) => setScript(value)}
        value={script}
      />

      <Form.Separator />

      {Object.entries(params).map(([key, value]) => (
        <Form.TextField
          key={key}
          id={key}
          title={`${key}`}
          value={value}
          onChange={(newValue) => setParams((prev) => ({ ...prev, [key]: newValue }))}
        />
      ))}
    </Form>
  );
}
