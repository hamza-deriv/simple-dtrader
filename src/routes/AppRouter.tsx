import { BrowserRouter, Switch, Route, Link } from "react-router-dom"
// import { HomePage } from "../components/pages/Homepage"
// import  LoginPage  from "../components/pages/LoginPage"

export const AppRouter: React.FC = () => {
    return (
        // <BrowserRouter >
            <Switch>
                {/* <Route path='/' element={<HomePage />} />
                <Route path='login' element={<LoginPage />} /> */}

                {/* <Route path='*' element={<Navigate to='/login' replace />} /> */}
            </Switch>
        // </BrowserRouter>
        
    )
}