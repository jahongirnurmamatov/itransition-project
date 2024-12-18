import React from 'react'

const dummyComments = [
        {
          "username": "Alice",
          "commentText": "This is a really interesting article. I learned a lot!",
          "id": 1,
          "avatar": "https://example.com/avatars/alice.jpg"
        },
        {
          "username": "Bob",
          "commentText": "I disagree with the author's point about X. Here's why...",
          "id": 2,
          "avatar": "https://example.com/avatars/bob.jpg"
        },
        {
          "username": "Charlie",
          "commentText": "Can someone explain this part in more detail?",
          "id": 3,
          "avatar": "https://example.com/avatars/charlie.jpg"
        },
        {
          "username": "David",
          "commentText": "I have a similar experience. Here's my take on it...",
          "id": 4,
          "avatar": "https://example.com/avatars/david.jpg"
        },
        {
          "username": "Emily",
          "commentText": "This article is well-written and informative.",
          "id": 5,
          "avatar": "https://example.com/avatars/emily.jpg"
        },
        {
          "username": "Frank",
          "commentText": "I'm curious to know more about Y. Can anyone provide some insights?",
          "id": 6,
          "avatar": "https://example.com/avatars/frank.jpg"
        }
]
const Comments = () => {
    const [comments, setComments] = React.useState([]);

  return (
    <div className='w-full h-full'>
        {
            comments.map((comment) => (
                <div className='w-full h-full'>
                    <h1 className='text-2xl font-bold'>{comment.name}</h1>
                </div>))
        }
    </div>
  )
}

export default Comments