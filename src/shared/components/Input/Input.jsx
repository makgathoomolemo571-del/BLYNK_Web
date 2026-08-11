import "./Input.css";

export default function Input({

label,

error,

...props

}){

return(

<div className="input-group">

{label &&

<label>

{label}

</label>

}

<input

{...props}

/>

{error &&

<small className="input-error">

{error}

</small>

}

</div>

);

}