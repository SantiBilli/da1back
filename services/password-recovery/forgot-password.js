import prisma from "../../prisma/prisma.js";

export const userTokenSVC = async (email, resetToken, expireToken) => {
    try {
        const token = await prisma.usuarios.update({
            where: {
                mail: email,
            },
            data: {
                token: resetToken,
                dateExpire: expireToken,
            },
        });
        return token;
    } catch (error) {
        console.log(error);
        return 500;
    }
};

export const obtainUserTokenSVC = async (token) => {
    try {
        const tokenData = await prisma.usuarios.findFirst({
            where: {
                token: token,
            },
            select: {
                token: true,
                dateExpire: true,
                id_usuario: true,
            },
        });
        return tokenData;
    } catch (error) {
        console.log(error);
        return 500;
    }
};

export const updatePasswordSVC = async (id_usuario, password) => {
    try {
        const update = await prisma.usuarios.update({
            where: {
                id_usuario: id_usuario,
            },
            data: {
                contrasenia: password,
            },
        });
        return update;
    } catch (error) {
        console.log(error);
        return 500;
    }
};

export const deleteTokenSVC = async (id_usuario) => {
    try {
        const deleteToken = await prisma.usuarios.update({
            where: {
                id_usuario: id_usuario,
            },
            data: {
                token: null,
                dateExpire: null,
            },
        });
        return deleteToken;
    } catch (error) {
        console.log(error);
        return 500;
    }
};