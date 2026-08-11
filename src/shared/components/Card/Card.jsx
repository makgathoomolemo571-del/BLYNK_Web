import "./Card.css";

export default function Card({

    children,

    padding="md",

    shadow=true,

    bordered=false,

    onClick

}){

    return(

        <div

            onClick={onClick}

            className={

                `card

                card-${padding}

                ${shadow?"card-shadow":""}

                ${bordered?"card-border":""}

                `

            }

        >

            {children}

        </div>

    );

}