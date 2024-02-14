import { Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import Authmiddleware from "./route";
import { user_roles } from "../config/user.config";
import ProtectedLayout from "../components/templates/ProtectedLayout";
import PublicLayout from "../components/templates/PublicLayout";
// import Spinner from "../components/atoms/Spinner";
// import DeepLinkRedirect from "../pages/deeplink";

// // eslint-disable-next-line react/display-name
const Loadable = Component => props =>
  (
    <Suspense fallback={
      <div>
        Loading...
      </div>
    }>
      <Component {...props} />
    </Suspense>
  )

// ADMIN PAGE START
const AdminDashboardPage = Loadable(lazy(() => import("../pages/admin/dashboard/index")))
// ADMIN PAGE END

// MERCHANT PAGE START
const AgentDashboardPage = Loadable(lazy(() => import("../pages/agent/dashboard/index")))
// MERCHANT PAGE END

const LoginPage = Loadable(lazy(() => import("../pages/login/index")))

// PUBLIC PAGE START
const NotFoundPage = Loadable(lazy(() => import("../pages/404")))
const UnauthorizedPage = Loadable(lazy(() => import("../pages/401")))
const ForbiddenPage = Loadable(lazy(() => import("../pages/403")))
// PUBLIC PAGE END

const authProtectedRoutes = [
  {
    path: "admin",
    element: (
      <Authmiddleware role={user_roles["ADMIN"]}>
        <ProtectedLayout />
      </Authmiddleware>
    ),
    children: [
      {
        path: "dashboard",
        element: <AdminDashboardPage />,
      },
    ],
  },
  {
    path: "agent",
    element: (
      <Authmiddleware role={user_roles["MERCHANT"]}>
        <ProtectedLayout />
      </Authmiddleware>
    ),
    children: [
      {
        path: "dashboard",
        element: <AgentDashboardPage />,
      },
    ],
  },
  {
    path: "*",
    children: [
      {
        path: "", // equivalent to 👉 / to fix react-router bug
        element: <Navigate to="/login" />,
      },
    ],
  },
];

const publicRoutes = [
  {
    path: "login",
    element: (
      <PublicLayout />
    ),
    children: [
      {
        path: "",
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "*",
    element: (
      <PublicLayout />
    ),
    children: [
      {
        path: "401",
        element: <UnauthorizedPage />,
      },
      {
        path: "404",
        element: <NotFoundPage />,
      },
      {
        path: "403",
        element: <ForbiddenPage />,
      }
    ],
  },
];

export { authProtectedRoutes, publicRoutes };