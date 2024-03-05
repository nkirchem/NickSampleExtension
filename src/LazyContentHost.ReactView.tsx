import * as React from "react";
import { setTitle } from "@microsoft/azureportal-reactview/Az";
import { DefaultButton } from "@fluentui/react";

setTitle("Sample Form with lazy content");

const LazyContent = React.lazy(() => import("./LazyContent"));

export const LazyContentHost = () => {
    const [showLazyContent, setShowLazyContent] = React.useState(false);
    return (<div>
        <div>Static content</div>
        <DefaultButton text={showLazyContent ? "Hide" : "Show"} onClick={() => setShowLazyContent(v => !v)} />
        {showLazyContent && <React.Suspense fallback={<></>}>
            <LazyContent />
        </React.Suspense>
        }
    </div>);
};

export default LazyContentHost;