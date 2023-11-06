import React, {useEffect, useState} from 'react'
import Navbar from '../components/navbar'
import axios from 'axios'
import api from '../configs/api'

export default function Index() {
	const token = localStorage.getItem('accessToken')
	const [me, setMe] = useState({})

	useEffect(() => {
		if(token) {
			axios(api.apiMe).then(res => {
				setMe(res.data.user)
			})
		}
	}, [token])

	return (
		<>
			<Navbar />
			<div className='d-flex justify-content-center'>
				<div className="alert alert-success  w-75" role="alert">
					{me.role_id == 1 && <h4 className="alert-heading">Welcome Admin</h4>}
					{me.role_id == 2 && <h4 className="alert-heading">Welcome User</h4>}
					<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi atque magnam culpa tempore voluptatem? At sit magnam voluptatum illo perferendis. Labore odio iure corrupti aliquam molestiae non cum eos commodi!</p>
					<hr />
					{me.role_id == 1 && <p className="mb-0">You have access to all functions</p>}
					{me.role_id == 2 && <p className="mb-0">you can only perform limited functions</p>}
				</div>
			</div>
		</>
	)
}
