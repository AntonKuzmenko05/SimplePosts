import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFetching } from '../hooks/useFetching';
import PostService from '../API/PostService';
import Loader from '../components/UI/Loader/Loader';

const PostID = () => {
    const params = useParams();
    const [post,setPost] = useState({})
    const [comments,setComments] = useState([])
    const [fetchPostByID, isLoading, error] = useFetching((async(id)=>{
        const responce = await PostService.getByID(id);
        //console.log(responce.data)
        setPost(responce.data);
       }))

       const [fetchComments, isLoadingCom, errorCom] = useFetching((async(id)=>{
        const responce = await PostService.getCommentsByPostID(id);
        //console.log(responce.data)
        setComments(responce.data);
       }))  

    useEffect(()=>{
        fetchPostByID(params.id);
        fetchComments(params.id);
    },[])
  return (
    <div>
        <h1>Post Page ID = {params.id}</h1>
        {isLoading
            ? <Loader/>
            :<div>{post.title}</div>
        }
        <h1>Comments</h1>
        {isLoadingCom
            ? <Loader/>
            : <div>
                {comments.map(comm=>
                    <div key={comm.id} style={{marginTop:15}}>
                        <h5>{comm.email}</h5>
                        <div>{comm.body}</div>
                    </div>
                )}
            </div>
        }
    </div>
  )
}

export default PostID