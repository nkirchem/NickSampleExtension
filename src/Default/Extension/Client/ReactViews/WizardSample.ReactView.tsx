
import { closeCurrentBlade, setTitle } from "@microsoft/azureportal-reactview/Az";
import {
    formBuilder,
    ResourceScopeSection,
    TemplateDeploymentScope,
    FormWizardNavigation,
    FormNavigationFooter,
    ReviewStep,
    useFormNavigation,
    useFormValidation,
} from "@microsoft/azureportal-reactview/FormBuilder";
import { useValidationEffect, ValidationState, ValidationResult } from "@microsoft/azureportal-reactview/FormLabel";
import { Summary } from "@microsoft/azureportal-reactview/Summary";
import { TagsByResource } from "@microsoft/azureportal-reactview/TagsByResource";
import { PrimaryButton } from "@fluentui/react/lib/Button";
import { TextField, ITextFieldProps } from "@fluentui/react/lib/TextField";
import * as React from "react";
import { FormResources } from "./Resources.resjson";

const CustomFooter = (props: React.PropsWithChildren<{ outputs: Record<string, any>; primaryButtonText: string }>) => {
    const { canMoveNext, navigationDisabled } = useFormNavigation();
    const { validationState, primaryActionDisabled } = useFormValidation();

    return <FormNavigationFooter postFixElements={
        <>
            {!canMoveNext() ?
                <PrimaryButton
                    text={props.primaryButtonText}
                    disabled={navigationDisabled
                        || validationState !== ValidationState.Success
                        || primaryActionDisabled}
                    onClick={() => {
                        closeCurrentBlade(props.outputs);
                    }} /> : null}
        </>} />;
};

// Custom validators
const isNameNotEmpty = (value: string): ValidationResult => {
    return (value === "" || value === undefined)
        ? { message: FormResources.ValidationErrorMessageEmpty , state: ValidationState.Error }
        : { state: ValidationState.Success };
};
const isNameValid = (value: string) => new Promise<ValidationResult>(resolve => setTimeout(() => {
    resolve(value === "test"
        ? { message: FormResources.ValidationErrorMessageTest, state: ValidationState.Error }
        : { state: ValidationState.Success }
    );
}, 3000));

const TextFieldWithValidationHook = (props: ITextFieldProps) => {
    const [value, setValue] = React.useState("");

    useValidationEffect(() => [isNameNotEmpty(value), isNameValid(value)], [value]);

    return <TextField onChange={(ev, value) => {
        props.onChange?.(ev, value);
        setValue(value);
    }} />;
};

const Wizard = formBuilder()
    .add.navigation("allSteps", FormWizardNavigation)

        .add.step("basics")
            .customize.label.static(FormResources.Basics)
            .add.section("rsc", ResourceScopeSection)
                .customize.props.deploymentScope.static(TemplateDeploymentScope.ResourceGroup)
                .customize.props.resourceTypes.static(["Providers.Test/statefulIbizaEngines"])
                .customize.props.subscriptionValidations.dynamic((_, localState) => localState?.subscription?.displayName,
                    value => value === FormResources.ValidationErrorSubscriptionName
                        ? { state: ValidationState.Error, message: FormResources.ValidationErrorMessageSubscription }
                        : { state: ValidationState.Success })
                .customize.props.locationValidations.dynamic((_, localState) => localState?.location?.displayName,
                    value => value === FormResources.ValidationErrorLocationName
                        ? { state: ValidationState.Error, message: FormResources.ValidationErrorMessageLocation }
                        : { state: ValidationState.Success })
            .seal.step()

        .add.step("props")
            .customize.label.static(FormResources.PropsStepTitle)

            .add.input("textField", TextField)
                .customize.formLabelProps.displayValue.static(FormResources.PropsStepTextFieldLabel)
                .customize.formLabelProps.sublabel.static(<>{FormResources.PropsStepTextFieldSublabel3}</>)
                .seal.input()

            .add.input("textFieldWithDynamicLabel", TextField)
                .customize.formLabelProps.sublabel.static(FormResources.PropsStepTextFieldSublabel1)
                .customize.formLabelProps.displayValue.dynamic(globalState => globalState.allSteps.props.textField.value, selectedState => selectedState)
            .seal.step()

        .add.step("validations")
            .customize.label.static(FormResources.ValidationsStepTitle)

            .add.input("tfWithValidationHook", TextFieldWithValidationHook)
                .customize.formLabelProps.displayValue.static(FormResources.TextFieldLabel)
                .seal.input()

            .add.input("tfWithValidations", TextField)
                .customize.validator.dynamic((_, localState) => localState,
                    value => {
                        return (value === "" || value === undefined)
                            ? { message: FormResources.ValidationErrorMessageEmpty, state: ValidationState.Error }
                            : { state: ValidationState.Success };
                    })
                .customize.formLabelProps.displayValue.static(FormResources.PropsStepTextFieldLabelsLocal)
                .seal.input()

            .add.input("tfWithValidationsGlobalState", TextField)
                .customize.validator.dynamic(globalState => globalState.allSteps.validations.tfWithValidationHook.value,
                    value => {
                        return (value === "fooBar")
                            ? { message: FormResources.ValidationErrorMessageFooBar, state: ValidationState.Error }
                            : { state: ValidationState.Success };
                    })
                .customize.formLabelProps.displayValue.static(FormResources.PropsStepTextFieldLabelsGlobal)
                .seal.input()

            .add.input("tagsByResource", TagsByResource)
                .customize.formLabelProps.displayValue.static("")
                .customize.formLabelProps.hideLabel.static(true)
                .customize.props.resources.static([{
                    count: 1,
                    resourceType: "Microsoft.Compute/VirtualMachines",
                }])
                .customize.validator.dynamic((_, localState) => localState?.[0].displayName,
                    selectedState => {
                        return (selectedState === "foo")
                            ? { message: FormResources.ValidationErrorMessageTags, state: ValidationState.Error }
                            : { state: ValidationState.Success };
                    })
            .seal.step()

            .add.step("R&c", ReviewStep)
                .customize.label.static(FormResources.ReviewStepTitle)

                .add.section("summary", Summary)
                    .customize.props.groups.dynamic(formState => {
                        const rsc = formState.allSteps.basics.rsc;
                        return {
                            subName: rsc.value?.subscription?.displayName,
                            rg: rsc.value?.resourceGroup?.name,
                            loc: rsc.value?.location?.displayName,
                            tf1: formState.allSteps.validations.tfWithValidationHook.value,
                        };},
                        value => (
                            [
                                {
                                    header: FormResources.Basics,
                                    values: [
                                        {
                                            label: FormResources.Subscription,
                                            value: value?.subName,
                                        },
                                        {
                                            label: FormResources.ResourceGroup,
                                            value: value?.rg,
                                        },
                                        {
                                            label: FormResources.Location,
                                            value: value?.loc,
                                        },
                                    ],
                                },
                                {
                                    header: FormResources.ValidationsStepTitle,
                                    values: [
                                        {
                                            label: FormResources.TextFieldLabel,
                                            value: value?.tf1,
                                        },
                                    ],
                                },
                            ]
                        ))
            .seal.step()

        .add.footer("custom", CustomFooter)
            .customize.props.outputs.dynamic(formState => {
                const rsc = formState.allSteps.basics.rsc;
                return {
                    subName: rsc.value?.subscription?.displayName,
                    rg: rsc.value?.resourceGroup?.name,
                    loc: rsc.value?.location?.displayName,
                    tf1: formState.allSteps.validations.tfWithValidationHook.value,
                    };
                },
                selectedState => ({
                    subscription: selectedState?.subName,
                    rg: selectedState?.rg,
                    location: selectedState.loc,
                    textfieldVal: selectedState?.tf1,
                }))
            .customize.props.primaryButtonText.static(FormResources.ButtonOutputs)

    .seal.form();

const WizardSample: React.FC = () => {
    setTitle(FormResources.WizardSampleTitle);
    return <Wizard />;
}

export default WizardSample;


