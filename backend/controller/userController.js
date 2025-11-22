// @desc    Get current logged in user profile
// @route   GET /api/users/me
export const getUserProfile = async (req, res) => {
    try {
        // req.user is already populated by authMiddleware
        const user = {
            id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            role: req.user.role
        };
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch user profile" });
    }
};

// @desc    Update user profile
// @route   PUT /api/users/me
export const updateUserProfile = async (req, res) => {
    try {
        const user = req.user; // Fetched from DB in authMiddleware
        
        user.name = req.body.name || user.name;
        // Add other fields if necessary, but typically email/role are protected
        
        const updatedUser = await user.save();
        
        res.json({
            id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to update profile" });
    }
};