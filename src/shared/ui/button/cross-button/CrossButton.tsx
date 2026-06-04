import {Icon} from '../../icon';

interface Props {
  'aria-label': string;
  onClick: () => void;
}

function CrossButton({'aria-label': ariaLabel, onClick}: Props) {
  return (
    <button
      className="cross-btn"
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
    >
      <Icon title="icon-close" width="10" height="10" />
    </button>
  );
}

export default CrossButton;
