import type {FetchStatus} from '@tanstack/react-query';

export const QueryFetchStatus = {
  Fetching: 'fetching',
  Paused: 'paused',
  Idle: 'idle',
} as const satisfies Record<string, FetchStatus>;
