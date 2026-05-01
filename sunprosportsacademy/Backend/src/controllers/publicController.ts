import { Request, Response } from 'express';
import { emailService } from '../services/emailService';

export const publicController = {
  async contact(req: Request, res: Response) {
    try {
      // Send email notification
      await emailService.sendContactEmail(req.body);
      
      res.status(201).json({ 
        message: 'Consultation request sent successfully',
        timestamp: new Date().toISOString()
      });
    } catch (err) {
      console.error('Failed to send contact email:', err);
      res.status(500).json({ 
        error: 'Failed to process request. Please try again later.' 
      });
    }
  },
};
