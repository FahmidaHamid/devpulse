import { Router } from "express";
import { authenticate } from "../../middleware/authenticate_and_authoriza";
import {
  createANewIssue,
  getAllTheIssues,
  getOneIssueById,
} from "../controllers/issues.controller";

const router = Router();

router.post("/", authenticate, createANewIssue);

//GET /api/issues?sort=newest
router.get("/", getAllTheIssues);

//GET /api/issues/:id
//Success Response (200 OK)
router.get("/:id", getOneIssueById);

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
