import type {MemoryHistory} from 'history';
import {createMemoryHistory} from 'history';
import type {ReactElement} from 'react';
import {HistoryRouter} from '../history-router';

export function withHistory(component: ReactElement, history?: MemoryHistory): ReactElement {
  const memoryHistory = history ?? createMemoryHistory();

  return (
    <HistoryRouter history={memoryHistory}>
      {component}
    </HistoryRouter>
  );
}
