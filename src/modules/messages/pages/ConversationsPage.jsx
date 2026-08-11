import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import socialAPI from "../../social/services/social.api";
import {
  Search,
  Plus,
  MessageCircle,
  Users,
  UserPlus,
  Lock,
  Archive
} from "lucide-react";

import conversationApi from "../services/conversation.api";

export default function ConversationsPage() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [conversations, setConversations] = useState([]);

  const [friends, setFriends] = useState([]);

  const [filtered, setFiltered] = useState([]);

  const [search, setSearch] = useState("");


  useEffect(() => {

    loadConversations();

    loadFriends();

  }, []);



  async function loadConversations(){

    try{

      setLoading(true);

      const res =
        await conversationApi.getMine();

      const list =
        res.data || res;

      setConversations(list);

      setFiltered(list);

    }catch(err){

      console.error(err);

    }finally{

      setLoading(false);

    }

  }

async function loadFriends() {
  try {
    const res = await socialAPI.getFriends();

    const list = res.data || res || [];

    setFriends(list);
console.log("FRIENDS:", list);
  } catch (err) {
    console.error(err);
  }
}

  useEffect(()=>{

    if(!search.trim()){

      setFiltered(conversations);
      return;

    }


    const keyword =
      search.toLowerCase();


    setFiltered(

      conversations.filter(c=>

        c.title
        ?.toLowerCase()
        .includes(keyword)

        ||

        c.lastMessage
        ?.message
        ?.toLowerCase()
        .includes(keyword)

      )

    );


  },[search,conversations]);




  async function startChat(userId){

    try{

      const res =
        await conversationApi.create({

          participants:[
            userId
          ],

          type:"private"

        });


      const conversation =
        res.data || res;


      navigate(
        `/messages/${conversation._id}`
      );


    }catch(err){

      console.error(err);

    }

  }




return (

<div className="max-w-6xl mx-auto p-6">


<div className="flex justify-between mb-6">


<div>

<h1 className="text-3xl font-bold">
Messages
</h1>

<p className="text-zinc-500">
Your conversations
</p>

</div>


<button

onClick={()=>
navigate("/messages/new")
}

className="bg-blue-600 text-white px-5 py-3 rounded-xl flex gap-2 items-center"
>

<Plus size={18}/>

New Chat

</button>


</div>



{/* FRIENDS */}

<div className="bg-white border rounded-xl p-5 mb-6">


<div className="flex items-center gap-2 mb-4">

<UserPlus size={20}/>

<h2 className="font-bold text-xl">
Added Friends
</h2>

</div>



<div className="grid md:grid-cols-3 gap-4">


{friends.map((friend) => {

  const user = friend.user || friend;

  return (
    <div
      key={user._id}
      className="border rounded-xl p-4 flex items-center justify-between"
    >

      <div className="flex items-center gap-3">

        <div className="w-10 h-10 rounded-full bg-zinc-200 flex items-center justify-center">
          {user.username?.charAt(0)}
        </div>

        <div>
          <h3 className="font-semibold">
            {user.username}
          </h3>

          <p className="text-sm text-zinc-500">
            Friend
          </p>
        </div>

      </div>


      <button
        onClick={() => startChat(user._id)}
        className="bg-blue-600 text-white px-3 py-2 rounded-lg"
      >
        <MessageCircle size={16}/>
      </button>


    </div>
  );

})}


</div>


</div>





{/* SEARCH */}

<div className="relative mb-6">


<Search

className="absolute left-4 top-3.5 text-zinc-400"

/>


<input

value={search}

onChange={
e=>setSearch(e.target.value)
}

placeholder="Search conversations..."

className="w-full border rounded-xl pl-11 py-3"

/>


</div>





{/* CONVERSATIONS */}


{loading &&

<div className="text-center py-20">

Loading conversations...

</div>

}




<div className="space-y-3">


{filtered.map(conversation=>(


<button

key={conversation._id}

onClick={()=>
navigate(
`/messages/${conversation._id}`
)
}

className="w-full bg-white border rounded-xl p-5 text-left hover:bg-zinc-50"

>


<div className="flex justify-between">


<div className="flex gap-3 items-center">


{

conversation.type==="group"

?

<Users/>

:

<MessageCircle/>

}



<div>


<h3 className="font-semibold">

{conversation.title ||
"Private Chat"}

</h3>


<p className="text-sm text-zinc-500">

{conversation.lastMessage?.message ||
"No messages"}

</p>


</div>


</div>



<div>


{conversation.visibility==="private" &&

<Lock size={15}/>

}


{conversation.archived &&

<Archive size={15}/>

}


</div>



</div>



</button>


))}


</div>


</div>

);

}