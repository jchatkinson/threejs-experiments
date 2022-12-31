

// abs positioned link back to home page
export const HomeLink = ({text="Home"}) => {
    return (
    <div className="absolute top-0 inset-1 z-50">
        <a href="/" className="font-bold">{text}</a>
    </div>
    )
}