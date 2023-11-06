import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import Product from './pages/product';
import Category from './pages/category';
import Profile from './pages/profile';
import Index from './pages';
import Guest from "./middleware/guest"
import Auth from "./middleware/auth"

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Auth><Index /></Auth>} />
				<Route path="/login" element={<Guest><Login /></Guest>} />
				<Route path="/register" element={<Guest><Register /></Guest>} />
				<Route path="/product" element={<Auth><Product /></Auth>} />
				<Route path="/category" element={<Auth><Category /></Auth>} />
				<Route path="/profile" element={<Auth><Profile /></Auth>} />
			</Routes>
		</BrowserRouter>
	);
}
