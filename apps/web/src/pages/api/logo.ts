import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Path to the logo file in the public directory
    const logoPath = path.join(process.cwd(), 'public', 'logo.png');
    
    // Check if the file exists
    if (!fs.existsSync(logoPath)) {
      console.error('Logo file not found at:', logoPath);
      return res.status(404).json({ error: 'Logo not found' });
    }
    
    // Read the file
    const logoBuffer = fs.readFileSync(logoPath);
    
    // Set appropriate headers
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable'); // Cache for 1 year
    
    // Send the image
    res.send(logoBuffer);
  } catch (error) {
    console.error('Error serving logo:', error);
    res.status(500).json({ error: 'Failed to serve logo' });
  }
}