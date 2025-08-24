import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  vus: 10,
  duration: "30s",
  thresholds: {
    http_req_duration: ["p(95)<500"],
    http_req_failed: ["rate<0.01"],
  },
};

export default function () {
  let loginRes = http.post("https://reqres.in/api/login", JSON.stringify({
    email: "eve.holt@reqres.in",
    password: "cityslicka",
  }), { headers: { "Content-Type": "application/json" } });

  check(loginRes, {
    "Login response is 200": (r) => r.status === 200,
    "Token exists": (r) => r.json("token") !== undefined,
  });

  let token = loginRes.json("token");

  let updateRes = http.put("https://reqres.in/api/users/2", JSON.stringify({
    name: "Bongobongo QA",
    job: "Automation Engineer",
  }), {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  check(updateRes, {
    "Update response is 200": (r) => r.status === 200,
    "Update contains correct name": (r) => r.json("name") === "Bongobongo QA",
  });

  token = "";

  sleep(1);
}