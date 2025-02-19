export const Start = ({ onStart }) => {
    const styles = {
        title: {
            display: "block",
        },
        description: {
            display: "block",
        }
    }
    return (<div>
        <span style={styles.title}>Quizzical</span>
        <span style={styles.description}>Answer various questions</span>
        <button onClick={onStart}>Start app</button>
    </div>)
}
