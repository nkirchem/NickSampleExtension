import * as React from "react";
import { ContextPaneWidth, withContextPaneWidth } from "@microsoft/azureportal-reactview/ReactView";
import { Link } from "@fluentui/react";

const ContextPane2: React.FC = () => {
    return <div>
        <Link href="https://www.microsoft.com" target="_blank">Focusable link1</Link>
        <Link href="https://www.microsoft.com" target="_blank">Focusable link2</Link>
    </div>
};

export default withContextPaneWidth(ContextPane2, ContextPaneWidth.Small);
