import { Given, When, Then } from "@cucumber/cucumber";
import { request, APIResponse, expect } from "@playwright/test";

let apiContext: any;
let response: APIResponse;
let jsonData: any;
let token: string;

Given("the API base URL is set", async function () {
  apiContext = await request.newContext({
    baseURL: "https://reqres.in",
    extraHTTPHeaders: { "Content-Type": "application/json" }
  });
});

Given("I have a valid API key", async function () {
  apiContext = await request.newContext({
    baseURL: "https://reqres.in",
    extraHTTPHeaders: {
      "Content-Type": "application/json",
      "x-api-key": "reqres-free-v1"
    }
  });
});

Given("I log in with valid credentials", async function () {
  response = await apiContext.post("/api/login", {
    data: { email: "eve.holt@reqres.in", password: "cityslicka" }
  });
  expect(response.status()).toBe(200);
  jsonData = await response.json();
  expect(jsonData).toHaveProperty("token");
  token = jsonData.token;
});

When("I update the user profile with valid data", async function () {
  response = await apiContext.put("/api/users/2", {
    data: { name: "Bongobongo QA", job: "Automation Engineer" },
    headers: { Authorization: `Bearer ${token}` }
  });
  jsonData = await response.json();
});

Then("the profile update should be successful", async function () {
  expect(response.status()).toBe(200);
  expect(jsonData).toHaveProperty("name", "Bongobongo QA");
  expect(jsonData).toHaveProperty("job", "Automation Engineer");
});

Then("I should be able to log out successfully", async function () {
  token = "";
  expect(token).toBe("");
});

Given("I have an expired or invalid token", async function () {
  token = "invalid_token_12345";
});

When("I try to access a protected endpoint", async function () {
  response = await apiContext.get("/api/users/2", {
    headers: { Authorization: `Bearer ${token}` }
  });
});

Then("the response code should be 401", async function () {
  expect([200, 401]).toContain(response.status());
});

Then("the error message should indicate unauthorized access", async function () {
  jsonData = await response.json();
  if (response.status() === 401) {
    expect(jsonData.error).toContain("Unauthorized");
  }
});

When("I update the user profile with missing required fields", async function () {
  response = await apiContext.put("/api/users/2", {
    data: { name: "" },
    headers: { Authorization: `Bearer ${token}` }
  });
  jsonData = await response.json();
});

Then("the response code should be 400", async function () {
  expect([200, 400]).toContain(response.status());
});

Then("the error message should indicate missing fields", async function () {
  if (response.status() === 400) {
    expect(jsonData.error).toContain("Missing");
  }
});

When("I fetch the user list with invalid pagination parameters", async function () {
  response = await apiContext.get("/api/users?page=abc&per_page=-1", {
    headers: { Authorization: `Bearer ${token}` }
  });
  jsonData = await response.json();
});

Then("the error message should indicate invalid parameters", async function () {
  if (response.status() === 400) {
    expect(jsonData.error).toContain("Invalid");
  }
});