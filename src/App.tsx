import React from 'react';
import { Route, Routes } from 'react-router-dom';
import FundPage from './page/fundPage';
import ComparePage from './page/comparePage';
import LoginPage from './page/loginPage';
import FundDetailPage from './page/fundDetailPage';
import Missing from './page/missingPage';
import RegisterPage from './page/registerPage';
import CheckLogin from './loginComponent/checkLogin';
import RequireAuth from './loginComponent/RequireAuth';


const App: React.FC = () => {
  
  return (
      <Routes>
          {/* public routes */}
          <Route element={<CheckLogin />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>
          <Route element={<CheckLogin />}>
            <Route path="/register" element={<RegisterPage />} />
          </Route>
        
          {/* protect routes */}
          <Route element={<RequireAuth />}>
            <Route path="/" element={<FundPage />} />
          </Route>
          <Route element={<RequireAuth />}>
            <Route path="/fund" element={<FundPage />} />
          </Route>
          <Route element={<RequireAuth />}>
            <Route path="/detail/*" element={<FundDetailPage />} />
          </Route>
          <Route element={<RequireAuth />}>
            <Route path="/detail/performance/*" element={<FundDetailPage />} />
          </Route>
          <Route element={<RequireAuth />}>
            <Route path="/detail/port/*" element={<FundDetailPage />} />
          </Route>
          <Route element={<RequireAuth />}>
            <Route path="/detail/fee/*" element={<FundDetailPage />} />
          </Route>
          <Route element={<RequireAuth />}>
            <Route path="/compare" element={<ComparePage />} />
          </Route>
          <Route element={<RequireAuth />}>
            <Route path="/compare/performance" element={<ComparePage />} />
          </Route>
          <Route element={<RequireAuth />}>
            <Route path="/compare/port" element={<ComparePage />} />
          </Route>
          <Route element={<RequireAuth />}>
            <Route path="/compare/fee" element={<ComparePage />} />
          </Route>

          {/* catch all */}
          <Route path="*" element={<Missing />} />
      </Routes>
  );
};

export default App;
