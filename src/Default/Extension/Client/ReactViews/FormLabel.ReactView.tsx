import * as Az from "@microsoft/azureportal-reactview/Az";
import { FormLabel, useFormLabelContext } from "@microsoft/azureportal-reactview/FormLabel";
import { TextField } from "@fluentui/react";
import * as React from "react";
import { Resources } from "./Resources.resjson";

Az.setTitle(Resources.HelloWorldTitle);

export const FormLabelView = () => {
    return <div>
        <FormLabel displayValue="Form label1" tooltip={"tooltip about label1"}><TextField defaultValue="Form field 1" /></FormLabel>
        <FormLabel displayValue="Form label2" tooltip={"tooltip about label2"}><FormContentDisabled /></FormLabel>
    </div>
};

const FormContentDisabled = () => {
    const { setIsTooltipIconTabbable } = useFormLabelContext();
    React.useEffect(() => {
        setIsTooltipIconTabbable(true);
    }, []);
    return <TextField defaultValue="Form field 2" disabled={true} />;
};

export default FormLabelView;
