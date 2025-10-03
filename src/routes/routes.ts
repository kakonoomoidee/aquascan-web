// src/routes/routes.ts
import { encodeId } from "@src/utils/idObfuscator";

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

    detail: (nosbg: string) => `/clients/${encodeId(nosbg)}`,
    detailPath: "/clients/:encodedNosbg",
  },
  tasks: "/tasks",
  validation: "/validation",
};
