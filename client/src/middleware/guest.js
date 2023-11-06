import React, {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

export default function Guest({children}) {
	const token = localStorage.getItem('accessToken')
	const navigate = useNavigate()

	useEffect(() => {
		if(token) {
			navigate('/')
		}
	}, [])

	return (
		children
	)
}
