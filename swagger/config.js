const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
require("dotenv").config();

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Financial Tracker Suite API",
            version: "1.0.0",
            description: "API documentation for the Financial Tracker Suite",
        },
        servers: [
            {
                url: "https://financial-tracker-suite-nodejs.onrender.com",
                description: "Production server",
            },
            {
                url: `http://localhost:${process.env.PORT || 8000}`,
                description: "Development server",
            },

        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: [
        "./modules/**/*.routes.js",
        "./models/*.model.js",
        "./modules/**/*.docs.js"
    ],
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

module.exports = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};