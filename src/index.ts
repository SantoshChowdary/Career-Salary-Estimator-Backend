import express from "express";
import cors from "cors";
import { userRouter } from "./core/router";


export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/user", userRouter);

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(process.env.PORT || 3000, () => console.log("server started"));