function requireAuth(req, res, next) {
  if (req.session && req.session.userEmail) {
    return next();
  } else {
    res.redirect("http://localhost:5173/");
  }
}

module.exports = requireAuth;
