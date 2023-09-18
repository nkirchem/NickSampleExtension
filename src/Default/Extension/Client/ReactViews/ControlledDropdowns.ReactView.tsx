import { setTitle } from "@microsoft/azureportal-reactview/Az";
import { LocationDropdown } from "@microsoft/azureportal-reactview/LocationDropdown";
import { SubscriptionDropdown } from "@microsoft/azureportal-reactview/SubscriptionDropdown";
import * as React from "react";

setTitle("Controlled dropdowns");

export const ControlledDropdowns = () => {
    const [subscriptionId, setSubscriptionId] = React.useState<string>();
    const [locationId, setLocationId] = React.useState<string>();

    return <div>
        <div>Source dropdowns:</div>
        <SubscriptionDropdown onSubscriptionDropdownChange={id => setSubscriptionId(id)} />
        <LocationDropdown subscriptionId={subscriptionId} onLocationChange={id => setLocationId(id)} />
        <div>Test dropdowns:</div>
        <SubscriptionDropdown selectedSubscriptionId={subscriptionId} />
        <LocationDropdown subscriptionId={subscriptionId} selectedLocationId={locationId} />
    </div>
};


export default ControlledDropdowns;
