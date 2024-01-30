import React from "react";
import { render, screen } from "@testing-library/react";

import LaravelJsonPage from "../LaravelJsonPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders laravelJson page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <LaravelJsonPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("laravelJson-datatable")).toBeInTheDocument();
    expect(screen.getByRole("laravelJson-add-button")).toBeInTheDocument();
});
