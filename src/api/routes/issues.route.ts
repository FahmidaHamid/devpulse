import { Router } from "express";
import { authenticate } from "../../middleware/authenticate_and_authoriza";
import {
  createANewIssue,
  deleteOneIssueById,
  getAllTheIssues,
  getOneIssueById,
  updateIssueById,
} from "../controllers/issues.controller";
import { validateIssueUpdate } from "../../middleware/validateUpdateIssues";
import { validateIssueDelete } from "../../middleware/validateIssueDelete";

const router = Router();

router.post("/", authenticate, createANewIssue);

router.get("/", getAllTheIssues);

router.get("/:id", getOneIssueById);

router.patch("/:id", authenticate, validateIssueUpdate, updateIssueById);

// DELETE /api/issues/:id
router.delete("/:id", authenticate, validateIssueDelete, deleteOneIssueById);

export const issuesRouter = router;
