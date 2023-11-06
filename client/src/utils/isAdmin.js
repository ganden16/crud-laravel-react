import {useState} from "react"
import api from "../configs/api"
import axios from "axios"

export default function useIsAdmin() {
	const [isAdmin, setIsAdmin] = useState(false)
	
	return [isAdmin, setIsAdmin]
}
