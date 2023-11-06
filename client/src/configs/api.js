import {baseUrl} from "./baseUrl"

export default {
	baseUrl,
	// auth
	apiLogin: `${baseUrl}/api/auth/login`,
	apiRegister: `${baseUrl}/api/auth/register`,
	apiLogout: `${baseUrl}/api/auth/logout`,
	apiMe: `${baseUrl}/api/auth/me`,
	apiUpdateUser: `${baseUrl}/api/auth/update`,

	//product
	apiProduct: `${baseUrl}/api/product`,

	//category
	apiCategory: `${baseUrl}/api/category`,
}