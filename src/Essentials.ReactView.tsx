import * as Az from "@microsoft/azureportal-reactview/Az";
import * as React from "react";
import * as ReactView from "@microsoft/azureportal-reactview/ReactView";
import { FieldColumn, Essentials, ResourceField, Field, CustomResourceField } from "@microsoft/azureportal-reactview/Essentials";
import { Link } from "@fluentui/react/lib/Link";
import { BladeLink } from "@microsoft/azureportal-reactview/BladeLink";
import { batch } from "@microsoft/azureportal-reactview/Ajax";
import { Ajax } from "@microsoft/azureportal-reactview/FxReactCommon.Modules";

Az.setTitle("Essentials demo");

/**
 * This blade is a sample using the Portal's Essentials component.
 */
const ResourceEssentialsDemo = () => {
    const [resourceId, setResourceId] = React.useState("");

    React.useEffect(() => {
        // get resourceId of some random resource
        batch({
            uri: "/providers/Microsoft.ResourceGraph/resources?api-version=2021-03-01",
            "type": "POST",
            content: {
                query: "take 1 | project id",
                options: { resultFormat: "table", $skip: 0, $top: 1, $skipToken: "" },
            },
        }).then((response: Ajax.BatchResponseItem<{ data: { columns: any[]; rows: any[] } }>) => {
            if (response.httpStatusCode === 200 && response.content) {
                const data = response.content.data;
                if (data) {
                    const id = data.rows[0][0];
                    setResourceId(id);
                }
            }
        });
    }, []);

    return (
        <div>
            <div>
                <Link onClick={() => {
                    Az.openContextPane({ extensionName: "NickSampleExtension", bladeName: "Essentials.ReactView" });
                }}>Open in new context blade...</Link>
            </div>
            <div>
        <Essentials
            fields={[
                {
                    label: "Status",
                    value: "----",
                    column: 0 as FieldColumn.Left,
                },
                {
                    label: "Essentials item 1",
                    value: "Sample string",
                    column: 1 as FieldColumn.Right,
                },
                {
                    label: "Essentials item 2",
                    value: <Link href="https://bing.com" target="#">Bing.com</Link>,
                    column: 1 as FieldColumn.Right,
                },
                {
                    label: "Essentials item 3",
                    value: <BladeLink bladeReference={{ bladeName: "StaticContent.ReactView", extensionName: "SamplesExtension" }}>Blade Link</BladeLink>,
                    column: 1 as FieldColumn.Right,
                },
                {
                    label: "Essentials item 4",
                    value: <BladeLink bladeReference={{ bladeName: "StaticContent.ReactView", extensionName: "SamplesExtension" }}>Blade Link</BladeLink>,
                    column: 1 as FieldColumn.Right,
                },
                {
                    label: "Essentials multi-line item",
                    value: <><span tabIndex={0} aria-label="Long string label">{"This is a long string that contains a lot of text. This is a long string that contains a lot of text. This is a long string that contains a lot of text. This is a long string that contains a lot of text. This is a long string that contains a lot of text. "}</span><br /><Link href="https://bing.com" target="#">Bing.com</Link></>,
                    column: 1 as FieldColumn.Right,
                },
            ]}
            resourceId={resourceId}
            customizeResourceFields={(fields) => {
                const customResourceGroup: CustomResourceField = { immutable: true, resourceField: 0 as ResourceField.ResourceGroup };
                const customizedFields: (Field | ResourceField | CustomResourceField)[] = [].concat(fields);
                customizedFields.splice(0, 0, customResourceGroup);
                customizedFields.splice(2, 0, 2 as ResourceField.Subscription);
                customizedFields.splice(3, 0, 3 as ResourceField.SubscriptionId);
                customizedFields.splice(4, 0, 1 as ResourceField.Location);
                return customizedFields;
            }}
        />
        </div>
        </div>
    );
};

export default ReactView.withContextPaneWidth(ResourceEssentialsDemo, 1 as ReactView.ContextPaneWidth.Medium);
