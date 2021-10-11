
const Item = require('../models/Item');
const User = require('../models/User.js');
const request = require("request");

uploadedFile = (fileToUpload, uId, headers) => {
    console.log("headers", headers);
    return new Promise(async (resolve, reject) => {
        const uri = `https://files.leader.codes/api/${uId}/upload`;
        const options = {
            method: "POST",
            url: uri,
            headers: {
                Authorization: headers,
                "Content-Type": "multipart/form-data",
            },
            formData: {
                file: {
                    value: fileToUpload.data,
                    options: {
                        filename: fileToUpload.name,
                    },
                },
            },
        };
 
        request(options, async (err, res, body) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            let url;
            console.log("result from server", body);
            try {
               url= JSON.parse(body).data.url;
                // let url=body.data.url;
                resolve(url);
            } catch (error) {
                reject(error);
            }
        });
    });
};

module.exports = {
    getItem: (req, res) => {
        const { itemId } = req.body;
        Item.find({ _id: itemId })
            .then((item) => {
                //   console.log("item", item)
                res.status(200).json({
                    item
                })

            }).catch(error => {
                res.status(500).json({
                    error
                })
            })
    },
    newItem: async (req, res) => {

        // let currentUser = await User.findOne({ "_id": req.body.uId });
        // Item.findOne({ user: currentUser._id, name: req.body.name.toLowerCase() }).exec((err, result) => {
        //     if (result) {
        //         res.status(409).json({
        //             message: 'item already exists '

        //         })
        //     }
        // })

        const item = new Item({
            name: req.body.name.toLowerCase(),
            json: req.body.json,


        })
        await item.save();
        res.status(200).json({ massage: "item added succesfully", item })
    },
    uploadImage : async(req, res)=> {
        let url = await uploadedFile(req.files.file, req.params.uid, req.headers["authorization"]);
        console.log('url from files',url);
    //    res.send(url);
    res.status(200).json({ massage: "image uploaded succesfully", 'url':url })
    }
    // (req, res) => {
    //     const { item } = req.body;
    //     const newItem=new Item(item);
    //     newItem.save().then((result) => {
    //         res.status(200).json({
    //             message: 'item created',
    //             result
    //         })
    //     }).catch(error => {
    //         res.status(500).json({
    //             error
    //         })
    //     })
    // },
}