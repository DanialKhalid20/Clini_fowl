const User = require("../models/user");

async function email_verify(req, res) {
  const { token } = req.query;

  try {
    const user = await User.findOne({ token: token });

    if (user.tokenExpires <= new Date() && !user.verified) {
      await user.deleteOne();
      return res
        .status(500)
        .json({ error: "Token expired please signup again" });
    }

    if (!user) {
      return res.status(500).json({ error: "user not found" });
    }

    // Update user's to null
    user.token = "";
    user.verified = true;
    await user.save();
    return res.redirect("http://localhost:5173/Landing");
  } catch (err) {
    console.error(err);
    if (
      (err =
        "TypeError: Cannot read properties of null (reading 'tokenExpires')")
    ) {
      return res.status(500).json({ error: "Link has already been clicked" });
    } else return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { email_verify };
