import * as React from "react";
import { Resources } from "./Resources.resjson";
import { ValidationResult, ValidationState, useValidationEffect } from "@microsoft/azureportal-reactview/FormLabel";

//const foo = Resources;

export const LocTest = () => {
    const combined = `${Resources.HelloWorldMessage} -- ${Resources.HelloWorldTitle}`;
    return <div>
        <div>Hello World!!</div>
        <div>{"OK" /*foo.HelloWorldMessage*/}</div>
        <div>{Resources.HelloWorldMessage}</div>
        <div>{Resources.HelloWorldTitle}</div>
        <div>{combined}</div>
    </div>
};

export default LocTest;
