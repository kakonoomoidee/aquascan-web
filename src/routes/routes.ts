// src/routes/routes.ts
export const ROUTES = {
  root: "/",
  login: "/login",
  dashboard: "/dashboard",
  users: {
    add: "/users/add",
    list: "/users/list",
  },
  clients: {
    list: "/clients",
    detail: (nosbg: string) => `/clients/${nosbg}`,
    detailPath: "/clients/:nosbg",
  },
  tasks: "/tasks",
  validation: "/validation",
};
