import type {MouseEvent} from 'react';
import {act, renderHook, waitFor} from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import {StatusCodes} from 'http-status-codes';
import {httpApi} from '@/shared/api';
import {queryClientWrapper} from '@/shared/lib/query-client-wrapper';
import {Domen} from '@/entities/products/enums';
import {useProductReviews} from './use-product-reviews';
import {REVIEWS_PER_PAGE} from '../../config';
import {productReviewsMock} from '../../mocks';

describe('Hook: useProductReviews', () => {
  const mockAxiosAdapter = new MockAdapter(httpApi);
  const clickEvent = {preventDefault: vi.fn()} as unknown as MouseEvent<HTMLButtonElement>;
  const productId = '9';
  const wrapper = queryClientWrapper();

  it('should return array with right values', () => {
    const {result} = renderHook(() => useProductReviews(productId), {wrapper});
    const current = result.current;

    expect(current).toBeInstanceOf(Array);
    expect(current.length).toBe(3);
    expect(current[0]).toBeInstanceOf(Array);
    expectTypeOf(current[1]).toBeBoolean();
    expect(current[2]).toBeInstanceOf(Function);
  });

  it('should return sorted reviews if status 200', async () => {
    const expectedReviews = [...productReviewsMock]
      .sort((a, b) => (new Date(b.createAt).getTime() - new Date(a.createAt).getTime()))
      .slice(0, REVIEWS_PER_PAGE);
    mockAxiosAdapter
      .onGet(`${Domen.Cameras}/${productId}${Domen.Reviews}`)
      .reply(StatusCodes.OK, productReviewsMock);

    const {result} = renderHook(() => useProductReviews(productId), {wrapper});
    await waitFor(() => {
      expect(result.current[0]).toEqual(expectedReviews);
    });

    expect(result.current[1]).toBe(true);
  });

  it('should show next reviews when show more btn clicked', async () => {
    const expectedReviews = [...productReviewsMock]
      .sort((a, b) => (new Date(b.createAt).getTime() - new Date(a.createAt).getTime()))
      .slice(0, REVIEWS_PER_PAGE * 2);
    mockAxiosAdapter
      .onGet(`${Domen.Cameras}/${productId}${Domen.Reviews}`)
      .reply(StatusCodes.OK, productReviewsMock);

    const {result} = renderHook(() => useProductReviews(productId), {wrapper});
    const handleShowMoreBtnClick = result.current[2];
    act(() => {
      handleShowMoreBtnClick(clickEvent);
    });
    await waitFor(() => {
      expect(result.current[0]).toEqual(expectedReviews);
    });

    expect(result.current[1]).toBe(true);
  });

  it('should not show "show more button" if last bunch of reviews shown', async () => {
    const responseReviews = productReviewsMock.slice(0, REVIEWS_PER_PAGE * 2);
    const expectedReviews = [...responseReviews]
      .sort((a, b) => (new Date(b.createAt).getTime() - new Date(a.createAt).getTime()))
      .slice(0, REVIEWS_PER_PAGE);

    mockAxiosAdapter
      .onGet(`${Domen.Cameras}/${productId}${Domen.Reviews}`)
      .reply(StatusCodes.OK, responseReviews);

    const {result} = renderHook(() => useProductReviews(productId), {wrapper});
    await waitFor(() => {
      expect(result.current[0]).toEqual(expectedReviews);
    });
    const [, , handleShowMoreBtnClick] = result.current;
    act(() => {
      handleShowMoreBtnClick(clickEvent);
    });

    expect(result.current[1]).toBe(false);
  });
});
