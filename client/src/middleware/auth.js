import React, {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

export default function Auth({children}) {
	const token = localStorage.getItem('accessToken')
	const navigate = useNavigate()

	useEffect(() => {
		if(!token) {
			navigate('/login')
		}
	}, [])

	return (
		children
	)
}
