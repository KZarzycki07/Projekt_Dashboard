import type { Zglos } from "./App"
import "./Apps.css"

interface WidokProps {
    listazgloszen: Zglos[],
    ZmianaStatusu: (id:number) => void;
    UsunProblem: (id:number) => void;
}



    export default function Widok({listazgloszen,ZmianaStatusu,UsunProblem} : WidokProps) {
    return(
        <>
            <div id="flexbox">
            <h2>Dashboard Problemow Firmy X</h2>
            <ul>
              {listazgloszen.map((item) =>
                <li key={item.id}>
                  {item.kategoria} {item.tytul} {item.opis} {item.status ? 'Rozwiązano' : 'Nierozwiązano'}
                  <button onClick={() => ZmianaStatusu(item.id)}>
                    {item.status ? 'Rozwiązano' : 'Problem wciąż wystepuje'}
                    {item.status ? '✅' : '❌'}
                  </button>
                  <button onClick={() => UsunProblem(item.id)} disabled={item.status === false}>
                    Zarchiwizuj
                  </button>
                </li>
              )}
            </ul>
          </div>
          
          
          </>
            )
        }