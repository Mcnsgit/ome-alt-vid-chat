// src/routes/profileRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../auth');
const User = require('../models/UserSchema');

// GET profile
router.get('/profile', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId)
            .select('-password -__v');
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.json({
            displayName: user.username || '',
            interests: user.interests?.join(', ') || '',
            preferredLanguage: user.preferredLanguage || 'english',
            gender: user.gender || 'any',
            location: user.location || '',
            bio: user.bio || ''
        });
    } catch (error) {
        console.error('Profile fetch error:', error);
        res.status(500).json({ message: 'Error fetching profile' });
    }
});

// PUT profile update
router.put('/profile', auth, async (req, res) => {
    try {
        const {
            displayName,
            interests,
            preferredLanguage,
            gender,
            location,
            bio
        } = req.body;

        // Convert interests string to array
        const interestsArray = interests.split(',').map(i => i.trim()).filter(Boolean);

        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user profile
        user.username = displayName;
        user.interests = interestsArray;
        user.preferredLanguage = preferredLanguage;
        user.gender = gender;
        user.location = location;
        user.bio = bio;

        await user.save();

        res.json({
            message: 'Profile updated successfully',
            user: {
                displayName: user.username,
                interests: user.interests.join(', '),
                preferredLanguage: user.preferredLanguage,
                gender: user.gender,
                location: user.location,
                bio: user.bio
            }
        });
    } catch (error) {
        console.error('Profile update error:', error);
        res.status(500).json({ message: 'Error updating profile' });
    }
});


module.exports = router;