/**
 * @jest-environment jsdom
 */
import { renderHook, act, render, waitFor } from "@testing-library/react";
import { useLoading } from "./useLoading";

describe("[useLoading]", () => {
  test("UseLoading should return loading after provided number of ms ", async () => {
    let loading = true;
    const { result, rerender } = renderHook(() =>
      useLoading({ loading, duration: 200 })
    );

    expect(result.current).toBe(false);

    await waitFor(() => expect(result.current).toBe(true), { timeout: 300 });
    
    loading = false;
    rerender();
    expect(result.current).toBe(false);

  });
});
