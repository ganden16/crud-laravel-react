import React, {useState} from 'react';
import {
	MDBContainer,
	MDBInput,
	MDBBtn,
} from 'mdb-react-ui-kit';
import {Link, useNavigate} from 'react-router-dom';
import api from "../configs/api"
import axios from 'axios';
import Swal from 'sweetalert2';

function Login() {
	const initialForm = {
		email: "admin@gmail.com",
		password: "password",
	}
	const [form, setForm] = useState(initialForm)
	const navigate = useNavigate()

	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		})
	}

	const handleClickLogin = async () => {
		try {
			let response = await axios.post(api.apiLogin, {
				email: form.email,
				password: form.password
			})
			if(response.status == 200) {
				localStorage.setItem('accessToken', response.data.token)
				Swal.fire({
					position: 'center',
					icon: 'success',
					title: 'Login Sukses',
					showConfirmButton: false,
					timer: 1500
				})
				setTimeout(() => {
					navigate('/')
				}, 2000)
			}
		} catch(error) {
			Swal.fire({
				icon: 'error',
				title: error.response.data.errors.message,
				text: 'coba lagi',
			})
		}
	}

	return (
		<MDBContainer className="p-3 my-5 d-flex flex-column w-50">
			<div className="text-center mb-3">
				<h3 className="text-center mt-3">Login</h3>
			</div>
			<MDBInput onChange={handleChange} value={form.email} wrapperClass='mb-4' label='Email' id='email' name='email' type='email' />
			<MDBInput onChange={handleChange} value={form.password} wrapperClass='mb-4' label='Password' id='password' name='password' type='password' />

			<MDBBtn onClick={handleClickLogin} className="mb-4">Sign in</MDBBtn>

			<div className="text-center">
				<p>Not a member? <Link to={"/register"}>Register</Link></p>
			</div>

		</MDBContainer>
	);
}

export default Login;