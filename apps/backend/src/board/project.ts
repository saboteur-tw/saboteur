import type { EventSource } from "~/models/event";
import type { Placement } from "~/models/placement";
import type { CurrentPlacementQuery } from "~/board/query";
import { isCurrentPlacementQuery } from "~/board/query";
import { match } from "ts-pattern";
import getCurrentPlacements from "~/board/logic/get-current-placements";
import { throws, identity } from "~/utils";

interface Projector {
  (query: CurrentPlacementQuery): Promise<Placement[]>;
}
export const project =
  (repository: EventSource): Projector =>
  (query) =>
    match(query)
      .when(isCurrentPlacementQuery, () =>
        getCurrentPlacements(repository).match(identity, throws)
      )
      .exhaustive();

export default project;
