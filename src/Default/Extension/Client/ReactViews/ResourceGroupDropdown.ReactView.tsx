import { TextField, mergeStyles } from "@fluentui/react";
import { setTitle } from "@microsoft/azureportal-reactview/Az";
import { ResourceGroupDropdown } from "@microsoft/azureportal-reactview/ResourceGroupDropdown";
import { ResourceGroup } from "@microsoft/azureportal-reactview/ResourceManagement";
import { SubscriptionDropdown } from "@microsoft/azureportal-reactview/SubscriptionDropdown";
import * as React from "react";

setTitle("Controlled dropdowns");

export const ControlledDropdowns = () => {
  const [subscriptionId, setSubscriptionId] = React.useState<string>();
  const [resourceGroupId, setResourceGroupId] = React.useState<string>();
  const [resourceName, setResourceName] = React.useState("");
  const [controlledResourceGroup, setControlledResourceGroup] = React.useState<ResourceGroup>();
  const autoResourceGroupId = `/subscriptions/${subscriptionId}/resourceGroups/${resourceName}-group`;

  return (
    <div className={mergeStyles({ maxWidth: 500 })}>
      <SubscriptionDropdown
        selectedSubscriptionId={subscriptionId}
        onSubscriptionDropdownChange={(id) => setSubscriptionId(id)}
      />
      <div>No subscription RG dropdown:</div>
      <ResourceGroupDropdown subscriptionId={undefined} />

      <div>Subscription-dependent dropdown:</div>
      <ResourceGroupDropdown subscriptionId={subscriptionId} />

      <div>Auto-new resource group:</div>
      <ResourceGroupDropdown
        subscriptionId={subscriptionId}
        createNew={true}
        onResourceGroupChange={(_, rg) => {
          setResourceGroupId(rg?.id);
          console.log(`OnSelected resource group: ${JSON.stringify(rg)}`);
        }}
        selectedResourceGroupId={resourceGroupId || `/subscriptions/subId/resourceGroups/my-new-1`}
        calloutProps={{
          calloutMaxHeight: 500,
        }}
      />

      <div>Supports new resource group:</div>
      <ResourceGroupDropdown subscriptionId={subscriptionId} createNew={true} />

      <div>New resource group from name (uncontrolled):</div>
      <TextField label="Resource name" value={resourceName} onChange={(_, newValue) => setResourceName(newValue)} />
      <ResourceGroupDropdown
        subscriptionId={subscriptionId}
        createNew={true}
        onResourceGroupChange={(_, rg, isNew) => {
          console.log(`Uncontrolled:OnSelected resource group: ${JSON.stringify(rg)} isNew=${isNew}`);
        }}
        // @ts-ignore-next-line
        newResourceGroupName={resourceName ? `${resourceName}-group` : undefined}
      />

      <div>New resource group from name (controlled):</div>
      <TextField label="Resource name" value={resourceName} onChange={(_, newValue) => setResourceName(newValue)} />
      <ResourceGroupDropdown
        subscriptionId={subscriptionId}
        createNew={true}
        selectedResourceGroupId={
          controlledResourceGroup
            ? controlledResourceGroup.id
            : resourceName && subscriptionId
            ? `/subscriptions/${subscriptionId}/resourceGroups/${resourceName}-group`
            : undefined
        }
        onResourceGroupChange={(_, group, isNew) => {
          console.log(`Controlled:OnSelected resource group: ${JSON.stringify(group)} isNew=${isNew}`);
          setControlledResourceGroup(isNew && group?.id === autoResourceGroupId ? undefined : group);
        }}
        disableDefaultSelection={true}
      />
    </div>
  );
};

export default ControlledDropdowns;
