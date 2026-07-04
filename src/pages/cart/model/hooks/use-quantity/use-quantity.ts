import {useState, useRef, startTransition} from 'react';
import {DECIMAL_RADIX} from '@/shared/config';
import {MIN_PRODUCT_QUANTITY, MAX_PRODUCT_QUANTITY} from '@/pages/cart/model/config';

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

  const applyButtonAction = (delta: number) => {
    const currentDraft = draftRef.current;
    let base: number;

    if (currentDraft !== null) {
      const parsed = parseInt(currentDraft, DECIMAL_RADIX);
      base = Number.isNaN(parsed) ? quantity : parsed;
    } else {
      base = quantity;
    }

    const next = clamp(base + delta);
    handleQuantityChange(next);
    setDraftValue(null);
  };

  const handleDecreaseMouseDown = () => {
    applyButtonAction(-1);
  };

  const handleIncreaseMouseDown = () => {
    applyButtonAction(1);
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

    handleQuantityChange(clamp(base));
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
