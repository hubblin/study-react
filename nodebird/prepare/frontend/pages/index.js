//pages는 무조건 pages여야한다.
//코드 스플리팅 되기 때문이다.

import { useSelector } from "react-redux";
import AppLayout from "../components/AppLayout";

import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";
const Home = () => {
    const {isLoggedIn} = useSelector((state) => state.user);
    const mainPosts = useSelector((state) => state.post.mainPosts);
    return(
        <AppLayout>
            {isLoggedIn && <PostForm/>}
            {mainPosts.map((post, index) => <PostCard key={post.id} post={post}/>)}
        </AppLayout>
    )
}

export default Home;