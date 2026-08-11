import "./Notifications.css";

const notifications = [

{
id:1,
title:"John liked your post",
time:"2 min ago"
},

{
id:2,
title:"Business accepted your request",
time:"10 min ago"
},

{
id:3,
title:"Wallet credited R25",
time:"1 hour ago"
},

{
id:4,
title:"New podcast available",
time:"Today"
}

];

export default function Notifications(){

return(

<div className="notifications">

<div className="notifications-header">

<h3>Notifications</h3>

</div>

<div className="notifications-list">

{

notifications.map(item=>(

<div
key={item.id}
className="notification-item"
>

<div>

<strong>

{item.title}

</strong>

<p>

{item.time}

</p>

</div>

</div>

))

}

</div>

</div>

);

}