import express from 'express';
import { deleteUser, getContact, updateUser,userAddedItems } from '../Controllers/UserController.js';
import { verifyToken } from '../components/TokenVerify.js';


const router = express.Router()


router.get('/test',(req,res)=>{
    res.json({  message:'hello',})
});

router.post('/update/:id',verifyToken,updateUser);
router.delete('/delete/:id',verifyToken, deleteUser)
router.get('/addeditems/:id',verifyToken,userAddedItems)
router.get('/:id',verifyToken,getContact)



export default router