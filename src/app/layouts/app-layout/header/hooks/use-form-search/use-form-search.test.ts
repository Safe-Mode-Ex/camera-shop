import type {ChangeEvent, JSX, ReactNode} from 'react';
import {act, renderHook, waitFor} from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import {StatusCodes} from 'http-status-codes';
import {queryClientWrapper} from '@/shared/lib/query-client-wrapper';
import {httpApi} from '@/shared/api';
import {productsMock} from '@/shared/model';
import {Domen} from '@/entities/products';
import {useFormSearch} from './use-form-search';

describe('Hook: UseFormSearch', () => {
  let wrapper: ({children}: {children: ReactNode;}) => JSX.Element;

  beforeEach(() => {
    wrapper = queryClientWrapper();

    const mockAxiosAdapter = new MockAdapter(httpApi);
    mockAxiosAdapter.onGet(Domen.Cameras).reply(StatusCodes.OK, productsMock);
  });

  it('should render hook properly', () => {
    const {result} = renderHook(useFormSearch, {wrapper});
    const {current: {
      inputValue,
      searchValue,
      handleInput,
      isListOpened,
      products: searchResult,
    }} = result;

    expect(inputValue).toBe('');
    expect(searchValue).toBe('');
    expect(handleInput).toBeInstanceOf(Function);
    expect(isListOpened).toBe(false);
    expect(searchResult).toBeInstanceOf(Array);
  });

  it('should not show products list if input value less than 3 symbols', async () => {
    const value = 'pr';

    const {result} = renderHook(useFormSearch, {wrapper});
    const {handleInput} = result.current;
    act(() => {
      handleInput({target: {value}} as ChangeEvent<HTMLInputElement>);
    });

    await waitFor(() => {
      const {searchValue, isListOpened} = result.current;
      expect(searchValue).toBe(value);
      expect(isListOpened).toBe(false);
    });
  });

  it('should not show products list if input value greater than or equal 3 symbols', async () => {
    const value = 'pro';

    const {result} = renderHook(useFormSearch, {wrapper});
    const {handleInput} = result.current;
    act(() => {
      handleInput({target: {value}} as ChangeEvent<HTMLInputElement>);
    });

    await waitFor(() => {
      const {searchValue, isListOpened} = result.current;
      expect(searchValue).toBe(value);
      expect(isListOpened).toBe(true);
    });
  });
});
