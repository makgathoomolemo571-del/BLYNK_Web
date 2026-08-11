import "./Button.css";

export default function Button({

    children,

    type="button",

    variant="primary",

    size="md",

    loading=false,

    disabled=false,

    fullWidth=false,

    onClick

}){

    return(

        <button

            type={type}

            disabled={disabled || loading}

            onClick={onClick}

            className={

                `btn

                btn-${variant}

                btn-${size}

                ${fullWidth?"btn-full":""}

                ${loading?"btn-loading":""}

                `

            }

        >

            {loading ? "Loading..." : children}

        </button>

    );

}