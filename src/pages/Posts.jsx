/*Надо будет сделать что бы поиск не был только на 1 страничккее
  проблема с удалением и добовлнием то что оно не остаеться
*/

import React, { useEffect, useMemo, useRef, useState } from "react";
//import Counter from "./components/Counter";
import '../styles/App.css';
//import PostItem from "./components/PostItem";
import PostList from "../components/PostList";
import MyButton from "../components/UI/button/MyButton";
// import MyInput from "./components/UI/input/MyInput";
import PostForm from "../components/PostForm";
//import MySelect from "../components/UI/select/MySelect";
import PostFilter from "../components/PostFilter";
import MyModal from "../components/UI/MyModal/MyModal";
import { usePosts } from "../hooks/usePosts";
//import axios from "axios";
import PostService from "../API/PostService";
import Loader from "../components/UI/Loader/Loader";
import { useFetching } from "../hooks/useFetching";
import { getPageCount, getPagesArray } from "../utils/pages";
import Pagination from "../components/pagination/Pagination";
import { useObserver } from "../hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";

function Posts() {
const [posts,setPosts] = useState([]);
const [filter,setFilter] = useState({sort:'',query:''});
const [modal,setModal] = useState(false);
const [totalPages,setTotalPages] = useState(0);
const [limit,setLimit] = useState(10);
const [page,setPage] = useState(1);
const sortedAndSearchedPosts = usePosts(posts,filter.sort,filter.query);
const lastElement = useRef();


const [fetchPosts,isPostsLoading,postError] = useFetching(async(limit,page)=>{
  const response = await PostService.getAll(limit,page); 
  setPosts([...posts, ...response.data]);
  const totalCount = response.headers['x-total-count'];
  setTotalPages(getPageCount(totalCount,limit));
})

useObserver(lastElement, page<totalPages, isPostsLoading, ()=>{
  setPage(page + 1);
})


useEffect(()=>{
  fetchPosts(limit,page);
},[page, limit])

    
const createPost = (newPost) =>{
    setPosts([...posts,newPost]);
    setModal(false);
}



const removePost = (post) =>{
  setPosts(posts.filter(p=>p.id !== post.id));
}

const changePage = (page) =>{
    setPage(page);

}

   
  return (
    <div className="App">
      <button onClick={fetchPosts}>GET POSTS</button>
      <MyButton style={{marginTop:30}}onClick={()=>setModal(true)}>
        Create
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost}/>
      </MyModal>
      

      <hr style={{margin:'15px 0'}}/>

      <PostFilter 
        filter={filter} 
        setFilter={setFilter}/>
      <MySelect
        value={limit}
        onChange={value => setLimit(value)}
        defaultValue="Element count"
        options={[
          {value:5, name: '5'},
          {value:10, name: '10'},
          {value:-1, name: 'Show all'},

        ]}
      />
      {postError &&
          <h1>Erorr ${postError}</h1>
      }

     <PostList remove={removePost} posts = {sortedAndSearchedPosts} title = "Post List"/>
      <div ref={lastElement} style={{height:20,background:'red'}}></div>

      {isPostsLoading &&
        <div style={{display:'flex',justifyContent:'center',marginTop:50}}><Loader/></div>
      }
    
      <Pagination 
          page={page} 
          changePage={changePage} 
          totalPages={totalPages}
      /> 
      
      
     
    </div>
  );
}

export default Posts;
