import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MediGo API',
      version: '1.0.0',
      description: 'API for managing user authentication and medical appointments',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description:
            'Token JWT obtenido del endpoint /logins. Ingrese el token en el formato `Bearer <token>`.',
        },
      },
    },
  },
  apis: ['./routes/**/*.js'], // Load JSDoc annotations
};

const specs = swaggerJsdoc(options);
export default specs;
