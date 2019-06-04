const {validationResult} = require('express-validator/check')

const Post = require('../models/post')

exports.getPosts = (req, res, next) =>{
  res.status(200).json({
      posts: [
          {

                _id: '1',
              title:'first post', 
              content:'this is first post', 
              imageUrl: 'images/duck.jpg',
              creator:{
                  name:'Tarun Tyagi'
              },
              createdAt: new Date()
            }
        ]
    });
};

exports.createPost = (req, res, next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res
                .status(422)
                .json(
                        {
                            message: 'Validation failed, Incorrect data entered', 
                            errors: errors.array()
                        }
                    )
    }
    const title = req.body.title;
    const content = req.body.content;
    const post = new Post({
        title: title,
        content: content,
        imageUrl: 'images/duck.png',
        creator:{
            name:'Tarun Tyagi'
        }
    });
    post.save().then(result => {
        res.status(201).json({
            // 200 = success
            // 201 = success and resource created 
     
             message: 'Post created Successfully',
             post: result
         })
    }).catch(err => {
         console.log(err)
        })
    
};

