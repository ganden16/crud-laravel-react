import React from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from 'axios';

// axios.defaults.headers.common['Authorization'] = localStorage.getItem('accessToken') ? `Bearer ${localStorage.getItem('accessToken')}` : '';
axios.interceptors.request.use((config) => {
	config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
	return config
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
