import { useEffect, useState } from "react"
import { Route, BrowserRouter, Routes, Link } from "react-router-dom"
import Problemy from "./formularz"
import Widok from "./WidokDashboard";
import "./Apps.css"

export interface Zglos {
  id: number;
  tytul: string;
  opis: string;
  kategoria: string;
  status: boolean;
}

export type kategoria = 'Sprzet' | 'Internet' | 'Kod'

export function Dashboard() {

  const [listazgloszen, setlistazgloszen] = useState<Zglos[]>(() => {
  const saved = localStorage.getItem("zgloszenia") 

  if(saved) {
    try {
      return JSON.parse(saved)
    } catch(error) {
      console.error("Utrata zapisanych danych")
    }
  }

return [
      {
      id: 1,
      tytul: "Problem z internetem",
      opis: "Brak internetu",
      kategoria: "Internet",
      status: false
    },
    {
      id: 2,
      tytul: "Problem z React",
      opis: "Niedopracowana funkcja AbortController w API",
      kategoria: "Kod",
      status: false
    }
  ]
  })



  useEffect(() => {
    localStorage.setItem("zgloszenia", JSON.stringify(listazgloszen))
  } ,[listazgloszen])

  
  const Dodaj = (nowe: Omit<Zglos, "id" | "status">) => {
    const noweZgloszenie: Zglos = {
      ...nowe,
      id: Date.now(),
      status: false,
    }
    setlistazgloszen((prev) => [...prev, noweZgloszenie])
  }

  const ZmianaStatusu = (idStatusu: number) => {
    const nowaLista = listazgloszen.map((item) => {
      if (item.id === idStatusu) {
        return { ...item, status: !item.status }
      }
      return item
    })
    setlistazgloszen(nowaLista)
  }

  const UsunProblem = (idProblemu: number) => {
    const nowaLista = listazgloszen.filter((item) => idProblemu !== item.id)
    setlistazgloszen(nowaLista)
  }

  return (
    <BrowserRouter>
      <nav>
        <Link to={"/"}>Dashboard</Link>
        <Link to={"/dodaj"}>Zgłoś problem</Link>
      </nav>

      <Routes>
        <Route 
  path="/" 
  element={
    <Widok
      listazgloszen={listazgloszen} 
      ZmianaStatusu={ZmianaStatusu} 
      UsunProblem={UsunProblem} 
    />
  } 
/>
       
        <Route path="/dodaj" element={<Problemy Dodaj={Dodaj} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Dashboard