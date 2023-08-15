import * as Az from "@microsoft/azureportal-reactview/Az";
import * as React from "react";
import { Resources } from "./Resources.resjson";
import { StatusBarType, dismissStatusBar, showStatusBar } from "@microsoft/azureportal-reactview/StatusBar";
import { TagsByResource, TargetItem } from "@microsoft/azureportal-reactview/TagsByResource";
import { DefaultButton, TextField } from "@fluentui/react";
import { writeSetting, readSettings } from "@microsoft/azureportal-reactview/PersistentStorage";

Az.setTitle(Resources.HelloWorldTitle);

export const HelloWorld2 = () => {
    const lastStorageTime = React.useRef(localStorage.getItem("lastStorageTime"));
    const newStorageTime = Date.now().toString();
    localStorage.setItem("lastStorageTime", newStorageTime);

    return <div>
        <div>Last storage time: {lastStorageTime.current}</div>
        <div>New storage time: {newStorageTime}</div>
    </div>
};

export const HelloWorld = () => {
    const [resourcesText, setResourcesText] = React.useState<string>(`[
    { "id": "resourceId", "displayName": "Resource name", "count": 1 }
]`);
    const [resources, setResources] = React.useState<TargetItem[]>([]);

    dismissStatusBar();
    showStatusBar(StatusBarType.Warning, "Hello world2");

    return <div>
        <TextField autoAdjustHeight={true} multiline={true} value={resourcesText} onChange={(_, newValue) => setResourcesText(newValue)}  />
        <DefaultButton text="Read setting" onClick={() => {
            readSettings("key1").then((value) => console.log(`Read key1: ${JSON.stringify(value)}`));
        }} />
        <DefaultButton text="Write setting" onClick={() => {
            writeSetting("key1", Date.now().toString()).then(() => console.log(`Wrote key1`), () => console.log(`Failed to write key1`));
        }} />
        <DefaultButton text="Write multiple settings" onClick={() => {
            const value = Date.now().toString();
            writeSetting("key1", `${value}-1`).then(() => console.log(`Wrote key1=value1`), () => console.log(`Failed to write key1=value1`));
            writeSetting("key1", `${value}-2`).then(() => console.log(`Wrote key1=value2`), () => console.log(`Failed to write key1=value2`));
            writeSetting("key2", `${value}-3`).then(() => console.log(`Wrote key2=value2`), () => console.log(`Failed to write key1=value3`));
        }} />
        <DefaultButton text="Write same setting" onClick={() => {
            readSettings("key1").then((value) => writeSetting("key1", value["key1"]).then(() => console.log(`Wrote same value for key1`), () => console.log(`Failed to write key1`)));
        }} />
        <DefaultButton onClick={() => {
            try {
                const resourcesJson = JSON.parse(resourcesText);
                setResources(resourcesJson);
            } catch (ex) {}
        }} text="Update resources" />
        <p>Current resources: {JSON.stringify(resources)}</p>
        <p>Tags by resource:</p>
        <TagsByResource resources={resources} onTaggedResourcesChange={(value) => console.log(`Resources changed: ${JSON.stringify(value)}`) } />
    </div>
};

export default HelloWorld;
