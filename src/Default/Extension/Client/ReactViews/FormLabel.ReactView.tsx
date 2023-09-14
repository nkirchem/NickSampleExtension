import * as Az from "@microsoft/azureportal-reactview/Az";
import * as React from "react";
import { Resources } from "./Resources.resjson";
import { FormLabel, useFormLabelContext } from "@microsoft/azureportal-reactview/FormLabel";

Az.setTitle(Resources.HelloWorldTitle);

export const FormLabelView = () => {
    return <div>
        <FormLabel displayValue="Form label1" tooltip={"tooltip about label1"}>Form content 1</FormLabel>
        <FormLabel displayValue="Form label2" tooltip={"tooltip about label2"}><FormContentDisabled /></FormLabel>
    </div>
};

const FormContentDisabled = () => {
    const { setIsTooltipIconTabbable } = useFormLabelContext();
    React.useEffect(() => {
        setIsTooltipIconTabbable(false);
    }, []);
    return <div>Form content disabled</div>;
};

export default FormLabelView;
