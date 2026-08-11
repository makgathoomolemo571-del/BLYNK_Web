import "./Dialog.css";

export default function Dialog({

open,

title,

children,

onConfirm,

onCancel,

confirmText="Confirm",

cancelText="Cancel"

}){

if(!open) return null;

return(

<div className="dialog-overlay">

<div className="dialog">

<h2>{title}</h2>

<div className="dialog-body">

{children}

</div>

<div className="dialog-actions">

<button
className="dialog-cancel"
onClick={onCancel}
>

{cancelText}

</button>

<button
className="dialog-confirm"
onClick={onConfirm}
>

{confirmText}

</button>

</div>

</div>

</div>

);

}