import {MDBBtn} from 'mdb-react-ui-kit'
import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Navbar from '../components/navbar'
import Swal from 'sweetalert2'
import api from '../configs/api'
import axios from 'axios'

export default function Profile() {
	const navigate = useNavigate()

	const [form, setForm] = useState({})
	const [errors, setErrors] = useState({})
	const [modalCancel, setModalCancel] = useState(false)

	const handleChange = (e) => {
		setModalCancel(true)
		setForm({
			...form,
			[e.target.name]: e.target.value,
		})
	}

	const handleClickBack = () => {
		modalCancel &&
			Swal.fire({
				title: "Do you won't to save the changes?",
				showDenyButton: true,
				showCancelButton: true,
				showConfirmButton: false,
				denyButtonText: `Don't save`,
			}).then((result) => {
				if(result.isDenied) {
					Swal.fire('Changes are not saved', '', 'info')
					setTimeout(() => {
						navigate('/product')
					}, 2000)
				}
			})

		!modalCancel && navigate('/product')
	}
	const handleClickSave = async () => {
		Swal.fire({
			title: 'Update User',
			text: "Save Change?",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes',
			cancelButtonText: 'Cancel'
		}).then(async (result) => {
			if(result.isConfirmed) {
				try {
					let response = await axios.put(api.apiUpdateUser, {
						name: form.name,
						email: form.email,
						telephone: form.telephone,
						gender: form.gender,
						address: form.address,
						city: form.city,
						province: form.province,
						country: form.country,
					})
					if(response.status == 200) {
						Swal.fire({
							position: 'center',
							icon: 'success',
							title: 'Update Profil Sukses',
							showConfirmButton: false,
							timer: 1500
						})
					}
				} catch(error) {
					console.log(error)
					if(error.response.status == 422) {
						setErrors(error.response.data.errors)
					}
					Swal.fire({
						icon: 'error',
						title: 'Terjadi Kesalahan Input',
						text: 'masukkan inputan dengan benar',
					})
				}
			}
		})
	}

	useEffect(() => {
		axios.get(api.apiMe).then(res => {
			setForm(res.data.user)
		})
	}, [])

	console.log(errors)

	return (
		<>
			<Navbar />
			<div className='py-3 d-flex justify-content-center'>
				<div className="card w-75">
					<div className="card-body">
						<div>
							<h3 className='text-center mb-4'>Your Profile</h3>
							<div className="mb-3 row">
								<label htmlFor="role" className="col-sm-2 col-form-label">Role</label>
								<div className="col-sm-10">
									<input type="text" readOnly className="form-control-plaintext" id="role" value={form.role_id == 1 ? 'Admin' : 'User'} />
								</div>
							</div>
							<div className="mb-3 row">
								<label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
								<div className="col-sm-10">
									<input onChange={handleChange} value={form.name} className="form-control" name='name' id="name" />
									{
										errors.name &&
										errors.name.map(err => <span className='text-danger mb-0 pb-0 me-3'>{err}</span>)
									}
								</div>
							</div>
							<div className="mb-3 row">
								<label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
								<div className="col-sm-10">
									<input onChange={handleChange} value={form.email} className="form-control" id="email" name='email' />
									{
										errors.email &&
										errors.email.map(err => <span className='text-danger mb-0 pb-0 me-3'>{err}</span>)
									}
								</div>
							</div>
							<div className="mb-3 row">
								<label htmlFor="telephone" className="col-sm-2 col-form-label">Telephone</label>
								<div className="col-sm-10">
									<input onChange={handleChange} value={form.telephone} className="form-control" id="telephone" name='telephone' />
								</div>
							</div>
							<div className="mb-3 row">
								<label htmlFor="gender" className="col-sm-2 col-form-label">Gender</label>
								<div className="col-sm-10">
									<select onChange={handleChange} value={form.gender} className="form-select" id='gender' name='gender' aria-label="Default select example">
										<option value={""}>Select Gender</option>
										<option value="0">Male</option>
										<option value="1">Female</option>
									</select>
									{
										errors.gender &&
										errors.gender.map(err => <span className='text-danger mb-0 pb-0 me-3'>{err}</span>)
									}
								</div>
							</div>
							<div className="mb-3 row">
								<label htmlFor="address" className="col-sm-2 col-form-label">Address</label>
								<div className="col-sm-10">
									<input onChange={handleChange} value={form.address} className="form-control" id="address" name='address' />
								</div>
							</div>
							<div className="mb-3 row">
								<label htmlFor="city" className="col-sm-2 col-form-label">City</label>
								<div className="col-sm-10">
									<input onChange={handleChange} value={form.city} className="form-control" id="city" name='city' />
								</div>
							</div>
							<div className="mb-3 row">
								<label htmlFor="province" className="col-sm-2 col-form-label">Province</label>
								<div className="col-sm-10">
									<input onChange={handleChange} value={form.province} className="form-control" id="province" name='province' />
								</div>
							</div>
							<div className="mb-3 row">
								<label htmlFor="country" className="col-sm-2 col-form-label">Country</label>
								<div className="col-sm-10">
									<input onChange={handleChange} value={form.country} className="form-control" id="country" name='country' />
								</div>
							</div>

							<div className='mt-5 d-flex justify-content-end'>
								<MDBBtn color='secondary' className='me-3' onClick={handleClickBack}>
									Back
								</MDBBtn>
								<MDBBtn onClick={() => handleClickSave()}>Save</MDBBtn>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
