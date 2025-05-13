import prisma from '../../prisma/prisma.js';

export const validarObraSocialSVC = async id_usuario => {
    try{
        const usuario = await prisma.usuarios.findUnique({
            where: {
                id_usuario: id_usuario,
            },
            select: {
                id_afiliacion: true
            },
        });
        return !!usuario.id_afiliacion;
    } catch (error) {
        console.log(error);
        return 500;
    }
};

export const getObrasSocialesSVC = async () => {
    try {
        const obrasSociales = await prisma.obras_sociales.findMany({
            select: {
                id_obra_social: true,
                nombre: true,
            },
        });
        return obrasSociales;
    } catch (error) {
        console.log(error);
        return 500;
    }
};

export const getPlanesObraSocialSVC = async id_obra_social => {
    try {
        const planesObraSocial = await prisma.planes_obras_sociales.findMany({
            where: {
                id_obra_social: id_obra_social,
            },
            select: {
                id_plan: true,
                nombre_plan: true,
            },
        });
        return planesObraSocial;
    } catch (error) {
        console.log(error);
        return 500;
    }
};