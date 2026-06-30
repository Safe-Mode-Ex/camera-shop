import type {ReactNode} from 'react';
import {useActiveValue} from '../hooks';
import classNames from 'classnames';
import {Link} from 'react-router-dom';

interface Props {
  value: string;
  children: ReactNode;
}

function TabsControl({value, children}: Props) {
  const [isActive, handleTabsControlClick] = useActiveValue(value);

  return (
    <Link
      to={`?details=${value}`}
      className={classNames('tabs__control', {'is-active': isActive})}
      type="button"
      role="tab"
      aria-controls={`panel-${value}`}
      aria-selected={isActive}
      tabIndex={isActive ? -1 : 0}
      onClick={handleTabsControlClick}
    >
      {children}
    </Link>
  );
}

export default TabsControl;
