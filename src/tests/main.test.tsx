import {it, describe, expect, test} from "vitest";
import {screen, render} from "@testing-library/react";
import "@testing-library/jest-dom";

test("Renders without crashing", async () => {
    render(<div role={"cell"}>Hello, world!</div>);
    screen.debug();
    //expect(screen.getByRole("cell")).toBeInTheDocument();
    //expect(screen.queryByRole("code")).not.toBeInTheDocument();
    expect(screen.getByRole("cell")).toHaveTextContent("Hello, world!");
});