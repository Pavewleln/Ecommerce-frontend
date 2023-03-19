import {classNames} from "@/utils/classNames";
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
    const progress = () => {
        return (
            <>
                {textLimitPercent > 0
                    && <div className="w-[120px] bg-gray-200 rounded-xl h-1 mb-4 dark:bg-gray-700 mt-2">
                        <div
                            className={classNames(textLimitPercent < 70 ? "bg-green-500" : textLimitPercent < 90 ? "bg-orange-500" : "bg-red-500", " h-1 rounded-xl")}
                            style={{width: textLimitPercent}}></div>
                    </div>
                }
            </>
        )
    }
    const disabledButtonCondition = Boolean(textLimitPercent >= 120 || text.length <= 10)
    return {
        text, setText, handleChangeTextarea, handleClickAddTweet, textLimitPercent, disabledButtonCondition, progress
    }
}