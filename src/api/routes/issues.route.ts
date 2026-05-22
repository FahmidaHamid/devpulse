import { Router } from "express";
import { authenticate } from "../../middleware/authenticate";
import { validateIssueOnUpdate } from "../../middleware/validateIssueOnUpdate";
import { validateIssueOnDelete } from "../../middleware/validateIssueOnDelete";
import { issueController } from "../controllers/issues.controller";

const router = Router();

router.post("/", authenticate, issueController.createANewIssue);

router.get("/", issueController.getAllTheIssues);

router.get("/:id", issueController.getOneIssueById);

router.patch(
  "/:id",
  authenticate,
  validateIssueOnUpdate,
  issueController.updateOneIssueById,
);

router.delete(
  "/:id",
  authenticate,
  validateIssueOnDelete,
  issueController.deleteOneIssueById,
);

export const issuesRouter = router;
