import {act, renderHook} from '@testing-library/react';
import {useSearchListToggle} from './use-search-list-toggle';

describe('Hook: UseSearchListToggle', () => {
  const handleSearchReset = vi.fn();

  it('should render hook properly', () => {
    const {result} = renderHook(() => useSearchListToggle(handleSearchReset));
    const {isClickedAway, searchRef, handleOpenList, handleCloseList} = result.current;

    expect(isClickedAway).toBe(false);
    expect(searchRef).toBeInstanceOf(Object);
    expect(handleOpenList).toBeInstanceOf(Function);
    expect(handleCloseList).toBeInstanceOf(Function);
  });

  it('should set isClickedAway with false when clicking handleOpenList', () => {
    const {result} = renderHook(() => useSearchListToggle(handleSearchReset));
    const {handleOpenList} = result.current;

    act(() => {
      handleOpenList();
    });
    const {isClickedAway} = result.current;

    expect(isClickedAway).toBe(false);
  });

  it('should set isClickedAway with true when clicking handleCloseList', () => {
    const {result} = renderHook(() => useSearchListToggle(handleSearchReset));
    const {handleCloseList} = result.current;

    act(() => {
      handleCloseList();
    });
    const {isClickedAway} = result.current;

    expect(isClickedAway).toBe(true);
  });
});
