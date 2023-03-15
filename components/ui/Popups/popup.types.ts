// Типизация входныйх параметров Popups
export interface IPopup {
    showModal: boolean,
    setShowModal: (showModal: boolean) => void;
}