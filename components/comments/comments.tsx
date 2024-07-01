'use client'

import CommentsCreate from "./comments-create"

type TProps = {
    comments: any
}

export default function Comments({comments}: TProps) {
    return (
        <div>
            <CommentsCreate addComment={() => ''} />
        </div>
    )
}
