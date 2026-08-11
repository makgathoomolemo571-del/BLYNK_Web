import "./Tabs.css";

const Tabs = ({
  tabs = [],
  active,
  onChange
}) => {

  return (
    <div className="tabs">

      {tabs.map(tab => (

        <button
          key={tab.value}
          className={`tab ${
            active === tab.value
              ? "active"
              : ""
          }`}
          onClick={() =>
            onChange(tab.value)
          }
        >

          {tab.label}

        </button>

      ))}

    </div>
  );

};

export default Tabs;