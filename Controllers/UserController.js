import { errorHandler } from "../components/error.js";
import Additem from "../models/AddModel.js";
import User from "../models/UserModel.js";


export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, 'Update Error!!!'));
  try {

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, 'Delete Error!!!'))
  try {
    await User.findByIdAndDelete(req.params.id)
    res.status(200).json('Delete is successfull')
  }
  catch (error) {
  
    next(error)
  }

}

export const userAddedItems = async (req, res, next) => {
  if (req.user.id === req.params.id){
  try {
    const Additems = await Additem.find({userRef : req.user.id});
    res.status(200).json(Additems)
  }
  catch (error) {
    next(error)
  }
}
  else{
    return next(errorHandler(401, 'useradded Error!!!'))
  }

}

export const getContact=async(req,res,next)=>{
  const user =await User.findById(req.params.id)
  const {password: pass,...rest}=user._doc
  res.status(200).json(rest)
}


