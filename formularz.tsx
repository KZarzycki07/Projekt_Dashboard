import { useState, type FormEvent, type ChangeEvent } from "react"
import { useNavigate } from "react-router-dom"
import type { Zglos } from "./App";

interface formularzProps {
  Dodaj: (Zgloszenie: Omit<Zglos, "id" | "status">) => void
}

export function Problemy({ Dodaj }: formularzProps) {
  const Navigate = useNavigate()

  

const [form, setform] = useState({
    tytul: '',
    opis: '',
    kategoria: 'Sprzet' 
  })

  const ObslugaZmiany = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
 setform(prev => ({
  ...prev,
  [e.target.name]: e.target.value 
 }))
}
 

  const WyslijZgloszenie = (e: FormEvent) => {
    e.preventDefault()
    Dodaj(form)
    Navigate("/")
  }

  return (
    <div id="flex">
      <form onSubmit={WyslijZgloszenie}>
        <input 
          type="text" 
          name="tytul"
          placeholder="Tytuł problemu"
          value={form.tytul}
          onChange={ObslugaZmiany}
          required
        />

        <select name="kategoria" onChange={ObslugaZmiany} value={form.kategoria}>
          <option value="Sprzet">Sprzęt</option>
          <option value="Internet">Internet</option>
          <option value="Kod">Kod</option>
        </select>

        <textarea 
          name="opis" 
          placeholder="Opis problemu..."
          value={form.opis} 
          onChange={ObslugaZmiany}
          required
        />

        <button type="submit">Wyślij</button>
      </form>
    </div>
  )
} 


export default Problemy