import React from 'react'
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import useFetch from './useFetch'

export default function BlogDetails() {

    const {id} = useParams()
    const {data:blog, error, isPending} = useFetch('http://localhost:8000/blogs/'+id)
    const history = useHistory()

    const handleDelete = () => {
        fetch('http://localhost:8000/blogs/' + blog.id, {
            method: 'DELETE'
        }).then(() => {
            history.push('/')
        })
    }

    return (
    <div className="blog-details">
        {isPending && <div>Loading...</div>}
        {error && <div>Error</div>}
        {blog && (
            <article>
                <h2>{blog.title}</h2>
                <p>Written by {blog.author}</p>
                <div>{blog.body}</div>
                <button onClick={handleDelete}>Delete blog</button>
            </article>
        )}
    </div>
  )
}
