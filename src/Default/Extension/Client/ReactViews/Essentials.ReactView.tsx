import * as Az from "@microsoft/azureportal-reactview/Az";
import * as React from "react";
import * as ReactView from "@microsoft/azureportal-reactview/ReactView";
import { FieldColumn, Essentials, ResourceField, Field, CustomResourceField } from "@microsoft/azureportal-reactview/Essentials";
import { Link } from "@fluentui/react/lib/Link";
import { BladeLink } from "@microsoft/azureportal-reactview/BladeLink";
import { batch } from "@microsoft/azureportal-reactview/Ajax";

Az.setTitle("Essentials demo");

/**
 * This blade is a sample using the Portal's Essentials component.
 */
const ResourceEssentialsDemo = () => {
    const initialized  = ReactView.useInitialized("ResourceEssentialsDemo");
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
        }).then((response: Common.Ajax.BatchResponseItem<{ data: { columns: any[]; rows: any[] } }>) => {
            if (response.httpStatusCode === 200 && response.content) {
                const data = response.content.data;
                if (data) {
                    const id = data.rows[0][0];
                    setResourceId(id);
                }
            }

            // Calling the initialized hook signals that this component is ready and done participating in the `viewReady` (BladeFullReady telemetry action)
            initialized();
        });
    }, []);

    return (
        <Essentials
            fields={[
                {
                    label: "Status",
                    value: "----",
                    column: FieldColumn.Left,
                },
                {
                    label: "Essentials item 1",
                    value: "Sample string",
                    column: FieldColumn.Left,
                },
                {
                    label: "Essentials item 2",
                    value: <Link href="https://bing.com" target="#">Bing.com</Link>,
                    column: FieldColumn.Left,
                },
                {
                    label: "Essentials item 3",
                    value: <BladeLink bladeReference={{ bladeName: "StaticContent.ReactView", extensionName: "SamplesExtension" }}>Blade Link</BladeLink>,
                    column: FieldColumn.Right,
                },
                {
                    label: "Essentials item 4",
                    value: <BladeLink bladeReference={{ bladeName: "StaticContent.ReactView", extensionName: "SamplesExtension" }}>Blade Link</BladeLink>,
                    column: FieldColumn.Right,
                },
                {
                    label: "Essentials multi-line item",
                    value: <><span tabIndex={0} aria-label="Long string label">{"This is a long string that contains a lot of text. This is a long string that contains a lot of text. This is a long string that contains a lot of text. This is a long string that contains a lot of text. This is a long string that contains a lot of text. "}</span><br /><Link href="https://bing.com" target="#">Bing.com</Link></>,
                    column: FieldColumn.Right,
                },
            ]}
            resourceId={resourceId}
            customizeResourceFields={(fields) => {
                const customResourceGroup: CustomResourceField = { immutable: true, resourceField: ResourceField.ResourceGroup };
                const customizedFields: (Field | ResourceField | CustomResourceField)[] = [].concat(fields);
                customizedFields.splice(0, 0, customResourceGroup);
                customizedFields.splice(2, 0, ResourceField.Subscription);
                customizedFields.splice(3, 0, ResourceField.SubscriptionId);
                customizedFields.splice(4, 0, ResourceField.Location);
                return customizedFields;
            }}
        />
    );
};

export default ResourceEssentialsDemo;
