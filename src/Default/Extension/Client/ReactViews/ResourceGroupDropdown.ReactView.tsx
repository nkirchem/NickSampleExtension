import { mergeStyles } from "@fluentui/react";
import { setTitle } from "@microsoft/azureportal-reactview/Az";
import { ResourceGroupDropdown } from "@microsoft/azureportal-reactview/ResourceGroupDropdown";
import { SubscriptionDropdown } from "@microsoft/azureportal-reactview/SubscriptionDropdown";
import * as React from "react";

setTitle("Controlled dropdowns");

export const ControlledDropdowns = () => {
  const [subscriptionId, setSubscriptionId] = React.useState<string>();
  const [resourceGroupId, setResourceGroupId] = React.useState<string>();

  return (
    <div className={mergeStyles({ maxWidth: 500 })}>
      <SubscriptionDropdown selectedSubscriptionId={subscriptionId} onSubscriptionDropdownChange={(id) => setSubscriptionId(id)} />
      <div>No subscription RG dropdown:</div>
      <ResourceGroupDropdown subscriptionId={undefined} />

      <div>Subscription-dependent dropdown:</div>
      <ResourceGroupDropdown subscriptionId={subscriptionId} />

      <div>Auto-new resource group:</div>
      <ResourceGroupDropdown subscriptionId={subscriptionId} createNew={true} onResourceGroupChange={(_, rg) => {
        setResourceGroupId(rg.id);
        console.warn(`OnSelected resource group: ${JSON.stringify(rg)}`);
      }} selectedResourceGroupId={resourceGroupId || `/subscriptions/subId/resourceGroups/my-new-1`} calloutProps={{
        calloutMaxHeight: 500,
      }} />

      <div>Supports new resource group:</div>
      <ResourceGroupDropdown subscriptionId={subscriptionId} createNew={true} />
    </div>
  );
};

export default ControlledDropdowns;
