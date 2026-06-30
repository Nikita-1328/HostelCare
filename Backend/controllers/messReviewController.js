import MessReview from "../models/MessReview.js";

export const createMessReview = async (req, res) => {
  try {
    const { day, meal, rating, comment } = req.body;

    if (!day || !meal || !rating) {
      return res.status(400).json({ message: "Day, meal, and rating are required." });
    }

    const review = await MessReview.create({
      student: req.user._id,
      day,
      meal,
      rating,
      comment: comment || "",
      status: "Pending",
    });

    res.status(201).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const getMessReviews = async (req, res) => {
  try {
    const filter = req.user.role === "student" ? { student: req.user._id } : {};
    const reviews = await MessReview.find(filter).populate("student", "name email role");
    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const completeMessReview = async (req, res) => {
  try {
    const review = await MessReview.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: "Review not found." });
    }

    if (req.user.role === "student" && !review.student.equals(req.user._id)) {
      return res.status(403).json({ message: "Not authorized to complete this review." });
    }

    review.status = "Completed";
    await review.save();

    res.status(200).json({ message: "Review marked as completed.", review });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
