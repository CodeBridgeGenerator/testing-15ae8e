import React from "react";
import { render, screen } from "@testing-library/react";

import RelationPage from "../RelationPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders relation page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <RelationPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("relation-datatable")).toBeInTheDocument();
    expect(screen.getByRole("relation-add-button")).toBeInTheDocument();
});
