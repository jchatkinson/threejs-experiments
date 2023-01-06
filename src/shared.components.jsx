

// abs positioned link back to home page
export const HomeLink = ({text="Home", className="text-black"}) => {
    return (
    <div className="absolute top-0 inset-1 z-50 font-bold">
        <a href="/" className={className}>{text}</a>
    </div>
    )
}