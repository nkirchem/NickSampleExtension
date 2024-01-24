import * as React from "react";
import { BladeLink } from "@microsoft/azureportal-reactview/BladeLink";
import { Link } from "@fluentui/react";

const ContextPane: React.FC = () => {
    return <div>
        <BladeLink bladeReference={{ bladeName: "ContextPane1.ReactView", extensionName: "NickSampleExtension" }} openAsContextPane={true}>Open context pane</BladeLink>
        <Link href="https://www.microsoft.com" target="_blank">Focusable link1</Link>
        <Link href="https://www.microsoft.com" target="_blank">Focusable link2</Link>
    </div>
};

export default ContextPane;
