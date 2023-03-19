import {IComment} from "@/services/comments/comments.interface";

// Типизация входных параметров Popups
export interface IPopup {
    showModal: boolean,
    setShowModal: (showModal: boolean) => void;
    comment: IComment
}