import { Resource, ResourceType } from "../resource";

export function canDarwCard(resource: Resource) {
  return (
    resource[ResourceType.Ore] >= 1 &&
    resource[ResourceType.Sheep] >= 1 &&
    resource[ResourceType.Wheat] >= 1
  );
}
