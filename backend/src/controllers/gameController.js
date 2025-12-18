import { User } from "../models/userModel.js";

export const updateGameState = async (req, res) => {
  try {
    const { userId } = req.params;
    const { gameState } = req.body;

    await User.findByIdAndUpdate(userId, { gameState });
    
    res.json({ message: 'Game state updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update game state' });
  }
};

export const getGameState = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({ gameState: user.gameState || { money: 1000, currentDay: 1 } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to get game state' });
  }
};