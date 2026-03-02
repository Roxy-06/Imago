const express = require('express');
const multer = require('multer');
const uploadFile = require('./services/storage.service');
const postModel = require('./models/post.model');

const app = express();
const cors = require('cors')
app.use(cors());

app.use(express.json()); // 👈 THIS LINE IS REQUIRED

const upload = multer({storage: multer.memoryStorage()});

app.post('/api/create-post',upload.single('image'),async(req, res) => {
    const data = req.body;
    console.log(req.body);
    console.log(req.file);
    const result = await uploadFile(req.file.buffer);
    console.log(result);

    const post = await postModel.create({
        image : result.url,
        caption : data.caption
    })

    res.status(201).json({message: "Post created successfully"},post);

})

app.get('/api/posts',async(req, res) => {
    const posts = await postModel.find();
    res.status(200).json({
        posts: posts,
        message: "Posts fetched successfully"
    });
})

// app.delete('/notes/:id',async(req, res) => {
//     const id = req.params.id;
//     await noteModel.findOneAndDelete({_id: id})
//     res.status(200).json({message: "Note deleted successfully"});
// })

// app.patch('/notes/:id',async(req, res) => {
//     const id = req.params.id;
//     const description = req.body.description;
//     await noteModel.findOneAndUpdate({_id: id}, {description: description})
//     res.status(200).json({message: "Note updated successfully"});
// })




module.exports = app;