// validacion
// function authentication(req, res, next) {
//     if (req.session.user.email === 'sam' || !req.session.user.admin) {
//         return res.status(401).send('error de autentificacion')
//     }
//     next()
// }

// const publicAccess = (req, res, next) => {
//     if(req.session.user) return res.redirect('/views/products');// verifica que el usuario este conectado
//     next();
// };

// const privateAccess = (req, res, next) => {
//     if(!req.session.user) return res.redirect('/views/login');
//     next();
// };

// module.exports = {
//         publicAccess,
//         privateAccess
// }