import express from "express";
import {getAllProducts} from "../controllers/products.js";
import { getAllProductsTesting } from "../controllers/products.js";

const router = express.Router();

router.get("/", getAllProducts);

router.get("/testing", getAllProductsTesting);

export default router;