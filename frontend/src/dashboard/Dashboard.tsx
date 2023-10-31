import { useEffect, useState } from 'react';
import {
	NavLink,
	Navigate,
	Route,
	Routes,
	useNavigate,
} from 'react-router-dom';
import headerLogo from '../assets/icons/credit-cards.png';
import defaultUserLogo from '../assets/images/default-user.png';
import { dashboardRoutes } from './routes/dashboard.routes';
import { auth } from '../routes/AppRouter';

export const Dashboard = () => {
	const navigate = useNavigate();
	const [username, setUsername] = useState<string | null>('');

	useEffect(() => {
		document.title = 'Dashboard';
		if (auth.username) setUsername(auth.username);
		else navigate('/');
	}, [navigate]);

	return (
		<div className='container'>
			<header className='header'>
				<img
					className='header__logo'
					src={headerLogo}
					alt='Dashboard logo'
				/>
				<div className='user-nav'>
					<div className='user-nav__user'>
						<img
							className='user-nav__user-photo'
							src={defaultUserLogo}
							alt='User logo'
						/>
						<span className='user-nav__user-name'>{username}</span>
					</div>
				</div>
			</header>

			<div className='content'>
				<nav className='sidebar'>
					<ul className='side-nav'>
						{dashboardRoutes.map(({ to, name, iconUrl }) => (
							<li
								className='side-nav__item side-nav__item--active'
								key={to}
							>
								<NavLink className={'side-nav__link'} to={to}>
									<img
										className='side-nav__icon'
										src={iconUrl}
									/>
									<span>{name}</span>
								</NavLink>
							</li>
						))}
					</ul>

					<div className='legal'>
						&copy; 2023 by Andrés Ornelas. All rights reserved.
					</div>
				</nav>

				<main className='section-view'>
					<Routes>
						{
							dashboardRoutes.map(({ to, Component, Provider }) => (
                <Route
                  key={to}
                  path={to}
                  element={ (Provider) 
                              ? (<Provider><Component/></Provider>) 
                              : (<Component />)
                  }
                />
              ))
						}
						<Route
							path='*'
							element={ <Navigate to={dashboardRoutes[0].to} replace />	}
						/>
					</Routes>
				</main>
			</div>
		</div>
	);
};

export default Dashboard;
