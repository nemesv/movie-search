import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { SearchForm } from "./SearchForm";

describe("SearchForm", () => {
  it("renders the given label", () => {
    render(<SearchForm label="mylabel" />);
    //mui/TextField renders the label multiple times in the DOM
    expect(screen.getAllByText("mylabel").length).toBeGreaterThan(0);
  });

  it("renders the defaultValue in the input", () => {
    render(<SearchForm defaultValue="myValue" />);
    expect(screen.getByDisplayValue("myValue")).toBeInTheDocument();
  });

  it("calls onSearch with the input value on Search click", () => {
    const onSearch = jest.fn();
    render(<SearchForm label="mylabel" onSearch={onSearch} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "myValue" } });

    const searchButton = screen.getByText("Search");
    fireEvent.click(searchButton);

    expect(onSearch).toHaveBeenCalledWith("myValue");
  });

  it("calls onSearch with the input value on Enter", () => {
    const onSearch = jest.fn();
    render(<SearchForm label="mylabel" onSearch={onSearch} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "myValue" } });

    fireEvent.keyDown(input, { key: "Enter" });

    expect(onSearch).toHaveBeenCalledWith("myValue");
  });
});
