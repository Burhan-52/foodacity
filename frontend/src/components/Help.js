import { useState } from "react"
import { help_Question, help_Answer } from "../../config"

const Section = ({  isvisible, setisvisible, item, Answer }) => {
    return (
        <div className="instamart-container">
            <h3 className="about">{item}</h3>
            {!isvisible ? <button onClick={() => setisvisible(true)}>show</button> :
                <button onClick={() => setisvisible(false)}>hide</button>}
            {isvisible && <p>{Answer}</p>}
        </div>
    )
}

const Help = () => {
    const [isvisible, setisvisible] = useState(null)
    return (
        <>
            {help_Question.map((item, i) => {
                return (
                    <Section item={item}
                        isvisible={isvisible == i}
                        setisvisible={() => setisvisible(isvisible == i ? -1 : i)}
                        Answer={help_Answer[i]}
                    />
                )
            })}

        </>
    )
}
export default Help;