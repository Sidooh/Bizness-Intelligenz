import Swal, { SweetAlertOptions } from 'sweetalert2';

export const sweet = async (options: SweetAlertOptions = {}) => {
    const defaultOptions: SweetAlertOptions = {
        icon: 'success'
    }

    const mergedOptions: SweetAlertOptions = { ...defaultOptions, ...options }

    await Swal.fire(mergedOptions)
}

export const toast = async (options: SweetAlertOptions = {}) => {
    const defaultOptions: SweetAlertOptions = {
        icon: 'success',
        toast: true,
        position: 'bottom-right',
        showConfirmButton: false,
        timer: 7000
    }

    const mergedOptions: SweetAlertOptions = { ...defaultOptions, ...options }

    await Swal.fire(mergedOptions)
}

export const decodeJWT = (token: string) => {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}