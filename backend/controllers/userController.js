import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";

// @desc    Auth user & get token
// @route   GET /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    res.send('auth user');
});

// @desc    Register user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    res.send('register user');
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
    res.send('logout user');
});

// @desc    get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    res.send('get user profile');
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    res.send('update user profile');
});

// @desc    get Users
// @route   Get /api/users/
// @access  Private/admin
const getUsers = asyncHandler(async (req, res) => {
    res.send('get users');
});

// @desc    get Users
// @route   Get /api/users/:id
// @access  Private/admin
const getUsersByID = asyncHandler(async (req, res) => {
    res.send('get user by id');
});

// @desc    delete Users
// @route   DELETE /api/users/:id
// @access  Private/admin
const deleteUser = asyncHandler(async (req, res) => {
    res.send('delete user by id');
});

// @desc    update user
// @route   PUT /api/users/:id
// @access  Private/admin
const updateUser = asyncHandler(async (req, res) => {
    res.send('update user by id');
});

export { 
    authUser, 
    registerUser, 
    logoutUser, 
    getUserProfile, 
    updateUserProfile, 
    getUsers, 
    getUsersByID, 
    deleteUser, 
    updateUser 
};