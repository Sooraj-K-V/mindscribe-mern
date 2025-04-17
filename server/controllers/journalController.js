import Journal from "../models/Journal.js";
import User from "../models/User.js";

export const addUserJournals = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, content } = req.body;
    const newJournal = new Journal({
      title,
      content,
      user: userId,
    });
    
    await newJournal.save(); 
    
    const user = await User.findById(userId).lean();

    res.json({
      message: `New journal named ${title} is created by ${user.name}!`,
      journal: newJournal,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getUserJournals = async (req, res) => {
  try {
    const userId = req.user.id; // Get the logged-in user ID from the token

    // Find journals linked to this user and populate the 'user' field to get the name
    const journals = await Journal.find({ user: userId }).populate("user", "name");

    res.status(200).json(journals);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
};


export const updateJournal = async (req, res) => {
  try {
    const userId = req.user.id;
    const journalId = req.params.journalId;
    const { title, content } = req.body;

    const updatedJournal = await Journal.findOneAndUpdate(
      { _id: journalId, user: userId },
      { title, content },
      { new: true, runValidators: true }
    );

    if (!updatedJournal) {
      return res
        .status(404)
        .json({ error: "Journal not found or access denied" });
    }

    res.status(200).json({
      message: "Journal updated successfully!",
      journal: updatedJournal,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteJournal = async (req, res) => {
  try {
    const userId = req.user.id;
    const journalId = req.params.journalId;

    const deletedJournal = await Journal.findByIdAndDelete({_id: journalId, user: userId});
    if(!deletedJournal){
    res.status(401).json({message: "deletion failed"})
    }
    res.json({message: `Successfully deleted.`})
  } catch (error) {
    res.json(error.message)
  }
}