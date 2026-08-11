import {
    Radio,
    StopCircle,
    Users
} from "lucide-react";


export default function LiveControls({

    viewerCount = 0,

    onStart,

    onStop,

    live = false

}) {



return (

<div className="
    flex
    items-center
    justify-between
    bg-zinc-900
    text-white
    p-4
    rounded-xl
">


<div className="
    flex
    items-center
    gap-3
">


<div className={`
    w-3
    h-3
    rounded-full
    ${
        live
        ?
        "bg-red-500 animate-pulse"
        :
        "bg-gray-500"
    }
`}/>



<span>

{
live
?
"LIVE"
:
"OFFLINE"
}

</span>


</div>




<div className="
    flex
    items-center
    gap-2
">


<Users size={18}/>

<span>

{viewerCount}

</span>


</div>





<div>


{

live

?

<button

onClick={onStop}

className="
bg-red-600
px-5
py-2
rounded-lg
flex
items-center
gap-2
"

>

<StopCircle size={18}/>

End Live

</button>


:


<button

onClick={onStart}

className="
bg-purple-600
px-5
py-2
rounded-lg
flex
items-center
gap-2
"

>

<Radio size={18}/>

Go Live

</button>


}


</div>


</div>

);


}