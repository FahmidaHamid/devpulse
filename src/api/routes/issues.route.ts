import { Router } from "express";
import { authenticate } from "../../middleware/authenticate_and_authoriza";
import {
  createANewIssue,
  getAllTheIssues,
  getOneIssueById,
  updateIssueById,
} from "../controllers/issues.controller";
import { validateIssueUpdate } from "../../middleware/validateUpdateIssues";

const router = Router();

router.post("/", authenticate, createANewIssue);

router.get("/", getAllTheIssues);

router.get("/:id", getOneIssueById);

// PATCH /api/issues/:id
// Success Response (200 OK)
router.patch("/:id", authenticate, validateIssueUpdate, updateIssueById);

// DELETE /api/issues/:id
router.delete("/:id", async (req, res) => {
  //GET /api/issues?sort=newest

  console.log(req);
  res.status(200).json({ message: "posting an issue" });
});
export const issuesRouter = router;
