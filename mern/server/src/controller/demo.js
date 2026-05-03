import demo from "../Models/demo.js"

export const create_demo=async(req,res)=>{
    try {
        const user= await demo.create(req.body)
        res.status(201).json(user)
        

    } catch (error) {
        res.status(500).json(error)
    }
}

export const get_demo=async(req,res)=>{
    try {
        const user=await demo.find();
        res.json(user)
    } catch (error) {
     res.status(500).json(error)   
    }
}


export const delete_demo= async(req,res)=>{
    try {
        
        await demo.findByIdAndDelete(req.params.id)

        res.json({
            message:"user deleted "
        })
    } catch (error) {
        res.status(500).json(error)
    }
}


export const update_demo=async(req,res)=>{
try {
    const user = await demo.findByIdAndUpdate(req.params.id,req.body,{new:true})
res.json(user)

} catch (error) {
     res.status(500).json(error)
}
}