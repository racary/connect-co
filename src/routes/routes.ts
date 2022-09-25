import { Router, } from 'express';
import { canUpdateStatus, canRead, } from '../authorization/grants';
import * as handler from '../handlers/handler';

const router = Router();

router.get('/items/:id', async (req: any, res) => {
  if (req.user && canRead(req.user.role)) {
    const { id, } = req.params;
    const response = await handler.getItem(id);
    res.json(response);
  }

  res.status(403).send({message: 'user does not have permission to read resource',});
  
});

router.post('/items/:id', async (req: any, res) => {
  const {body,} = req;

  // TODO: make this middleware function for easier error handling?
  if (req.user && canUpdateStatus(body.status, req.user.role)) {
    const response = await handler.updateItem(body);
    res.json(response);
  }

  res.status(403).send({message: 'user does not have permission to read resource',});
});

export default router;