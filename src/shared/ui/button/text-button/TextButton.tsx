import type {ReactNode} from 'react';
import {Link} from 'react-router-dom';
import {ButtonProxy} from '../button-proxy';

interface Props {
  href: string;
  children: ReactNode;
}

/* TODO: проверить, не дублирует ли transparent button */

function TextButton({href, children}: Props) {
  return (
    <ButtonProxy>
      <Link className="btn btn--transparent" to={href}>{ children }</Link>
    </ButtonProxy>
  );
}

export default TextButton;
