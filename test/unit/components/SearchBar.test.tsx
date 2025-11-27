import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchBar } from "@/src/components/molecules/SearchBar";

describe("SearchBar", () => {
  it("placeholder가 올바르게 표시된다", () => {
    render(
      <SearchBar
        value=""
        onChange={vi.fn()}
        placeholder="Search DApps..."
      />
    );

    expect(screen.getByPlaceholderText("Search DApps...")).toBeInTheDocument();
  });

  it("초기값이 올바르게 표시된다", () => {
    render(
      <SearchBar
        value="Uniswap"
        onChange={vi.fn()}
      />
    );

    expect(screen.getByDisplayValue("Uniswap")).toBeInTheDocument();
  });

  it("입력 시 debounce가 적용된다", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(
      <SearchBar
        value=""
        onChange={onChange}
        debounceDelay={300}
      />
    );

    const input = screen.getByRole("textbox");
    
    onChange.mockClear();
    
    await user.type(input, "Uni");

    await waitFor(
      () => {
        expect(onChange).toHaveBeenCalledWith("Uni");
      },
      { timeout: 400 }
    );
  });

  it("Clear 버튼이 값이 있을 때만 표시된다", async () => {
    const user = userEvent.setup();
    const { rerender } = render(
      <SearchBar value="" onChange={vi.fn()} />
    );

    expect(screen.queryByLabelText("Clear search")).not.toBeInTheDocument();

    rerender(<SearchBar value="test" onChange={vi.fn()} />);

    const input = screen.getByRole("textbox");
    await user.type(input, "t");

    await waitFor(() => {
      expect(screen.getByLabelText("Clear search")).toBeInTheDocument();
    });
  });

  it("Clear 버튼 클릭 시 입력이 초기화된다", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(
      <SearchBar value="" onChange={onChange} />
    );

    const input = screen.getByRole("textbox");
    await user.type(input, "test");

    await waitFor(() => {
      expect(screen.getByLabelText("Clear search")).toBeInTheDocument();
    });

    const clearButton = screen.getByLabelText("Clear search");
    await user.click(clearButton);

    expect(input).toHaveValue("");
  });

  it("커스텀 debounce delay가 적용된다", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(
      <SearchBar
        value=""
        onChange={onChange}
        debounceDelay={100}
      />
    );

    const input = screen.getByRole("textbox");
    await user.type(input, "fast");

    await waitFor(
      () => {
        expect(onChange).toHaveBeenCalledWith("fast");
      },
      { timeout: 200 }
    );
  });
});

