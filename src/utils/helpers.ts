import Swal, { SweetAlertOptions } from 'sweetalert2';

/*export const sweet = async (options: SweetAlertOptions = {}) => {
    const defaultOptions: SweetAlertOptions = {
        icon: 'success'
    }

    const mergedOptions: SweetAlertOptions = { ...defaultOptions, ...options }

    await Swal.fire(mergedOptions)
}*/

export const toast = async (options: SweetAlertOptions = {}) => {
    const defaultOptions: SweetAlertOptions = {
        icon: 'success',
        toast: true,
        position: 'bottom-right',
        showConfirmButton: false,
        timer: 7000
    };

    const mergedOptions: SweetAlertOptions = { ...defaultOptions, ...options };

    await Swal.fire(mergedOptions);
};

export const decodeJWT = (token: string) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

export const groupBy = <T, K extends keyof T>(arr: T[], property: K): Record<string, T[]> =>
    arr.reduce((groups: Record<string, T[]>, item: T) => {
        const key = item[property] as unknown as string;

        if (!groups[key]) groups[key] = [];

        groups[key].push(item);

        return groups;
    }, {} as Record<string, T[]>);