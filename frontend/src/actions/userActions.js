export function setUser(id, name, email) {
    return {
        type: "SET_USER",
        payload: {
            id: id,
            name: name,
            email: email
        }
    }
}

export function logout() {
    return {
        type: "LOGOUT",
        payload: {}
    }
}