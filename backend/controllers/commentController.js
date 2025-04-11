const Comment = require('../models/commentModel');

// Obtener comentarios por producto
exports.getComments = async (req, res) => {
    const { productId } = req.params;

    try {
        const comments = await Comment.find({ productId }).sort({ createdAt: -1 });
        res.status(200).json(comments);
    } catch (error) {
        console.error('Error al obtener comentarios:', error.message);
        res.status(500).json({ message: 'Error al obtener los comentarios.' });
    }
};

// Agregar un comentario a un producto
exports.addComment = async (req, res) => {
    const { productId } = req.params;
    const { comment } = req.body;

    if (!comment) {
        return res.status(400).json({ message: 'El comentario no puede estar vacío.' });
    }

    try {
        const newComment = new Comment({ productId, comment });
        await newComment.save();
        res.status(201).json(newComment);
    } catch (error) {
        console.error('Error al agregar el comentario:', error.message);
        res.status(500).json({ message: 'Error al agregar el comentario.' });
    }
};
