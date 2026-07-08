const getMe = async (req, res) => {
  const user = req.user;
  if(!user){
    console.log('user not found')
    return res.status(404).json({
      message: 'user not found'
    })
  }
  return res.status(200).json({
    message: 'user detail get successfully',
    data: user
  })
}
const userController = {getMe}
export default userController