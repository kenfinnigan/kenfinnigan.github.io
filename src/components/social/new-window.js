import React from "react"

const NewWindowSVG = (props) => {
  return (
    <span className="new-window">
      <svg
        height="8px"
        style={{
          enableBackground: "new 0 0 1000 1000",
        }}
        viewBox="0 0 1000 1000"
        width="8px"
        xmlSpace="preserve"
        {...props}
      >
        <path
          d="M598 128h298v298h-86v-152l-418 418-60-60 418-418h-152v-86zM810 810v-298h86v298c0 46-40 86-86 86h-596c-48 0-86-40-86-86v-596c0-46 38-86 86-86h298v86h-298v596h596z"
          style={{
            fillRule: "evenodd",
            clipRule: "evenodd",
            fill: "",
          }}
        />
      </svg>
    </span>
  )
}

export default NewWindowSVG
