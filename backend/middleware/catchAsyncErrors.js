export const catchAsyncErrors = (theFunc) => (req, res, next) => {
    return (req,res,next) => {
        Promise.resolve(theFunc(req,res,next)).catch(next);
    }
};    