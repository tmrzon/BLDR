const User = require('../models/User')
const File = require('../models/Form')
module.exports = {
    newForm: async (req, res) => {
        console.log('in new form')
        try {
            console.log('body', req.body)
            const body = req.body.form
            console.log('email', JSON.stringify(body.email))
            const form = new Form({ email: JSON.stringify(body.email), inputs: JSON.stringify(body.inputs) })
            console.log('form', form)
            const user = await User.findOne({ username: req.params.userName })
            form.userId = user._id
            await User.updateOne({ _id: user._id }, { $push: { forms: form._id } })
            await form.save()
            console.log(form)
            res.status(200).json({ message: 'form created successfully', asset })
        } catch (error) {
            res.status(500).json(error)
        }

    }
}