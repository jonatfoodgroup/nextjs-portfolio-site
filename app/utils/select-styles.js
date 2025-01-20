// Custom styles for React Select
const customStyles = {
    control: (base) => ({
        ...base,
        backgroundColor: "#1a1a1a",
        borderColor: "#333",
        color: "#fff",
        boxShadow: "none",
        "&:hover": { borderColor: "#555" },
    }),
    menu: (base) => ({
        ...base,
        backgroundColor: "#1a1a1a",
        color: "#fff",
    }),
    singleValue: (base) => ({
        ...base,
        color: "#fff",
    }),
    option: (base, state) => ({
        ...base,
        backgroundColor: state.isFocused ? "#333" : "transparent",
        color: state.data.status === "Off track" ? "#ff4d4d" : "#fff",
        "&:hover": {
            backgroundColor: state.data.status === "Off track" ? "#ffcccc" : "#555",
        },
    }),
    placeholder: (base) => ({
        ...base,
        color: "#aaa",
    }),
};

export default customStyles;