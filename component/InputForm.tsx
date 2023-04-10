import styles from "styles/inputForm.module.scss"

type InputFormPropsType = {
    foodInput: string
    setFoodInput: React.Dispatch<React.SetStateAction<string>>
    setResult: React.Dispatch<React.SetStateAction<string>>
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const InputForm = (props: InputFormPropsType) => {
    const { foodInput, setFoodInput, setResult, setIsLoading} = props

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true)
        try {
        const response = await fetch("/api/generate", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ foods: foodInput }),
        });

        const data = await response.json();
        if (response.status !== 200) {
            throw data.error || new Error(`Request failed with status ${response.status}`)
        }

        setResult(data.result)
        setFoodInput("")
        } catch(error:any) {
        console.error(error)
        alert(error.message)
        } finally {
            setIsLoading(false)
        }
        
    }
    return(
        <form onSubmit={onSubmit} className={styles.form}>
            <input
                type="text"
                name="animal"
                placeholder="Enter some foods"
                value={foodInput}
                onChange={(e) => setFoodInput(e.target.value)}
                className={styles.inputarea}
            />
            <button 
            type="submit" 
            className={styles.btn}
            >Generate Dishes</button>
        </form>
    )
}
