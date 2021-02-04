import PostMessage from '../models/postMessage.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const mongoose = require("mongoose");
export const getPosts = async (req, res) => {

    try{

        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages);

    }

    catch(error){

        res.status(404).json({message: error.message});



    }


};

export const createPost = async (req, res) => {

    try{

        
        const body = req.body;
        const newPost = new PostMessage({...body, creator: req.userId, createdAt: new Date().toISOString()});
        await newPost.save();
        res.status(201).json(newPost);

    }

    catch(error){

        res.status(409).json({message: error.message});



    }




};

export const updatePost = async (req, res) => {

    try{

        const {id:_id} = req.params;
        const post = req.body
        
        if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');
        
        const updatedPost =  await PostMessage.findByIdAndUpdate(_id, {...post, _id}, {new: true});
        res.status(201).json(updatedPost);
        
    }

    catch(error){

        res.status(409).json({message: error.message});



    }




};

export const deletePost = async (req, res) => {

    try{

        const {id:_id} = req.params;
        
        
        if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');
        
        await PostMessage.findByIdAndRemove(_id);
        res.status(201).json({message: 'Post deleted successfully'});
        
    }

    catch(error){

        res.status(409).json({message: error.message});



    }




};

export const likePost = async (req, res) => {

    try{

        const {id:_id} = req.params;
        
        if(!req.userId) return res.json({message: 'Unauthenticated'});

        if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');
        
        const post = await PostMessage.findById(_id);

        const index = post.likes.findIndex((id) => id === String(req.userId));

        if(index === -1){

            post.likes.push(req.userId);
        }

        else{

            post.likes = post.likes.filter((id) => id !== String(req.userId));
        }

        const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {new: true});
        res.status(201).json(updatedPost);
        
    }

    catch(error){

        res.status(409).json({message: error.message});



    }




};