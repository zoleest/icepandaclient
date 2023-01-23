import { Route, useLocation, Routes } from "react-router-dom"


export default function Content({ routes }) {
    const location = useLocation();

    return (

        <Routes location={location} key={location.pathname}>
            {routes.map(route => (
                <Route key={route.path} path={route.path} element={route.element} />
            ))}
        </Routes>

    )
}