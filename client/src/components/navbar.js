import axios from 'axios'
import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import api from "../configs/api"
import Swal from 'sweetalert2'

export default function Navbar() {
	const navigate = useNavigate()
	const logout = () => {
		Swal.fire({
			title: 'Logout?',
			text: "Anda akan keluar dan tidak memiliki akses aplikasi",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Ya',
			cancelButtonText: 'Tidak'
		}).then((result) => {
			if(result.isConfirmed) {
				axios.delete(api.apiLogout).then(res => {
					if(res.status == 200) {
						localStorage.removeItem('accessToken')
						Swal.fire({
							position: 'center',
							icon: 'success',
							title: 'Anda Telah Logout',
							showConfirmButton: false,
							timer: 1500
						})
						setTimeout(() => {
							navigate('/login')
						}, 2000)
					}
				}).catch(err => {
					Swal.fire({
						icon: 'error',
						title: 'Oops...',
						text: 'terjadi kesalahan',
					})
				})
			}
		})

	}

	return (
		<>
			<nav className="navbar navbar-expand-lg bg-body-tertiary ">
				<div className="container-fluid">
					<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon" />
					</button>
					<div className="collapse navbar-collapse d-lg-flex justify-content-between" id="navbarSupportedContent">
						<ul className="navbar-nav">
							<li className="nav-item">
								<Link className="nav-link fw-bold fs-5 me-3" aria-current="page" to={"/"}>Home</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link fw-bold fs-5 me-3" aria-current="page" to={"/product"}>Product</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link fw-bold fs-5 me-3" aria-current="page" to={"/category"}>Category</Link>
							</li>
						</ul>
						<ul className="navbar-nav">
							<li className="nav-item">
								<Link className="nav-link fw-bold fs-5 me-3" aria-current="page" to={"/profile"}>Achmad Alvin Ardiansyah</Link>
							</li>
							<li className="nav-item">
								<a className="nav-link fw-bold fs-5 me-3" href='#' onClick={logout}>Logout</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>

		</>
	)
}
