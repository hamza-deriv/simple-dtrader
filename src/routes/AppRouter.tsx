import { BrowserRouter, Switch, Route, Link } from "react-router-dom"
import { HomePage } from "../pages/Homepage"
import  LoginPage  from "../pages/LoginPage"

export const AppRouter: React.FC = () => {
    return (
        // <BrowserRouter >
            <Switch>
                <Route path='/' element={<HomePage />} />
                <Route path='login' element={<LoginPage />} />

                {/* <Route path='*' element={<Navigate to='/login' replace />} /> */}
            </Switch>
        // </BrowserRouter>
        
    )
}