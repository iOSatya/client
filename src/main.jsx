import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'

import App from './App.jsx';
import HomeView from './views/HomeView.jsx';
import UserListView from './views/UserListView.jsx';
import AddUserView from './views/AddUserView.jsx';

const router = createBrowserRouter([
  { path: "/", Component: App, children: [
    { path: "", Component: HomeView },
    { path: "user-list", Component: UserListView },
    { path: "add-user", Component: AddUserView }
  ] }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
