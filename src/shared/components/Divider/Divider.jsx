import "./Divider.css";

export default function Divider({

text

}){

return(

<div className="divider">

<div className="divider-line"></div>

{text && (

<span>

{text}

</span>

)}

<div className="divider-line"></div>

</div>

);

}