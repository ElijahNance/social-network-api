const { User, Thought } = require('../models');

module.exports = {
    getUsers(req, res) {
        User.find()
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .then(async (user) =>
                !user
                    ? res.json(404).json({ message: 'No student found with this ID' })
                    : res.json({
                        user,
                        thoughts: await thoughts(req.params.userId),
                        friends: await friends(req.params.userId),
                    })
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
        )
            .then((user) =>
            !user
                ? res.status(404).json({ message: 'No user with this ID!' })
                : res.json(course)
            )
                .catch((err) => res.status(500).json(err));
    },
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId})
        .then((user) =>
        !user
          ? res.status(404).json({message: 'No user with this ID'})
          : res.json({ message: 'User successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
    }
}