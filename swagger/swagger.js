import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TurnosYa API',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.js'], // files containing annotations as above
};

const specs = swaggerJsdoc(options);
export default specs;
