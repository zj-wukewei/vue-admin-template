export function login(params) {
  if (params && params.userName === "admin" && params.userName === "admin") {
    return Promise.resolve({
      token: "adminToken",
      userId: "1",
    });
  }
  return Promise.reject();
}
