import type {ChangeEvent, MouseEvent} from 'react';
import {useState, useEffect} from 'react';
import type {Product} from '@/shared/dto';
import {debounce} from '@/shared/lib/debounce';
import {useProducts} from '@/entities/products';

export const useFormSearch = (): {
  inputValue: string;
  searchValue: string;
  handleInput: (evt: ChangeEvent<HTMLInputElement>) => void;
  handleSearchReset: (evt: MouseEvent<HTMLButtonElement>) => void;
  isListOpened: boolean;
  products: Product[];
} => {
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const debounceSearchValue = debounce(setSearchValue);
  const {data: products} = useProducts(searchValue);
  const isListOpened = Boolean(searchValue && products.length);

  const handleInput = ({target}: ChangeEvent<HTMLInputElement>) => {
    setInputValue(target.value);
  };

  const handleSearchReset = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    setInputValue('');
  };

  useEffect(() => {
    debounceSearchValue(inputValue);

    return () => {
      debounceSearchValue.cancel();
    };
  }, [inputValue, debounceSearchValue]);

  return {
    inputValue,
    searchValue,
    handleInput,
    handleSearchReset,
    isListOpened,
    products,
  };
};
