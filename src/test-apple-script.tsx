import { Action, ActionPanel, Form, showHUD } from "@raycast/api";
import { runAppleScript } from "@raycast/utils";
import { useState } from "react";

export default function Command() {
  const [script, setScript] = useState("");

  const handleSubmit = async () => {
    const res = await runAppleScript(script);
    await showHUD(res);
  };

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Submit" onSubmit={handleSubmit} />
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
    </Form>
  );
}
