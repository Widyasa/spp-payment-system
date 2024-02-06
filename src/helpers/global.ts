import {ref} from "vue";

export const apiUrl = import.meta.env.VITE_API_URL
export const apiCookie = import.meta.env.VITE_API_COOKIE
export const token =  ref(localStorage.getItem('token'))
export const role = ref(localStorage.getItem('role'))
export const admin = role?.value === '1'
export const petugas = role?.value === '2'
export const siswa = role?.value === '3'