import { gql } from "@apollo/client";

export const GET_BUS_ARRIVALS = gql`
  query GetBusArrivals($stopId: String!) {
    stop(id: $stopId) {
      name
      stoptimesWithoutPatterns {
        scheduledArrival
        realtimeArrival
        arrivalDelay
        scheduledDeparture
        realtimeDeparture
        departureDelay
        realtime
        realtimeState
        serviceDay
        headsign
        trip {
          routeShortName
        }
      }
    }
  }
`;
