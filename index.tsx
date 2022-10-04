import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
// setup redux
import { Provider } from "react-redux";
import { store } from "./redux/configStore";
// setup router-dom
import { createBrowserHistory } from "history";
import {
  unstable_HistoryRouter as HistoryRouter,
  Routes,
  Route,
  Navigate,
  createRoutesFromElements,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import HomeTemplate from "./templates/HomeTemplate";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Cart from "./pages/Cart/Cart";
import Search from "./pages/Search/Search";
import Profile from "./pages/Profile/Profile";
import { http } from "./util/setting";
import Loading from "./components/Loading";
import AdminTemplate from "./templates/AdminTemplate";
import AdminIndex from "./pages/Admin/AdminIndex/AdminIndex";
import Users from "./pages/Admin/Users/Users";
import Products from "./pages/Admin/Products/Products";
// history giúp chuyển hướng trang ở những trang ko phãi component npm i history
//setup antd
import 'antd/dist/antd.css';
// lazy load
const Detail: React.FC = lazy(() => import("./pages/Detail/Detail"));

export const history = createBrowserHistory();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const routerReact = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="" element={<HomeTemplate></HomeTemplate>}>
        <Route index element={<Home></Home>}></Route>
        <Route path="login" element={<Login></Login>}></Route>
        <Route path="register" element={<Register></Register>}></Route>
        <Route path="cart" element={<Cart></Cart>}></Route>
        <Route path="search" element={<Search></Search>}></Route>
        <Route path="profile" element={<Profile></Profile>}></Route>
        <Route path="detail">
          <Route
            path=":id"
            loader={async ({ request, params }) => {
              let id = params.id;
              let result = await http.get(`/Product/getbyid?id=${id}`);
              return result.data.content;
            }}
            element={
              <Suspense fallback={<Loading></Loading>}>
                <Detail></Detail>
              </Suspense>
            }
          ></Route>
        </Route>
        <Route path="*" element={<Navigate to=""></Navigate>}></Route>
      </Route>

      <Route path="/admin" element={<AdminTemplate></AdminTemplate>}>
        <Route index element={<AdminIndex></AdminIndex>}></Route>
        <Route path="users" element={<Users></Users>}></Route>
        <Route path="products" element={<Products></Products>}></Route>
        <Route path="*" element={<Navigate to="/admin"></Navigate>}></Route>
      </Route>
    </>
  )
);

root.render(
  <Provider store={store}>
    <RouterProvider router={routerReact}></RouterProvider>
  </Provider>
  // <Provider store={store}>
  //   <HistoryRouter history={history}>
  //     <Routes>
  //       <Route path="" element={<HomeTemplate></HomeTemplate>}>
  //         <Route index element={<Home></Home>}></Route>
  //         <Route path="login" element={<Login></Login>}></Route>
  //         <Route path="register" element={<Register></Register>}></Route>
  //         <Route path="cart" element={<Cart></Cart>}></Route>
  //         <Route path="search" element={<Search></Search>}></Route>
  //         <Route path="profile" element={<Profile></Profile>}></Route>
  //         <Route path="detail">
  //           <Route
  //             path=":id"
  //             element={
  //               <Suspense fallback={<div>loading ...</div>}>
  //                 <Detail></Detail>
  //               </Suspense>
  //             }
  //           ></Route>
  //         </Route>
  //         <Route path="*" element={<Navigate to=""></Navigate>}></Route>
  //       </Route>
  //     </Routes>
  //   </HistoryRouter>
  // </Provider>
);
