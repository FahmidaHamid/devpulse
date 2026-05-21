import { Router } from "express";
import { authenticate } from "../../middleware/authenticate_and_authoriza";
import { createANewIssue } from "../controllers/issues.controller";

const router = Router();

router.post("/", authenticate, createANewIssue);

router.get("/", async (req, res) => {
  //GET /api/issues?sort=newest

  console.log(req);
  res.status(200).json({ message: "posting an issue" });
});

router.get("/:id", async (req, res) => {
  //GET /api/issues?sort=newest

  console.log(req);
  res.status(200).json({ message: "posting an issue" });
});

// PATCH /api/issues/:id
router.patch("/:id", async (req, res) => {
  //GET /api/issues?sort=newest

  console.log(req);
  res.status(200).json({ message: "posting an issue" });
});

// DELETE /api/issues/:id
router.delete("/:id", async (req, res) => {
  //GET /api/issues?sort=newest

  console.log(req);
  res.status(200).json({ message: "posting an issue" });
});
export const issuesRouter = router;
