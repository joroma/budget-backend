import { categoryGroupService } from '../services/category-group.service';
import { NextFunction, Request, Response } from 'express';
import { paramExtractor, safeZodParse } from '../utils/validation/validator';
import z from 'zod';

export const list = (_req: Request, res: Response, next: NextFunction) => {
  const result = categoryGroupService.list();
  result.match(
    (categoryGroups) => {
      res.json(categoryGroups);
    },
    (error) => {
      next(error);
    }
  );
};

export const getById = (req: Request, res: Response, next: NextFunction) => {
  const id = paramExtractor(req, 'id');
  if (id.isErr()) {
    next(id.error);
    return;
  }
  const result = categoryGroupService.getById(id.value);
  result.match(
    (categoryGroup) => {
      res.json(categoryGroup);
    },
    (error) => {
      next(error);
    }
  );
};

export const create = (req: Request, res: Response, next: NextFunction) => {
  const parser = safeZodParse(z.object({ name: z.string().min(1) }));
  const parsedBody = parser(req.body);
  if (parsedBody.isErr()) {
    next(parsedBody.error);
    return;
  }
  const createResult = categoryGroupService.create(parsedBody.value);
  createResult.match(
    (categoryGroup) => {
      res.status(201).json(categoryGroup);
    },
    (error) => {
      next(error);
    }
  );
};

export const update = (req: Request, res: Response, next: NextFunction) => {
  const id = paramExtractor(req, 'id');
  if (id.isErr()) {
    next(id.error);
    return;
  }

  const parser = safeZodParse(z.object({ name: z.string().min(1) }));
  const parsedBody = parser(req.body);
  if (parsedBody.isErr()) {
    next(parsedBody.error);
    return;
  }

  const result = categoryGroupService.update(id.value, parsedBody.value);
  result.match(
    (categoryGroup) => {
      res.json(categoryGroup);
    },
    (error) => {
      next(error);
    }
  );
};

export const remove = (req: Request, res: Response, next: NextFunction) => {
  const id = paramExtractor(req, 'id');
  if (id.isErr()) {
    next(id.error);
    return;
  }

  const result = categoryGroupService.delete(id.value);
  result.match(
    (categoryGroup) => {
      res.json(categoryGroup);
    },
    (error) => {
      next(error);
    }
  );
};
