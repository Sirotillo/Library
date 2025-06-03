import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { BadRequestException, ValidationPipe } from "@nestjs/common";
import * as cookieParser from "cookie-parser";
import * as basicAuth from "express-basic-auth";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { WinstonModule } from "nest-winston";
import { winstonConfig } from "./common/logger/winston.logger";
import { AllExceptionsFilter } from "./common/errors/error.handling";

async function start() {
  try {
    const PORT = process.env.PORT || 3030;
    const app = await NestFactory.create(AppModule, {
      logger: WinstonModule.createLogger(winstonConfig),
    });
    app.useGlobalFilters(new AllExceptionsFilter());
    app.setGlobalPrefix("api");

    app.useGlobalPipes(new ValidationPipe());
    app.use(cookieParser());

    app.use(
      ["/docs", "/docs-json"],
      basicAuth({
        users: { kottaAdmin: "12345" },
        challenge: true,
      })
    );

    const config = new DocumentBuilder()
      .setTitle("Library project")
      .setDescription("Library REST API")
      .setVersion("1.0")
      .addBearerAuth()
      .addTag("imtixon")
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("/docs", app, document);

    app.enableCors({
      origin: (origin, callback) => {
        const allowedOrigins = ["http://localhost:3000"];
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new BadRequestException("Not allowed by CORS"));
        }
      },
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true,
    });

    await app.listen(PORT, () => {
      console.log(`Server started at: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
