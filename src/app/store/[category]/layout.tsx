const Layout = ({ children }: {children: React.ReactNode }) => {
    return (
        <main>
            <ul>
                <li>Holas</li>
                <li>perro</li>
            </ul>
            { children }
        </main>
    )
}

export default Layout