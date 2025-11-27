import { describe, it, expect, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useDebounce } from "@/src/hooks/useDebounce";

describe("useDebounce", () => {
  it("초기값을 즉시 반환한다", () => {
    const { result } = renderHook(() => useDebounce("initial", 300));
    expect(result.current).toBe("initial");
  });

  it("지정된 delay 후에 값이 업데이트된다", async () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "initial", delay: 300 } }
    );

    expect(result.current).toBe("initial");

    rerender({ value: "updated", delay: 300 });

    expect(result.current).toBe("initial");

    await waitFor(
      () => {
        expect(result.current).toBe("updated");
      },
      { timeout: 400 }
    );
  });

  it("빠른 연속 변경 시 마지막 값만 반영된다", async () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: "first" } }
    );

    rerender({ value: "second" });
    rerender({ value: "third" });
    rerender({ value: "fourth" });

    expect(result.current).toBe("first");

    await waitFor(
      () => {
        expect(result.current).toBe("fourth");
      },
      { timeout: 400 }
    );
  });

  it("다양한 타입을 지원한다", async () => {
    const { result: stringResult } = renderHook(() =>
      useDebounce<string>("text", 100)
    );
    expect(stringResult.current).toBe("text");

    const { result: numberResult } = renderHook(() => useDebounce<number>(42, 100));
    expect(numberResult.current).toBe(42);

    const { result: objectResult } = renderHook(() =>
      useDebounce<{ name: string }>({ name: "test" }, 100)
    );
    expect(objectResult.current).toEqual({ name: "test" });
  });
});

