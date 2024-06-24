"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const serverless_express_1 = require("@vendia/serverless-express");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
let cachedServer;
const handler = async (event, context) => {
    if (!cachedServer) {
        const nestApp = await core_1.NestFactory.create(app_module_1.AppModule);
        cachedServer = (0, serverless_express_1.configure)({
            app: nestApp.getHttpAdapter().getInstance(),
        });
    }
    return cachedServer(event, context);
};
exports.handler = handler;
//# sourceMappingURL=lambda.js.map