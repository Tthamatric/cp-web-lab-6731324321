import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { GreetForm } from "./greet-form";

describe("GreetForm", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders the form", () => {
    render(<GreetForm />);
    expect(
      screen.getByRole("heading", { name: "Say hello" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Get greeting" }),
    ).toBeInTheDocument();
  });

  it("updates the input value as the user types", () => {
    render(<GreetForm />);
    const input = screen.getByRole("textbox") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "6731324321" } });

    expect(input.value).toBe("6731324321");
  });

  it("displays the greeting message returned from the API", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ message: "Hello, friend!" }),
    });

    render(<GreetForm />);
    fireEvent.click(screen.getByRole("button", { name: "Get greeting" }));

    await waitFor(() => {
      expect(screen.getByText("Hello, friend!")).toBeInTheDocument();
    });
  });

  it("shows an error message when the fetch fails", async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(
      new Error("network error"),
    );

    render(<GreetForm />);
    fireEvent.click(screen.getByRole("button", { name: "Get greeting" }));

    await waitFor(() => {
      expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    });
  });
});
