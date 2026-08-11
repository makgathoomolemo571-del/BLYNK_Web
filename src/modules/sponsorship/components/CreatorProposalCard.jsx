export default function CreatorProposalCard({
    application,
    onAccept,
    onReject
}) {


return (

<div className="bg-white rounded-xl shadow p-5">

<div className="flex items-center gap-3">

<img
src={
application.creator?.profilePicture ||
"/avatar.png"
}
className="w-12 h-12 rounded-full"
/>


<div>

<h3 className="font-bold">
{
application.creator?.displayName ||
application.creator?.username
}
</h3>

<p className="text-sm text-gray-500">
Quoted:
R {application.quotedPrice}
</p>

</div>

</div>


<p className="mt-4">

{
application.proposal
}

</p>



<div className="flex gap-3 mt-5">


<button

onClick={()=>onAccept(application.id)}

className="
bg-green-600
text-white
px-4
py-2
rounded-lg
"

>
Accept

</button>


<button

onClick={()=>onReject(application.id)}

className="
bg-red-600
text-white
px-4
py-2
rounded-lg
"

>
Reject

</button>


</div>


</div>

);


}