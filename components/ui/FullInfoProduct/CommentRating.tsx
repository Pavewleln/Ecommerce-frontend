import {IComment} from "@/services/comments/comments.interface";
import {Rating} from "react-simple-star-rating";
import {FC} from "react";

interface ICommentRating {
    element?: IComment,
    action?: boolean,
    rating?: number,
    setRating?: (rating: number) => void
}
// Если создать, то передать нужно setRating, rating, action = true
// Если показать, то передать только element
export const CommentRating: FC<ICommentRating> = ({
                                                      element,
                                                      action = false,
                                                      rating,
                                                      setRating
                                                  }) => {
    if (action && rating && setRating) {
        const handleRating = (rate: number) => {
            setRating(rate)
        }
        return <Rating
            onClick={handleRating}
            initialValue={rating}
            SVGstyle={{
                display: 'inline-block',
                marginTop: '-5px',
            }}
            size={20}
            allowFraction
            transition
        />
    } else if (!action && element) {
        return <Rating
            readonly
            initialValue={element.rating}
            SVGstyle={{
                display: 'inline-block',
                marginTop: '-5px',
            }}
            size={15}
            allowFraction
            transition
        />
    }
    return null
}