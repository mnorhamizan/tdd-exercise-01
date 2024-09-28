import { Request, Response, NextFunction } from "express";
import { CreateIssueDto, UpdateIssueDto } from "../models/Issue";
import { IssueService } from "../services/IssueService";

export class IssueController {
  constructor(private issueService: IssueService) {}

  async getAllIssues(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const issues = await this.issueService.getAllIssues();
      res.json(issues);
    } catch (error) {
      next(error);
    }
  }

  async getIssueById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const issue = await this.issueService.getIssueById(id);
      if (issue) {
        res.json(issue);
      } else {
        console.warn(`Issue ${id} not found`);
        res.status(404).json({ message: "Issue not found" });
      }
    } catch (error) {
      next(error);
    }
  }

  async createIssue(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const issueDto: CreateIssueDto = req.body;
      const newIssue = await this.issueService.createIssue(issueDto);
      res.status(201).json(newIssue);
    } catch (error) {
      next(error);
    }
  }

  async updateIssue(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const issueDto: UpdateIssueDto = req.body;
      const updatedIssue = await this.issueService.updateIssue(id, issueDto);
      if (updatedIssue) {
        res.json(updatedIssue);
      } else {
        console.warn(`Issue ${id} not found`);
        res.status(404).json({ message: "Issue not found" });
      }
    } catch (error) {
      next(error);
    }
  }

  async deleteIssue(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const deleted = await this.issueService.deleteIssue(id);
      if (deleted) {
        res.status(204).send();
      } else {
        console.warn(`Issue ${id} not found`);
        res.status(404).json({ message: "Issue not found" });
      }
    } catch (error) {
      next(error);
    }
  }
}
