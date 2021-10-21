import React from 'react';
import './NavBar.css';
import { useEffect } from 'react';
import logoSm from './assets/nittLogo.png';
import logoLg from './assets/nittLogoWide.png'
import { Link } from 'react-router-dom';
import { axiosInstance } from '../../utils/axios';


const data = [{
	href: '/home',
	text: 'Home'
},
{
	href: '/research',
	text: 'Projects'
},
{
	href: '/labs',
	text: 'Labs'
},
{
	href: '/centers-of-excellence',
	text: 'Centers'
},
{
	href: '/professors',
	text: 'Professors'
}
];
const  NavBar = (props:any) => {
	const {toggleSideBar,toggleSideBarMobile,hamburger} = props;

    return (
			<nav className="bg-red-800 flex-1" style={{overflow: 'hidden',boxShadow: '0 0px 10px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'}}>
				<div className="container max-w-7xl sm:px-8 mx-auto pb-4 px-2">
					<div className="hidden sm:flex sm:justify-between">
						<img src={logoLg} className="sm:h-16 md:h-24" alt="NITT LOGO"/>
						<button type="button" onClick={toggleSideBar} style={{display:hamburger}}>
							<svg className="block h-9 w-9  rounded-md hover:bg-red-900 px-1 text-gray-100 hover:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
							</svg>
						</button>
					</div>

					<div className="flex justify-around sm:hidden">
						<img src={logoSm} className="h-20" alt="NITT LOGO"/>
						<button type="button" onClick={toggleSideBarMobile}>
							<svg className="block h-9 w-9  rounded-md hover:bg-red-900 px-1 text-gray-100 hover:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
							</svg>
						</button>
					</div>
					<div className="hidden sm:block" >
						<div className="flex justify-end">
							{data.map((val, key)=> {
								return (<Link to={val.href} key={key} className="text-gray-300 ml-10 px-3 py-1 rounded-md text-md hover:text-white hover:bg-red-900 font-medium">{val.text}</Link>);
							})}
							{/* {(!user)?<Link to='/login' className="text-gray-300 ml-10 px-3 py-1 rounded-md text-md hover:text-white hover:bg-red-900 font-medium">Login</Link>:<div><button className="text-gray-300 ml-10 px-3 py-1 rounded-md text-md hover:text-white hover:bg-red-900 font-medium" onClick={logout}>Logout</button></div>} */}
						</div>
					</div>
				</div>
			</nav>
    );
}

export default NavBar;
