import React,{useState,useEffect} from 'react'
import Axios from "axios"

function Form() {
    const [imie,setimie]=useState("");
    const [nazwisko,setNazwisko]=useState("");
    const [indeks,setIndeks]=useState("");
    const [studia, setStudia] = useState("");
    const [kierunek, setKierunek] = useState("");
    const [rok_studiow, setRok_studiow] = useState("");
    const [rodzaj_studiow, setRodzaj_studiow] = useState("");
    const [telefon, setTelefon] = useState("");
    const [email, setEmail] = useState("");
    const [FormStatus, setFormStatus] = useState("");
  
    const createForm = ()=>
    {
        Axios.post("http://localhost:5000/api/createForm",
        {
            imie : imie,
            nazwisko : nazwisko,
            indeks : indeks,
            studia : studia,
            kierunek : kierunek,
            rok_studiow : rok_studiow,
            rodzaj_studiow : rodzaj_studiow,
            telefon : telefon,
            email : email,
        }).then((res) => {
            if (res.data.message) {
                setFormStatus(res.data.message);
            }
          })
    }

    return (
        <div className='center'> 
            <div className='homeClass'><h3>Form</h3>
                <div className='form-group'>
                    <div>
                    <label>Imie :</label>
                    <input type="text" name="imie" placeholder="Podaj imie" onChange={(e=>{setimie(e.target.value)})} ></input>
                    </div>
                    <div>
                    <label>Nazwisko :</label>
                    <input type="text" name="nazwisko" placeholder="Podaj nazwisko"  onChange={(e=>{setNazwisko(e.target.value)})} ></input>
                    </div>
                    <div>
                    <label>Indeks :</label>
                    <input type="text" name="indeks" placeholder="Podaj indeks"  onChange={(e=>{setIndeks(e.target.value)})} ></input>
                    </div>
                    <div>
                    <label>Studia :</label>
                    <input type="text" name="studia" placeholder="Podaj studia"  onChange={(e=>{setStudia(e.target.value)})} ></input>
                    </div>
                    <div>
                    <label>Kierunek :</label>
                    <input type="text" name="kierunek" placeholder="Podaj kierunek"  onChange={(e=>{setKierunek(e.target.value)})} ></input>
                    </div>
                    <div>
                    <label>Rok studiow :</label>
                    <input type="text" name="rok_studiow" placeholder="Podaj rok studiow"  onChange={(e=>{setRok_studiow(e.target.value)})} ></input>
                    </div>
                    <div>
                    <label>Rodzaj studiow :</label>
                    <input type="text" name="rodzaj_studiow" placeholder="Podaj rodzaj studiow"  onChange={(e=>{setRodzaj_studiow(e.target.value)})} ></input>
                    </div>
                    <div>
                    <label>Telefon :</label>
                    <input type="text" name="telefon" placeholder="Podaj Telefon"  onChange={(e=>{setTelefon(e.target.value)})}></input>
                    </div>
                    <div>
                    <label>E-mail :</label>
                    <input type="text" name="email" placeholder="Podaj E-mail"  onChange={(e=>{setEmail(e.target.value)})} ></input>
                    </div>

                    <div>
                        <button type="submit" class="btn btn-primary" onClick={createForm}>Wyślij</button>
                    </div>

                    <h4>{FormStatus}</h4>

                </div>
        </div>
        </div>
    )
    
}

export default Form