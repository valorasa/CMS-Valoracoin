import { BrowserRouter, Routes, Route } from "react-router-dom";

import PageNotFound from "./shared/pages/404";
import ImpactPage from "./pages/Impacts";
import ImpactForm from "./pages/Impacts/form";
import CreateUserPage from "./pages/Users/forms";
import CreateCompensation from "./pages/Compensation/forms";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<ImpactPage />} />
          <Route path="new" element={<ImpactForm />} />
          <Route path="edit/:id" element={<ImpactForm />} />
        </Route>
        <Route path="usuarios">
          <Route index element={<CreateUserPage />} />
        </Route>
        <Route path="compensação">
          <Route index element={<CreateCompensation />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
