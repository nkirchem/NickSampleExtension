import { IResourceListViewProps } from "./ResourceListView.types";
import { subscriptionQuery } from "../../Api/queries/subscriptionQueries";
import { resourceGroupsQuery } from "../../Api/queries/resourceGroupQueries";
import { resourcesByResourceGroupQuery } from "../../Api/queries/resourceQueries";

export function fetchData(props: IResourceListViewProps) {
    const subscriptionId = props.parameters.subscriptionId;
    subscriptionQuery.bind(subscriptionId).get();

    resourceGroupsQuery.bind(subscriptionId).get().then(resourceGroups => {
        if (resourceGroups.length) {
            resourcesByResourceGroupQuery.bind(subscriptionId, resourceGroups[0].name).get();
        }
    });
}
