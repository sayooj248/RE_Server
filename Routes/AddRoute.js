import express from 'express'
import { AddItem, deleteAddeditem, getAddeditems, getListing, updateItem } from '../Controllers/AddController.js'
import { verifyToken } from '../components/TokenVerify.js'

const router =express.Router()


router.post('/additem',verifyToken ,AddItem);
router.delete('/delete/:id',verifyToken,deleteAddeditem);
router.get('/get/:id',getListing);
router.post('/update/:id',verifyToken,updateItem);
router.get('/gets',getAddeditems);


export default router