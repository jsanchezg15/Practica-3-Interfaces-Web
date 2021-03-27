import React, {FC, useState} from "react"

interface IBotonesProps {
    updateInfo: Function;
    info: string[];
}

let copyInfo: string[] = []

const BotonesComponent:FC<IBotonesProps> = (props) => {

    const search = async (url: string) => {
        const info: string[] = await searchIteration(url)
        copyInfo = [...info]
        props.updateInfo(info)
    }

    const searchIteration = async (url: string): Promise<string[]> => {
        // Busca los datos de la url y los añade a un array
        // Si hay una pagina siguiente concatena los datos 
        // de esa pagina con los de esta

        const data = await fetch(url)
        const json = await data.json()
        let info: string[] = []
        
        if(url === "https://swapi.dev/api/films") 
            json.results.forEach((elem: {title: string}) => info.push(elem.title))
        else 
            json.results.forEach((elem: {name: string}) => info.push(elem.name))
        
        if(json.next) 
            info = info.concat(  await searchIteration(json.next)  )
        
        return info
    }

    const [text, setText] = useState<string>("")

    const update = (value: string) => {
        // Actualiza la lista de elementos para que solo aparezcan
        // aquellos que empiezan por las letras correctas
        props.updateInfo(  copyInfo.filter(  (elem) => elem.toLocaleLowerCase().startsWith(value.toLowerCase())  )  )
    }

    const sortInfoA_Z = () => {
        copyInfo = copyInfo.sort((a, b) => a.localeCompare(b))
        update(text)
    }
    
    const sortInfoZ_A = () => {
        copyInfo = copyInfo.sort((a, b) => b.localeCompare(a))
        update(text)
    }

    return (
        <div>
            <div>
                <button onClick={() => search("https://swapi.dev/api/films")}>Peliculas</button> 
                <button onClick={() => search("https://swapi.dev/api/people")}>Personajes</button> 
                <button onClick={() => search("https://swapi.dev/api/planets")}>Planetas</button> 
            </div>
            <div>
                <button onClick={() => sortInfoA_Z()}>Ordenar A - Z</button> 
                <button onClick={() => sortInfoZ_A()}>Ordenar Z - A</button> 
            </div>
            <div>
                <input 
                    type="text" 
                    value={text} 
                    onChange={
                        (e) => {
                            setText(e.target.value)
                            update(e.target.value)
                        } 
                    }
                />
            </div>
        </div>
    )
}


export default BotonesComponent