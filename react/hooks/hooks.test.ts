/**
 * @jest-environment jsdom
 */
import { renderHook, act, render, waitFor } from "@testing-library/react";
import { useLoading } from "./useLoading";

describe("[useLoading]", () => {
  test("UseLoading should return loading after provided number of ms ", async () => {
    const { result } = renderHook(() =>
      useLoading({ loading: true, duration: 500 })
    );

    expect(result.current).toBe(false);

    await waitFor(() => expect(result.current).toBe(true), { timeout: 600 });
  });
});
