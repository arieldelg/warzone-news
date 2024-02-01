'use client'
import Image from "next/image"
import { useState } from "react"

const blurImage = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCABPAE8DASIAAhEBAxEB/8QAGwABAQADAQEBAAAAAAAAAAAABQQCAwYBCAf/xAAgEAABBAMAAwEBAAAAAAAAAAAAAQIDIQQRMQUiYRNB/8QAGQEAAgMBAAAAAAAAAAAAAAAAAgMBBAUA/8QAHBEBAQEBAAMBAQAAAAAAAAAAAAIBAxESIRMx/9oADAMBAAIRAxEAPwD6EXhokN7uE0qmPmLWp3qYItnkjjWjrHTJe6rjUoYRRvKWOG5KPLevCeVTYrqJpnk+qU0ykjnWZ5EmtkUktkeA66xy0RzuKXrRDkO6LmTN1NK/Smj9LNeRJpVJFlvpajmTVFYpCuN4NFNfS2OWh35ozV7pKJMiSlPHS0Q5U1KDsD8p8qbW7DpMi+mGbka3YPNle3QfRD9UkWg3Ld0ukdQVmO6Ij+joblSa2QOmszzZNbCpJr6aHKVatMQz30vimrpzcM99EIZ/o7ZdJh01dDsyals8dNXQ7MmpbE7h2D/IZGt2A5GV7dKfJTds53Jn9unZjtfQMq0FZrqURlWgjOdSmXF/TKA57+gs02ndEvIv6c9kyacaXG1W8XRT30Qgnrpzcc19L4J/o6rHEnFn2nSDLlpbNf7V0lyZdopWrosZIvyMm9nO5L/dRnOdvYHOnsdnQOy+i5VoIz1pRaXgPn8Ux4r6OnM+SXpzOY/TlOj8mvTl81bU0OVq9Z9aWyWWwS/QlHexZA7gd9DuclmyUaZn7QwY6jGRaKm9Fj1H5a72FStsUyf6HyJZOWXWP//Z'

const Description = () => {
    const [click, setClick] = useState(false)
    const changeColorText = () => {
        setClick(prev => !prev)
    }
    return (
        <section>
            <p className={`${click ? 'text-red-500' : 'text-white'}`}>Description de lo que quiero que me llegue</p>
            <div className="w-96 h-96 relative">
                <Image 
                src='/images/Hermes.jpg' 
                alt="huronsin" 
                fill
                className="rounded-lg"
                quality={100}
                placeholder="blur"
                blurDataURL={blurImage}
                />
            </div>
            <button 
            onClick={changeColorText}
            className="bg-white text-black"
            >Click para cambiar color del texto</button>
        </section>
    )
}

export { Description }