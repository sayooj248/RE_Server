import { errorHandler } from "../components/error.js";
import Additem from "../models/AddModel.js"






export const AddItem = async (req,res,next)=>{
  try{
    const Add =await Additem.create(req.body)
     return res.status(200).json(Add);
  }
  catch(error){
   next (error)
  }
}

export const deleteAddeditem=async(req,res,next)=>{
  const Add =await Additem.findById(req.params.id)
  try{
    await Additem.findByIdAndDelete(req.params.id)
    res.status(200).json("Item deleted successfully")
  }
  catch(error){
    next (error)
  }
}

export const getListing = async (req, res, next) => {
  try {
    const Add = await Additem.findById(req.params.id);
    if (!Add) {
      return next(errorHandler(404, 'Listing not found!'));
    }
    res.status(200).json(Add);
  } catch (error) {
    next(error);
  }
};
export const updateItem = async (req, res, next) => {
  const Add = await Additem .findById(req.params.id);
  if (!Add) {
    return next(errorHandler(404, 'Listing not found!'));
  }
  if (req.user.id !== Add.userRef) {
    return next(errorHandler(401, 'update item error!'));
  }

  try {
    const updateItem = await Additem .findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updateItem);
  } catch (error) {
    next(error);
  }
};

export const getAddeditems = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = parseInt(req.query.startIndex) || 0;
    
    let furnished = req.query.furnished;

    if (furnished === undefined || furnished === 'false') {
      furnished = { $in: [false, true] };
    }

    let parking = req.query.parking;

    if (parking === undefined || parking === 'false') {
      parking = { $in: [false, true] };
    }

    let type = req.query.type;

    if (type === undefined || type === 'all') {
      type = { $in: ['sale', 'rent'] };
    }

    const searchTerm = req.query.searchTerm || '';

    const sort = req.query.sort || 'createdAt';

    const order = req.query.order || 'desc';
    const Add= await Additem.find({
      name: { $regex: searchTerm, $options: 'i' },

      furnished,
      parking,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(Add);
  } catch (error) {
    next(error);
  }
};