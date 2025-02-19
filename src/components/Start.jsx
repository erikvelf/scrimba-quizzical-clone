export const Start = ({ onStart }) => {
    const styles = {
        title: {
            display: "block",
            color: "red"
        }
    }
    return (<>
        <span style={styles.title}>{"Quizzical"}</span>
        <button onClick={onStart}>Start app</button>
    </>)
}
