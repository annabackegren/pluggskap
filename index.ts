// import { database } from './connectionMongoDB.ts'
// import { ObjectId, type OptionalId } from 'mongodb'
// import type { Request } from 'express'
// import { databaseSQL } from './connectionMySQL.ts'
import express from "express";
import provinceRoutes from "./routes/provinceRoutes.ts";
import userRoutes from "./routes/userRoutes.ts";
import protectedRoutes from "./routes/protectedRoutes.ts";
import quizRoutes from "./routes/quizRoutes.ts";
import resultRoutes from "./routes/resultRoutes.ts";
import feedbackRoutes from "./routes/feedbackRoutes.ts";
import dotenv from "dotenv";

dotenv.config();

const port = 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/province", provinceRoutes);
app.use("/user", userRoutes);
app.use("/protected", protectedRoutes);
app.use("/quiz", quizRoutes);
app.use("/result", resultRoutes);
app.use("/feedback", feedbackRoutes);

app.get("/", (_request, response) => {
  response.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Webbtjänsten är nu uppkopplad mot port ${port}.`);
});
