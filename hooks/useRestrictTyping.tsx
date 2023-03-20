import {FormEvent, useState} from "react";

export const useRestrictTyping = (max: number) => {
    const [text, setText] = useState<string>('')
    const textLimitPercent = Math.round(text.length / max * 120)

    const handleChangeTextarea = (e: FormEvent<HTMLTextAreaElement>) => {
        if (e.currentTarget && e.currentTarget.value.length <= max) {
            setText(e.currentTarget.value)
        }
    }
    const handleClickAddTweet = (): void => {
        setText('')
    }
    const disabledButtonCondition = Boolean(textLimitPercent >= 120 || text.length <= 10)
    return {
        text, setText, handleChangeTextarea, handleClickAddTweet, textLimitPercent, disabledButtonCondition
    }
}