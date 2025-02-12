import React from 'react'
import { useEffect } from 'react'

// ** Router Components
import {
	BrowserRouter as AppRouter,
	Route,
	Routes,
	useNavigate,
} from 'react-router-dom'

// ** Routes & Default Routes
import { LoginRoute, AllRoutes } from './routes'

const Router = () => {
	return (
		<AppRouter>
			<Routes>
				{AllRoutes.map((route) => (
					<Route
						key={route.path}
						path={route.path}
						element={<PrivateRoute>{route.component}</PrivateRoute>}
					/>
				))}
				<Route exact path={LoginRoute.path} element={LoginRoute.component} />
			</Routes>
		</AppRouter>
	)
}

export default Router

const PrivateRoute = (props) => {
	const navigate = useNavigate()
	const { children } = props

	useEffect(() => {
		if (!localStorage.getItem('token')) {
			navigate('/login')
		}
	})

	if (!localStorage.getItem('token')) {
		return <></> //TODO: Add loading indicator
	}

	return children
}
