import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import fetchMock from "jest-fetch-mock";
import UserProfile from "./UserProfile";
import { BrowserRouter as Router } from "react-router-dom";


jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    userName: "mayankmj25", 
  }),
}));

beforeEach(() => {
  fetchMock.resetMocks();
});

test("loads and displays user profile", async () => {
  fetchMock.mockResponseOnce(JSON.stringify({
    name: "Mayank Jaiswal",
    bio: null, 
    avatar_url: "https://avatars.githubusercontent.com/u/84842694?v=4",
    public_repos: 28,
  }));

  render(
    <Router>
      <UserProfile />
    </Router>
  );

  await waitFor(() => {
    expect(screen.getByText("Mayank Jaiswal")).toBeInTheDocument();
    // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
    expect(screen.getByText("No bio available.")).toBeInTheDocument();
    // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
    expect(screen.getByText("Repositories: 28")).toBeInTheDocument();
    // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
    expect(screen.getByRole("img")).toHaveAttribute("src", "https://avatars.githubusercontent.com/u/84842694?v=4");
  });
});

  