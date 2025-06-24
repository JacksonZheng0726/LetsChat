import { it, expect} from 'vitest';
import { renderHook } from '@testing-library/react';
import { useAppContext } from '../../app/AppContext'; 

it('should throw error when used outside of PostProvider', () => {
  expect(() => {
    renderHook(() => useAppContext());
  }).toThrow('context usage issue');
});