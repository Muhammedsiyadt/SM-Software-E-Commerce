import * as Yup from 'yup';

export const reviewSchema = Yup.object().shape({
    rating: Yup.number().default(1).required("Rating is required"),
    comment: Yup.string().min(2).max(100).default('').required("Comment is required"),
});

