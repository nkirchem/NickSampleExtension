import { DefaultButton } from "@fluentui/react";
import { setTitle } from "@microsoft/azureportal-reactview/Az";
import { LocationDropdown } from "@microsoft/azureportal-reactview/LocationDropdown";
import { SubscriptionDropdown } from "@microsoft/azureportal-reactview/SubscriptionDropdown";
import * as React from "react";

setTitle("Controlled dropdowns");

export const ControlledDropdowns = () => {
  const [showDropdowns, setShowDropdowns] = React.useState(false);
  const [useSelectedProp, setUseSelectedProp] = React.useState(false);
  const [subscriptionId, setSubscriptionId] = React.useState<string>();
  const [locationId, setLocationId] = React.useState<string>();
  const [subscriptionUpdates, setSubscriptionUpdates] = React.useState("");
  const [locationUpdates, setLocationUpdates] = React.useState("");

  React.useEffect(() => {
    if (!useSelectedProp && showDropdowns) {
        setUseSelectedProp(true);
    }
  }, [useSelectedProp, showDropdowns]);

  return (
    <div>
      <div>Source dropdowns:</div>
      <SubscriptionDropdown onSubscriptionDropdownChange={(id) => setSubscriptionId(id)} />
      <LocationDropdown subscriptionId={subscriptionId} onLocationChange={(id) => setLocationId(id)} />
      <DefaultButton text={showDropdowns ? "Hide" : "Show"} onClick={() => {
        setShowDropdowns(!showDropdowns);
        setUseSelectedProp(false);
        setSubscriptionUpdates("");
        setLocationUpdates("");
    }} />
      {showDropdowns && (
        <div>
          <div>Test dropdowns:</div>
          <SubscriptionDropdown selectedSubscriptionId={useSelectedProp ? subscriptionId : undefined} onSubscriptionDropdownChange={(subId, sub) => setSubscriptionUpdates(prev => prev + `\n${subId}: ${sub.displayName}`) } />
          <LocationDropdown subscriptionId={subscriptionId} selectedLocationId={useSelectedProp ? locationId : undefined} onLocationChange={(locId, loc) => setLocationUpdates(prev => prev + `\n${locId}: ${loc.displayName}`)} />
          <div>Subscription updates:</div>
          <pre>{subscriptionUpdates}</pre>
          <div>Location updates:</div>
          <pre>{locationUpdates}</pre>
        </div>
      )}
    </div>
  );
};

export default ControlledDropdowns;
