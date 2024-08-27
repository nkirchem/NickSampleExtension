import { subscriptionsQuery } from "../../Api/queries/subscriptionQueries";

export function fetchData() {
    subscriptionsQuery.bind().get();
}
