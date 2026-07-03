import {useState, useRef, startTransition} from 'react';
import {DECIMAL_RADIX} from '@/shared/config';
import {MIN_PRODUCT_QUANTITY, MAX_PRODUCT_QUANTITY} from '@/pages/cart/model/config';

enum ButtonAction {
  Increase = 'increase',
  Decrease = 'decrease',
}

interface UseQuantityParams {
  quantity: number;
  handleQuantityChange: (quantity: number) => void,
}

interface UseQuantityResult {
  displayValue: string;
  isMin: boolean;
  isMax: boolean;
  handleDecreaseMouseDown: () => void;
  handleIncreaseMouseDown: () => void;
  handleChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: () => void;
  handleFocus: (evt: React.FocusEvent<HTMLInputElement>) => void;
  handleKeyDown: (evt: React.KeyboardEvent<HTMLInputElement>) => void;
}

export function useQuantity({quantity, handleQuantityChange}: UseQuantityParams): UseQuantityResult {
  const [draft, setDraft] = useState<string | null>(null);
  const draftRef = useRef<string | null>(null);
  const buttonActionRef = useRef<ButtonAction | null>(null);

  const displayValue = draft ?? String(quantity);
  const isMin = quantity === MIN_PRODUCT_QUANTITY;
  const isMax = quantity === MAX_PRODUCT_QUANTITY;

  const clamp = (value: number): number => (
    Math.max(MIN_PRODUCT_QUANTITY, Math.min(MAX_PRODUCT_QUANTITY, value))
  );

  const setDraftValue = (value: string | null) => {
    draftRef.current = value;
    setDraft(value);
  };

  const setMouseDownAction = (action: ButtonAction) => {
    buttonActionRef.current = action;
  };

  const handleDecreaseMouseDown = () => {
    setMouseDownAction(ButtonAction.Decrease);
  };

  const handleIncreaseMouseDown = () => {
    setMouseDownAction(ButtonAction.Increase);
  };

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setDraftValue(evt.target.value);
  };

  const handleBlur = () => {
    const currentDraft = draftRef.current;
    if (currentDraft === null) {
      return;
    }

    const parsed = parseInt(currentDraft, DECIMAL_RADIX);
    const base = Number.isNaN(parsed) ? quantity : parsed;
    const action = buttonActionRef.current;
    buttonActionRef.current = null;

    let next = clamp(base);
    if (action === ButtonAction.Increase) {
      next = clamp(base + 1);
    } else if (action === ButtonAction.Decrease) {
      next = clamp(base - 1);
    }

    handleQuantityChange(next);
    startTransition(() => {
      setDraftValue(null);
    });
  };

  const handleFocus = (evt: React.FocusEvent<HTMLInputElement>) => {
    setDraftValue(String(quantity));
    evt.target.select();
  };

  const handleKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter') {
      evt.currentTarget.blur();
    }
  };

  return {
    displayValue,
    isMin,
    isMax,
    handleDecreaseMouseDown,
    handleIncreaseMouseDown,
    handleChange,
    handleBlur,
    handleFocus,
    handleKeyDown,
  };
}
