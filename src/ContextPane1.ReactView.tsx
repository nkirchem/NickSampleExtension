import * as React from "react";
import { BladeLink } from "@microsoft/azureportal-reactview/BladeLink";
import { ContextPaneWidth, withContextPaneWidth } from "@microsoft/azureportal-reactview/ReactView";
import { Dropdown, Link } from "@fluentui/react";

const ContextPane1: React.FC = () => {
    return <div>
        <BladeLink bladeReference={{ bladeName: "ContextPane2.ReactView", extensionName: "NickSampleExtension" }} openAsContextPane={true}>Open sub-context-blade</BladeLink>
        <Link href="https://www.microsoft.com" target="_blank">Focusable link1</Link>
        <Link href="https://www.microsoft.com" target="_blank">Focusable link2</Link>
        <div>
            <Dropdown options={[{ key: "item1", text: "Dropdown item number one" }]} placeholder="Drop1" />
        </div>
    </div>
};

export default withContextPaneWidth(ContextPane1, ContextPaneWidth.Medium);
