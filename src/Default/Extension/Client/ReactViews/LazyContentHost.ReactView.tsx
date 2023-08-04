import * as React from "react";
import { setTitle } from "@microsoft/azureportal-reactview/Az";
import { DefaultButton } from "@fluentui/react";

setTitle("Sample Form with FormBuilder");

const LazyContent = React.lazy(() => import("./LazyContent"));

export default () => {
    const [showLazyContent, setShowLazyContent] = React.useState(false);
    return (<div>
        <div>Static contnet</div>
        <DefaultButton text={showLazyContent ? "Hide" : "Show"} onClick={() => setShowLazyContent(v => !v)} />
        {showLazyContent && <React.Suspense fallback={<div>Loading...</div>}>
            <LazyContent />
        </React.Suspense>
        }
    </div>);
};