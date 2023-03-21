const Data = require('../models/dataModal.js');
const getDataUri = require("../utils/dataUri.js")
const cloudinary = require("cloudinary")

exports.loadData = async (req, res) => {
  try {
    const data = await Data.findOne();
    if (!data) {
      // If there are no settings in the database, create a new one with default values
      const newData = await Data.create({
        text: 'Welcome to Systempackage',
        logoUrl: 'https://res.cloudinary.com/dmjxbvcz2/image/upload/v1679203951/Logo_2_hftf6y.png',
      });
      return res.status(200).json(newData);
    }
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}

exports.updateText = async (req, res) => {
  try {
    const { text } = req.body;
    const data = await Data.findOneAndUpdate({}, { text }, { new: true });
    res.status(200).json({
      message: "Text Updated Successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.updateLogo = async (req, res) => {
  try {
    const file = req.file;
    const data = await Data.findOne();
    const fileUri = getDataUri(file)

    const mycloud = await cloudinary.v2.uploader.upload(fileUri.content); //Upload on Cloudinary

    await cloudinary.v2.uploader.destroy(data.logoUrl)

    data.logoUrl = mycloud.secure_url

    await data.save()

    res.status(200).json({
      message: "Logo Updated Successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
