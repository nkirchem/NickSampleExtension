import * as React from "react";
import { Summary } from "@microsoft/azureportal-reactview/Summary";

export const SummarySample: React.FunctionComponent = () => {
    return (
            <>
            <Summary
                groups={[
                    {
                        header: "Header",
                        values: [
                            {
                                label: "Label1",
                                value: "value1",
                            },
                            {
                                label: "Label2",
                                value: "value2",
                            },
                        ],
                    },
                    {
                        header: "Another Header",
                        values: [
                            {
                                label: "Label",
                                value: "value",
                            },
                        ],
                    },
                ]}
            />
        </>
    );
};

export default SummarySample;