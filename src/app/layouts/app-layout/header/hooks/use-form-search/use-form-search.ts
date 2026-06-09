import type {ChangeEvent, ChangeEventHandler} from 'react';
import {useState, useEffect} from 'react';
import {useDebounceCallback} from 'usehooks-ts';
import type {Product} from '@/shared/dto';
import {useProducts} from '@/entities/products';

const DEBOUCE_TIME = 500;

export const useFormSearch = (): {
  inputValue: string;
  searchValue: string;
  handleInput: ChangeEventHandler<HTMLInputElement>;
  handleSearchReset: () => void;
  isListOpened: boolean;
  products: Product[];
} => {
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const debouncedSetSearchValue = useDebounceCallback(setSearchValue, DEBOUCE_TIME);
  const {data: products} = useProducts(searchValue);
  const isListOpened = Boolean(inputValue && searchValue && products.length);

  const handleInput = ({target}: ChangeEvent<HTMLInputElement>) => {
    setInputValue(target.value);
  };

  const handleSearchReset = () => {
    setInputValue('');
  };

  useEffect(() => {
    debouncedSetSearchValue(inputValue);

    return () => {
      debouncedSetSearchValue.cancel();
    };
  }, [inputValue, debouncedSetSearchValue]);

  return {
    inputValue,
    searchValue,
    handleInput,
    handleSearchReset,
    isListOpened,
    products,
  };
};
