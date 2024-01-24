interface Url {
    params : {
        category: string | number
    }
}

const category = (props: Url) => {
    const { category } = props.params
    return (
        <h1>{category}</h1>
    )
}

export default category