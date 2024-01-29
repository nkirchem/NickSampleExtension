import * as Az from "@microsoft/azureportal-reactview/Az";
import * as React from "react";
import { DefaultButton } from "@fluentui/react";
import { writeSetting, readSettings } from "@microsoft/azureportal-reactview/PersistentStorage";

Az.setTitle("Persistent Storage demo");

export const PersistentStorage = () => {
    const [messages, setMessages] = React.useState([""]);
    const addMessage = (message: string) => setMessages(messages => [...messages, message]);

    return <div>
        <DefaultButton text="Read setting" onClick={() => {
            readSettings("key1").then((value) => addMessage(`Read key1: ${JSON.stringify(value)}`));
        }} />
        <DefaultButton text="Write setting" onClick={() => {
            writeSetting("key1", Date.now().toString()).then(() => addMessage(`Wrote key1`), () => addMessage(`Failed to write key1`));
        }} />
        <DefaultButton text="Write multiple settings" onClick={() => {
            const value = Date.now().toString();
            writeSetting("key1", `${value}-1`).then(() => addMessage(`Wrote key1=value1`), () => addMessage(`Failed to write key1=value1`));
            writeSetting("key1", `${value}-2`).then(() => addMessage(`Wrote key1=value2`), () => addMessage(`Failed to write key1=value2`));
            writeSetting("key2", `${value}-3`).then(() => addMessage(`Wrote key2=value2`), () => addMessage(`Failed to write key1=value3`));
        }} />
        <DefaultButton text="Write same setting" onClick={() => {
            readSettings("key1").then((value) => writeSetting("key1", value["key1"]).then(() => addMessage(`Wrote same value for key1`), () => addMessage(`Failed to write key1`)));
        }} />
        <div>
            <h3>Operations:</h3>
            <pre>
                {messages.join("\n")}
            </pre>
        </div>
    </div>
};

export default PersistentStorage;
